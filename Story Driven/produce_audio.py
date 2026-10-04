#!/usr/bin/env python3
"""Clean Terry's original English recording without changing its timing.

The film retimes this cleaned recording with the original beat timing table,
just as it does for the Chinese recording. Requires ffmpeg and ffprobe.
"""

import hashlib
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'terry-moves/public/assets/audios/impact_en.m4a'
ASSETS = ROOT / 'terry-moves/public/assets/story-impact'
WORK = ROOT / 'terry-moves/out/story-impact-audio'
DESTINATION = ASSETS / 'narration-en-cleaned.m4a'
# Learn the steady background from the opening room tone, before speech.
# Modest FFT reduction and smoothing keep speech and breaths natural.
FILTER = ("highpass=f=70,asendcmd=c='0.2 afftdn sn start;1.8 afftdn sn stop',"
          'afftdn=nr=8:nf=-52:tn=1:gs=8,lowpass=f=12000')
TARGET_LUFS = -18


def run(command):
    return subprocess.run(command, check=True, capture_output=True, text=True)


def duration(path):
    return float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                      '-of', 'default=nw=1:nk=1', str(path)]).stdout)


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    WORK.mkdir(parents=True, exist_ok=True)
    source_hash = sha256(SOURCE)
    denoised = WORK / 'terry-en-denoised.wav'
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(SOURCE), '-ac', '1', '-af', FILTER,
         '-ar', '48000', '-c:a', 'pcm_s16le', str(denoised)])
    # Two-pass loudness matching gives a clear, consistent listening level.
    measured = run(['ffmpeg', '-hide_banner', '-i', str(denoised), '-af',
                    f'loudnorm=I={TARGET_LUFS}:TP=-2:LRA=9:print_format=json',
                    '-f', 'null', '-']).stderr
    level, _ = json.JSONDecoder().raw_decode(measured[measured.rfind('{'):])
    master = (f'loudnorm=I={TARGET_LUFS}:TP=-2:LRA=9:'
              f"measured_I={level['input_i']}:measured_LRA={level['input_lra']}:"
              f"measured_TP={level['input_tp']}:measured_thresh={level['input_thresh']}:"
              f"offset={level['target_offset']}:linear=true")
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(denoised), '-af', master,
         '-ar', '48000', '-c:a', 'aac', '-b:a', '160k', '-map_metadata', '-1',
         '-movflags', '+faststart', str(DESTINATION)])
    assert sha256(SOURCE) == source_hash, 'The source recording must stay untouched.'
    source_duration, output_duration = duration(SOURCE), duration(DESTINATION)
    assert abs(source_duration - output_duration) < 0.04, 'Cleanup must preserve the recording timing.'
    report = {'voice': 'Terry Yin (original recording)', 'source': str(SOURCE.relative_to(ROOT)),
              'sourceSha256': source_hash, 'outputSha256': sha256(DESTINATION),
              'sourceDuration': source_duration, 'outputDuration': output_duration,
              'cleanupFilter': FILTER, 'targetLufs': TARGET_LUFS,
              'measuredBeforeMastering': level}
    (ASSETS / 'cleanup-en.json').write_text(json.dumps(report, indent=2) + '\n')
    print(f'Cleaned original recording: {output_duration:.2f}s, source unchanged.')


if __name__ == '__main__':
    main()
