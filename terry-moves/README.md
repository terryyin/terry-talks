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
- `readingPace.ts` times the captions: a caption holds for
  `max(3.0 s, 1.0 s + syllables ÷ 3.5)`, counted from its words, and the
  beats under it (until the next caption) slow evenly when they are shorter.
  `afterABreath(beat)` leaves the caption line empty for 1.0 s at the start
  of that caption's beats. `timeline()` applies both, so a reworded caption
  re-times itself; do not hand-tune beat lengths for reading.

Render the storyboard boards and their contact sheet:

```bash
cd terry-moves
npx remotion render src/index.ts StoryImpactStoryboard out/storyboard --sequence --image-format=png
# 17 boards: 6 across, 3 down (tile=COLSxROWS must hold every board)
ffmpeg -y -start_number 0 -i out/storyboard/element-%02d.png \
  -vf "scale=540:540,tile=6x3:padding=12:color=white" -frames:v 1 "../Story Driven/storyboard.png"
```

Render the one-story film (`StoryImpactOneSplash`, about 71 seconds, silent,
captioned):

```bash
cd terry-moves
npx remotion render src/index.ts StoryImpactOneSplash out/story-impact-one-splash.mp4
```

Render the final, shareable animation and its poster (H.264, yuv420p,
1080×1080, about 128 seconds, with Terry's original English narration,
cleaned in `public/assets/story-impact/narration-en-cleaned.m4a`. A complete title frame is held
silently for 1.2 seconds at the front; that first frame is also the poster.
The recording is retimed to the revised animation while keeping Terry's
delivery and original spoken wording:

```bash
pnpm -C terry-moves render:story-impact
# writes out/story-impact-animation.mp4 and out/story-impact-animation-poster.png
```

Rebuild the cleaned recording:

```bash
python3 'Story Driven/produce_audio.py'
# Requires ffmpeg and ffprobe; no API calls.
```

The source `public/assets/audios/impact_en.m4a` is kept unchanged. The generator
uses the opening room tone to learn the background noise, applies gentle
spectral noise reduction, removes low rumble and high hiss, and masters the
recording to −18 LUFS. `public/assets/story-impact/cleanup-en.json` records
the source hash, processing settings and timing checks. Noise reduction preserves
the recording's duration; `RecordedNarration` fits its segments to the film.

The same film with Traditional Chinese subtitles and Terry's Chinese
narration (`StoryImpactFilmZhHant`; only the captions are translated, the
picture stays in English). The narration, `public/assets/audios/impact_zh.m4a`
(AAC, 48 kHz stereo), retains Terry's recorded voice. Its original beat timings
are preserved in the shared `src/storyImpact/recordingTimeline.json`; the audio segments
follow the shared picture's revised pace and begin after the opening cover:

```bash
pnpm -C terry-moves render:story-impact:zh-hant
# writes out/story-impact-animation-zh-hant.mp4
```

The subtitles live in `src/storyImpact/zhHant.ts`, keyed by the English
caption; a spec fails when a caption changes without its translation.

Or render the full film (`StoryImpactFilm`, about 128 seconds) directly: cover, title, product
space, backlog, the pink story and its two values, the sun story and the
customer's idea (the cheap story), story versus feature (one story touches
many features; one feature takes many layers working together), "value builds
up, not debt", and the end card: the stage shrinks away and "Stories should be
romantic. Products should not." lands in the title's styles (`endCard.tsx`,
reusing `title.tsx`'s lines), with the credit "An idea and film by Terry
Yin". Spent stories rise as sheet ghosts and
remain ghosts in History. The next-story and sun-story passage is about 28%
faster than the earlier cut. The poster is the first frame.

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

The product's size is its cells' extent (`extentOf`); a pose's `extent`
overrides it while the wall eases to a new size. A story's `grow` adds or
removes a Behavior column or Structure row at the far edge once it is
assimilated: the wall eases out and the new cells pop in, or the leaving
cells pop out before the wall eases in, one change at a time. The product
starts at 4 × 4 (`START`) and goes 5 × 4, 5 × 3, 6 × 3 over the three
stories; the axes span the largest product (`SPACE`), and the "Product"
label rides the wall's top edge two columns out.

The first story also names the two focuses (`focus.ts`), one message at a
time: its wish bubble shows alone, then in a beat of its own it wears a
"customer-value focused" tag on a string (`storyTag.tsx`, the pose's `tag`),
gone before it turns fuzzy. Once it splashes, the whole wall is outlined as
"whole-product focused"; while it is assimilated that name gives way, in the
same spot, to "judgment-intensive" with "?" thought bubbles (`judgment.tsx`,
the pose's `judgment`), and the outline stays until the product is coherent. The test shields that follow are captioned as spent judgment.
Later stories carry none of these.

Once the first story is coherent, the film names its impact and the two
values it delivers (`valueBeats.ts`, `values.tsx`, the pose's `values`): an
"impact!" burst pops and two pills spring out of it, "customer value" (a
heart) beside where the customer stands and "option value" (a key) in the
top-right corner; the pill in focus is bright and the other dims.

Customer value: the Behavior columns the story touched are outlined in green
(adjacent ones in one band, `touchedBehaviorOf`), and a flat cartoon customer
(`customer.tsx`, the pose's `customer`) pops up in front of them — they see
behavior, never structure — hearts pop, they nod, and they get a light-bulb
idea; the new ball flies into the tray as the second ball while the two balls
behind it swap (`withIdea`, `customerBeats.ts`). A ball flying into the tray
from outside it is `flying` and drawn above the stage. No customer is on
stage before the product is coherent or while option value is shown.

Option value, unseen by users: a green test shield on every Behavior column,
then each Structure row linked to a domain concept from the example wish
(`protect.tsx`, the pose's `protect`, `protectBeats.ts`, `DOMAIN` in
`layout.ts`), captioned as judgment spent on tests and on a structure that
maps the domain. The pills, shields and links fade as the story goes to
History. The customer's idea is later the cheap story that exercises the
option: its option pill comes back and its key glints, and its `splash` is
smaller, so it knocks fewer cells, and its wobble-to-coherent beats are
shorter than the sun story's (`CHEAP` pace in `laterStories.ts`).

Visual language: warm paper background, thick rounded ink outlines, flat
offset shadows, flat bright fills, and a rounded bold font. Stories are
bouncy, splashy paint balls with faces; the product is tidy and deliberate.
There are no bombs, missiles, or people judging (judgment shows only as "?"
bubbles and words). Text stays legible at
360×360 px, labels never jump or get covered, and paint stays on the product
wall; `tests/storyImpact/StoryImpactRelease.spec.tsx` guards these.

# AI test automation: The Legacy Workshop

See [the film guide](../AI%20Test%20Automation/README.md) for the finished
61-second film, content source, audio reproduction and export instructions.
