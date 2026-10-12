# Direct a RobotExpressive greeting

`RobotGreeting` is a 7.1-second silent film: the robot approaches, turns through
its steps, settles, looks toward the viewer and waves. Edit `script.ts` to change
the ordered clip cues, duration, clip phase/rate, turn and stage. The ordered beat
clock derives composition duration and every requested pose; seeking needs no
warm-up or previous frame. The film is 1080×1080 at 30 fps.

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
pnpm -C terry-moves render:robot-greeting
pnpm -C terry-moves exec tsx scripts/verify-character-action.ts out/character-action/pixel-proof
```

Open `RobotGreeting` in Studio. Current landmarks at 30 fps: approach 0–83,
turn 30–63, settle join 83/84 with the blend complete at 99, regard 102–116,
Wave starts 117, apex near 143, return join 182/183, settled exit 194–212.
The proof derives its selections from authored cue ranges and actual support
changes rather than retaining a separate choreography clock. It exercises real
forward/reverse pictures through movement, footfalls and joins, then fresh
renders through the registered production composition. It also compares actual
sole placement/orientation on reverse, repeated and fresh rig samples.
Blank-stage and frozen-pose mutations make an absent or motionless actor fail.

The export command writes `out/robot-greeting.mp4` as H.264, yuv420p, BT.709.
It consumes only the retained local GLB and direction; it acquires no assets.
