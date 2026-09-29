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

# Story impact animation

A square cartoon explainer of "romantic stories, disciplined products" (the
essay and flip chart in `Story Driven/`). Its source lives in
`src/storyImpact/`:

- `scene.ts` and `assimilation.ts` hold the pose model: a product grid of
  Behavior × Structure cells, the backlog of paint balls along Time, the story
  ball, its splat, and the History box. Each pose is plain data.
- The SVG pieces (`pieces.tsx`, `cell.tsx`, `storyBall.tsx`, `splat.tsx`,
  `tidyMarks.tsx`, `history.tsx`, `caption.tsx`) draw a pose. They never read
  the frame, so they can be tested in jsdom and animated by changing the pose.
- `boards.ts` lists the storyboard: one caption and one pose per board.
- `film.ts` lists the film's beats: each has a length, an optional caption
  (shown until the next captioned beat), and a pure function from beat
  progress to a pose. A beat that matches a storyboard board ends exactly on
  that board's pose. Story motion (springs, squash and stretch) lives in
  `storyBeats.ts` and `historyBeats.ts`; product motion (eased slides and
  snaps) lives in `productBeats.ts`; shared easing helpers are in `motion.ts`.

Render the storyboard boards and their contact sheet:

```bash
cd terry-moves
npx remotion render src/index.ts StoryImpactStoryboard out/storyboard --sequence --image-format=png
ffmpeg -y -start_number 0 -i out/storyboard/element-%02d.png \
  -vf "scale=540:540,tile=4x3:padding=12:color=white" -frames:v 1 "../Story Driven/storyboard.png"
```

Render the one-story film (`StoryImpactOneSplash`, about 40 seconds, silent,
captioned):

```bash
cd terry-moves
npx remotion render src/index.ts StoryImpactOneSplash out/story-impact-one-splash.mp4
```

Render the final, shareable animation and its poster (H.264, yuv420p,
1080×1080, silent, about 88 seconds):

```bash
pnpm -C terry-moves render:story-impact
# writes out/story-impact-animation.mp4 and out/story-impact-animation-poster.png
```

Or render the full film (`StoryImpactFilm`, about 88 seconds) directly: title, product
space, backlog, the pink story, the sun story and the customer's idea, story
versus feature, "neither is better", and the end card: the stage shrinks
away and "Stories should be romantic. Products should not." lands in the
title's styles (`endCard.tsx`, reusing `title.tsx`'s lines), with the credit
"An idea and film by Terry Yin". The poster is the last frame.

```bash
cd terry-moves
npx remotion render src/index.ts StoryImpactFilm out/story-impact-film.mp4
```

`timeline(beats)` in `film.ts` turns any beat list into a film; `fullFilm.ts`
lists the full film's beats. A story is a `StorySpec` (ball, impact spot,
changed cells, reorganized cell, splat seed, optional refill ball), and its
poses and beats are built from the product as it stands before the story
(`StoryBefore`); `afterStory` gives the next story's starting point. A cell
changed by a later story takes the new color, and a reorganized cell is split
between the old and the new colors, so the product always shows its current
state and never a scar.

The first story also names the two focuses (`focus.ts`): while it hovers it
wears a "customer-value focused" tag on a string (`storyTag.tsx`, the pose's
`tag`), and once it splashes the whole wall is outlined as "whole-product
focused" until the product is coherent, with "judgment-intensive" and "?"
thought bubbles while it is assimilated (`judgment.tsx`, the pose's
`judgment`). The test shields that follow are captioned as spent judgment.
Later stories carry none of these.

Once a story is assimilated, the film shows what keeps the product coherent
(`protect.tsx`, the pose's `protect` field, `protectBeats.ts`): a green test
shield on every Behavior column, then each Structure row linked to a domain
concept from the example wish (`DOMAIN` in `layout.ts`).

A story has two impacts. On the product, the developers assimilate its
splash. In the world, a flat cartoon customer (`customer.tsx`, the pose's
`customer` field) nods at the change and gets a light-bulb idea; the new ball
flies into the tray as the second ball while the two balls behind it swap
(`withIdea`, `customerBeats.ts`). That idea is the next-but-one story. A ball
flying into the tray from outside it is `flying` and drawn above the stage.

Visual language: warm paper background, thick rounded ink outlines, flat
offset shadows, flat bright fills, and a rounded bold font. Stories are
bouncy, splashy paint balls with faces; the product is tidy and deliberate.
There are no bombs, missiles, or people judging. Text stays legible at
360×360 px, labels never jump or get covered, and paint stays on the product
wall; `tests/storyImpact/StoryImpactRelease.spec.tsx` guards these.
