# Direct a RobotExpressive greeting

`RobotGreeting` is the retained original: a 7.1-second silent film in which the
robot approaches, turns through its steps, settles, looks toward the viewer and
waves. `RobotGreetingThumbsUp` is a 6.8-second revision that replaces Wave with
the saved ThumbsUp performance. The original is the selected take; the alternate
is retained for comparison. `selectedTake` in `script.ts` chooses the proof
command's default when its take argument is omitted. Both films are 1080×1080
at 30 fps.

Edit the `directGreeting({ clip, seconds })` calls in `script.ts` to author either
gesture and its duration. The common direction owns ordered cues, clip phase/rate,
joins, stepping turn and staging. Composition duration and every requested pose
derive from that direction, so a timing edit shifts the exit automatically and
seeking needs no warm-up. Each retained cue allows the entire saved gesture clip
and a short hold; changing the clip alone does not automatically choose its pace.
The two thin composition wrappers choose directions and share the same scene and
sampler. Gesture replacement needs no component choreography edit.

The rig derives its complete support path from the saved actor, direction and
fps. A planted foot holds its horizontal position and facing while the pelvis
turns; its next step takes the new facing. Actual rigid-sole vertices establish
floor clearance, including heel/toe roll and settling. This contact treatment
belongs to RobotExpressive. Inspect feet and weight transfer at normal speed
when changing movement or joins; numeric contact checks supplement that review.

The actor is saved under `public/character-action/`; its provenance, CC0 source
statement and creator credit are beside it. A missing named clip fails with the
cue, missing clip and available clip names instead of selecting another action.

From the repository root:

```sh
pnpm moves
pnpm -C terry-moves exec remotion still src/index.ts RobotGreeting out/robot-greeting-apex.png --frame=143
pnpm -C terry-moves exec remotion still src/index.ts RobotGreetingThumbsUp out/robot-greeting-thumbs-up-apex.png --frame=143
pnpm -C terry-moves render:robot-greeting
pnpm -C terry-moves render:robot-greeting:thumbs-up
pnpm -C terry-moves exec tsx scripts/verify-character-action.ts out/character-action/original-proof original
pnpm -C terry-moves exec tsx scripts/verify-character-action.ts out/character-action/thumbs-up-proof thumbs-up
```

Open either named composition in Studio. Current landmarks at 30 fps: approach 0–83,
turn 30–63, settle join 83/84 with the blend complete at 99, and regard 102–116.
Both gestures start 117 with an apex near 143. Wave's return join is 182/183 and
settled exit 194–212; ThumbsUp's return join is 173/174 and settled exit 185–203.
The proof derives its selections from authored cue ranges and actual support
changes rather than retaining a separate choreography clock. It exercises real
forward/reverse pictures through movement, footfalls and joins, then fresh
renders through the registered production composition. It also compares actual
sole placement/orientation on reverse, repeated and fresh rig samples.
Blank-stage and frozen-pose mutations make an absent or motionless actor fail.

The commands write `out/robot-greeting.mp4` and `out/robot-greeting-thumbs-up.mp4`
as H.264, yuv420p, BT.709. They consume the retained local GLB and direction.
The saved asset has no external buffer/image inputs. Retain its provenance and
upstream CC0 statement along with the source, dependency lockfile and local
Remotion settings; actor or motion generation is not part of export.

After reviewing both exports, record their decoded pictures and metadata in a
directory outside generated `out/`, then reproduce them:

```sh
pnpm -C terry-moves exec node scripts/reproduce-character-action.mjs record /tmp/robot-greeting-accepted
pnpm -C terry-moves exec node scripts/reproduce-character-action.mjs reproduce /tmp/robot-greeting-accepted
```

This requires local `ffmpeg`, `ffprobe` and an already-installed Chrome Headless
Shell. The default executable is this checkout's macOS ARM64 Remotion browser;
on another machine supply its local browser path as the final argument. Setup
may install tools, but this reproduction command never downloads a browser or
actor. It blocks every external browser request, removes only the two generated
MP4 paths above, bundles from saved source, and exports both takes with the same
ANGLE/encoding settings. It compares all decoded pictures in sequence plus
duration, fps and film metadata rather than MP4 container bytes. `accepted.json`,
`result.json` and `network.json` retain the comparison and local-request evidence.
Preserve accepted records before editing source; a changed performance should
fail that comparison. Recording refuses to overwrite an existing acceptance.
