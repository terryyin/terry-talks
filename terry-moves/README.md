Congratuations! Now you've discovered how Terry moves.

# How to add a new project

## Step 0: Install from the terry-talks workspace

`terry-moves` is an in-tree pnpm workspace package. From the repo root:

```bash
pnpm install
pnpm moves          # Remotion Studio (default)
pnpm moves test     # jest + eslint + tsc
pnpm moves render   # remotion render
pnpm moves srt      # product-developer subtitles as SRT
```

Or from this folder: `pnpm start` (Studio), `pnpm test`, `pnpm run build`, `pnpm srt`.

## Step 1: Add a new story

Under the /src/stories folder, add a new story file. 
The story file is a React component that returns a Story component. like this:

```typescript

export const StoryTransparent: React.FC = () => {
  return (
		<Story id="StoryTransparent" width={720} height={720} subtitles={yourSubtitles}  >
			<AnimationEffect actor="subtitles">
				<Subtitles scale={1}/>
			</AnimationEffect>
      <!-- Add your actors here -->
		</Story>
  );
};
```

Don't forget to add the new story to the `src/Root.tsx` file.

Then run `pnpm moves` from the repo root (or `pnpm start` here) to open Remotion Studio. You can see the new story in the browser.

## Step 2: Add subtitles

The `yourSubtitles` in the example above is a list of subtitles. Each subtitle is an object with the following properties:

```typescript
export const yourSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 6, text: 'Product Developers: who are they and why are they on the rise?', translations: {
		zhCN: '何谓产品开发者? 为什么说他们正在崛起？',
		zhTW: '何謂產品開發者？為什麼說他們正在崛起？',
		ja: '製品の開発者（Product Developers）とは。彼らは何者で、なぜ台頭してきているのか。',
	}, actions:[] },
  ...
];
```

## Step 3: Add actors and actions

Please find examples in the `src/stories/` folder.

## Step 4: Build the video

Use `pnpm moves render` from the repo root (or `pnpm run build` here), then choose the story you want to build. The video will be generated in the `out` folder.

# Translations

To change the language, you need to make the change at the `<Story>` component level. For example:

```typescript
		<Story id="StoryBooleanData" width={720} height={720} subtitles={booleanDataSubtitles} language='zhCN' >
```

# Audio

To add audio, you need to add a `<Audio/>` to the `<Story>` component:

```typescript
		<Story id="StoryBooleanData" width={720} height={720} subtitles={booleanDataSubtitles}>
			<Audio src={staticFile("assets/audios/boolean3ch.mp3")} />
```

# Special actors

## 'camera' actor

The 'camera' actor is a special actor that is used to represent the camera in the scene. It is not a real actor, but a special object that is used to control the camera. You can move it as a normal 3d actor.

The special ability it has is to 'look at' a position.

# Silent scene

Direct the Engineer by editing [the script](src/silentScene/script.ts): choose
the starting place, define named places as stage points, and rearrange `moves`.
The current scene travels door→window, hops, cuts to the door, then travels
door→desk. The wrench stays in the Engineer's hand; there are no captions or audio.

Supported move entries are:

```typescript
{ kind: 'travel', to: 'desk', seconds: 1.5 }
{ kind: 'hop', seconds: 0.6 }
{ kind: 'hold', seconds: 1 }
{ kind: 'cut', to: 'door' }
```

Each move starts on the frame after the previous one ends. Travel begins at
the previous end position; hop returns to that position and hold keeps it.
A cut occupies one frame at its destination, with no travel across the cut;
the next move starts there. Durations round to the nearest frame at 30 fps,
with a minimum of two frames for travel, three for hop, and one for hold.
The cut always uses one frame. The current script totals 124 frames.

From this folder:

```bash
pnpm start                  # open Studio; select SilentScene
pnpm render:silent-scene    # MP4 plus a poster of the final settled pose
```

The export is `out/silent-scene.mp4` (1080×1080, 30 fps, H.264/yuv420p,
BT.709) and `out/silent-scene-poster.png`. To revise it, edit or reorder the
script's moves, preview `SilentScene`, then run `pnpm render:silent-scene`
again. Start times, duration and position joins are derived from the list.

An unknown actor, move kind or place, or a non-finite or non-positive duration,
stops the scene before rendering and names the move and
problem; for example, `move 4 (travel to kitchen): unknown place "kitchen";
places are door, desk, window`. The supported actor is `Engineer`; cuts use
no duration.

# Story impact animation

See [the film guide](../Story%20Driven/README.md) for the storyboard,
English and Traditional Chinese narration, animation model and export
instructions.

# AI test automation: The Legacy Workshop

See [the film guide](../AI%20Test%20Automation/README.md) for the finished
61-second film, content source, audio reproduction and export instructions.
