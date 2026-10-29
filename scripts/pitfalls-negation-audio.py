#!/usr/bin/env python3
"""Episode 2 offline speech entry; --generate uses paid OpenAI TTS.

Saved raw takes are immutable. Re-running --generate reuses completed takes.
Generate and verify can run without a mix rebuild.
"""

import argparse
import json
from pathlib import Path
import tempfile

from narration_audio import read_pcm, sha256, verify, write_pcm

from pitfalls_negation_content import ASSETS, CAST, MODEL, TAKES, write_json


def saved_takes(cue):
    return sorted(
        [*TAKES.glob(f"{cue['id']}.json"), *TAKES.glob(f"{cue['id']}-take*.json")],
        key=lambda path: json.loads(path.read_text()).get("takeNumber", 1),
    )


def generate(cue, retake=False):
    from openai import OpenAI

    path = TAKES / f"{cue['id']}.wav"
    sidecar = path.with_suffix(".json")
    if retake:
        number = max(
            [json.loads(p.read_text()).get("takeNumber", 1) for p in saved_takes(cue)] + [0]
        ) + 1
        path = TAKES / f"{cue['id']}-take{number:02}.wav"
        sidecar = path.with_suffix(".json")
    else:
        number = 1
    candidates = saved_takes(cue)
    if candidates and not retake:
        sidecar = candidates[-1]
        path = ASSETS / json.loads(sidecar.read_text())["file"]
    if (path.exists() or sidecar.exists()) and not retake:
        if not path.exists() or not sidecar.exists():
            raise ValueError(f"Incomplete retained take: {path}; do not overwrite it")
        saved = json.loads(sidecar.read_text())
        if saved["text"] != cue["text"]:
            raise ValueError(f"Saved text changed: {cue['id']}")
        verify(path, saved["sha256"])
        print(f"Reusing {cue['id']}; no API request", flush=True)
        return
    budget = cue["end"] - cue["start"]
    speed = cue["speed"]
    direction = (
        cue["direction"]
        + f" Finish the complete line naturally within about {budget:.2f} seconds. "
        "Speak only the supplied exact words, with no additions or omissions. "
        "Do not imitate any real person."
    )
    print(f"Generating {cue['id']}: {cue['voice']}", flush=True)
    with tempfile.TemporaryDirectory(prefix="negation-take-", dir=TAKES) as directory:
        streamed = Path(directory) / "stream.wav"
        with OpenAI(timeout=60, max_retries=0).audio.speech.with_streaming_response.create(
            model=MODEL,
            voice=cue["voice"],
            input=cue["text"],
            instructions=direction,
            response_format="wav",
            speed=speed,
        ) as response:
            response.stream_to_file(streamed)
        pcm = read_pcm(streamed, 24000)
        if not pcm:
            raise ValueError(f"Empty take: {cue['id']}")
        write_pcm(path, pcm, 24000)
    write_json(
        sidecar,
        {
            **cue,
            "instructions": direction,
            "model": MODEL,
            "takeNumber": number,
            "requestSpeed": speed,
            "file": str(path.relative_to(ASSETS)),
            "sha256": sha256(path),
            "rawDurationSeconds": len(pcm) / 24000,
        },
    )
    print(f"Saved {cue['id']}: {len(pcm) / 24000:.3f}s", flush=True)


def verify_takes():
    for cue in CAST:
        candidates = saved_takes(cue)
        if not candidates:
            raise ValueError(f"Missing saved take: {cue['id']}")
        take = json.loads(candidates[-1].read_text())
        if take["text"] != cue["text"]:
            raise ValueError(f"Saved {cue['id']} text differs from current script")
        path = ASSETS / take["file"]
        verify(path, take["sha256"])
        print(
            f"Verified {cue['id']}: {path} text={take['text']!r} sha256={take['sha256']}",
            flush=True,
        )
    print("All Episode 2 raw speech takes verified", flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--generate",
        action="store_true",
        help="Request only missing named raw speech takes (paid API)",
    )
    parser.add_argument(
        "--retake",
        nargs="+",
        choices=[cue["id"] for cue in CAST],
        help="Generate a separately retained replacement (paid API)",
    )
    parser.add_argument(
        "--verify",
        action="store_true",
        help="Verify saved take hashes and exact script text offline",
    )
    args = parser.parse_args()
    if not (args.generate or args.retake or args.verify):
        parser.error("Specify --generate, --retake, and/or --verify")
    TAKES.mkdir(parents=True, exist_ok=True)
    if args.verify and not (args.generate or args.retake):
        verify_takes()
        return
    if args.generate:
        for cue in CAST:
            generate(cue)
    if args.retake:
        for cue in CAST:
            if cue["id"] in args.retake:
                generate(cue, retake=True)
    if args.verify:
        verify_takes()


if __name__ == "__main__":
    main()
