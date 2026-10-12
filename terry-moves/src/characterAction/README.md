# Direct a RobotExpressive gesture

`RobotGreeting` is a four-second settled Wave rehearsal. It starts and finishes
in Idle, with eased pose joins. The later approach and stepping turn are not yet
part of this take. Edit `script.ts` to change the ordered clip cues, duration,
blend time and stage. The ordered beat clock derives composition duration and
every requested pose; seeking needs no warm-up or previous frame.

The actor is saved under `public/character-action/`; its provenance, CC0 source
statement and creator credit are beside it. A missing named clip fails with the
cue, missing clip and available clip names instead of selecting another action.

From the repository root:

```sh
pnpm moves
pnpm -C terry-moves exec remotion still src/index.ts RobotGreeting out/robot-greeting-apex.png --frame=50
pnpm -C terry-moves exec remotion render src/index.ts RobotGreeting out/robot-greeting.mp4 --codec=h264 --pixel-format=yuv420p --color-space=bt709 --concurrency=1
pnpm -C terry-moves exec tsx scripts/verify-character-action.ts out/character-action/pixel-proof
```

Open `RobotGreeting` in Studio. Rehearsal landmarks at 30 fps: entry 0–23,
Wave starts 24, apex near 50, return join 89/90, settled exit 101–119.
Pixel proof exercises the real stage and actor in one forward/reverse traversal,
then fresh renders through the registered production composition. Blank-stage
and frozen-pose mutations make an equal but absent or motionless actor fail.
