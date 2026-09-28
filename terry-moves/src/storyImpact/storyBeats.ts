// The story's beats of the one-story film: the front ball hops, wishes, turns
// fuzzy, flies and splats. Stories move with springs, squash and stretch.
// Each beat is built from a story and the stage before it, and maps seconds
// into the beat to a pose; the plain beats are the pink (example) story's.

import { Easing, interpolate } from 'remotion';
import {
	BallPose,
	pinkBefore,
	pinkStory,
	Pose,
	SplatPose,
	StoryBeat,
	StoryBefore,
	storyFliesOf,
	storyInBacklogOf,
	storyIsFuzzyOf,
	StoryPose,
	storySplashesOf,
	StorySpec,
	storyWishesOf,
} from './scene';
import { flightPoint, HOVER, Point, traySpot } from './layout';
import { between, bounce, bounceSpeed, BOUNCY, clamp01, FPS, hopping, jelly, lastFrameAt, lerp, lerpPoint, POPPY, settle, unless, WOBBLY, withoutUndefined } from './motion';

export const storyOf = (base: Pose, motion: Partial<StoryPose>): Pose => ({
	...base,
	story: withoutUndefined({ ...base.story!, ...motion }),
});

// Just high enough to clear the tray's front lip.
const TAKE_OFF_HOP = 22;
// Where the front ball springs out from: on its toes above its spot in the
// full tray.
export const takeOffSpot = (spec: StorySpec, before: StoryBefore): Point => {
	const front = traySpot(before.backlog.length + 1, 0, spec.ball.size);
	return { x: front.x, y: front.y - TAKE_OFF_HOP };
};

// The front ball crouches (0 → 1), then rises onto its toes (0 → 1), ready
// to spring out.
export const takeOffPose = (crouch: number, rise: number): { hop: number; squash: number } => ({
	hop: TAKE_OFF_HOP * rise,
	squash: 1 + 0.2 * crouch * (1 - rise) - 0.08 * rise,
});

// A queued ball rolling up one slot (`roll` 1 → 0) from its place in a tray
// of `fromCount` balls to the one in front of it in a tray of `toCount`.
export const rollingUp = (ball: BallPose, i: number, fromCount: number, toCount: number, roll: number): BallPose => {
	const dx = (traySpot(fromCount, i + 1, ball.size).x - traySpot(toCount, i, ball.size).x) * roll;
	return withoutUndefined({ ...ball, dx: unless(dx, 0) });
};

// 1. The tidy product with its backlog; the front ball gets eager and hops.
export const backlogBeatOf: StoryBeat = (spec, before) => (sec) => {
	const base = storyInBacklogOf(spec, before);
	const hops = [
		{ from: 0.45, to: 0.95, height: 16 },
		{ from: 1.05, to: 1.4, height: 8 },
	];
	const bouncing = hopping(sec, hops, 0.12);
	let hop = bouncing?.hop ?? 0;
	let squash = bouncing?.squash ?? 1;
	if (!bouncing && sec >= 1.5) {
		// Crouch, then rise onto its toes, ready to spring out.
		const crouch = interpolate(sec, [1.5, 1.7], [0, 1], { extrapolateRight: 'clamp' });
		const rise = between(sec, 1.7, 2, Easing.out(Easing.quad));
		({ hop, squash } = takeOffPose(crouch, rise));
	}
	const [front, ...rest] = base.backlog;
	const moving: BallPose = { ...front, hop: unless(hop, 0), squash: unless(squash, 1) };
	return { ...base, backlog: [withoutUndefined(moving), ...rest] };
};

// 2. The front ball springs up out of the tray to hover, and its wish pops out.
export const wishBeatOf: StoryBeat = (spec, before) => (sec) => {
	const base = storyWishesOf(spec, before);
	const LAUNCH = 0.05;
	const rise = bounce(sec, LAUNCH, BOUNCY);
	const speed = Math.abs(bounceSpeed(sec, LAUNCH, BOUNCY));
	const at = rise === 1 ? undefined : lerpPoint(takeOffSpot(spec, before), HOVER, rise);
	const size = lerp(spec.ball.size, base.story!.ball.size, Math.min(1, rise));
	// Tall and thin while shooting up, then a jelly wobble once it hovers.
	const squash = settle(jelly(sec, 0.6, 0.12, 2.5, 4) / (1 + speed * 2), 1);
	const bubble = bounce(sec, 0.9, POPPY);
	// The rest of the queue rolls up to fill the gap.
	const roll = interpolate(sec, [0.35, 1.2], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	const backlog = base.backlog.map((ball, i) => rollingUp(ball, i, base.backlog.length + 1, base.backlog.length, roll));
	return {
		...storyOf(base, {
			ball: { ...base.story!.ball, size },
			at,
			squash: unless(squash, 1),
			bubble: unless(bubble, 1),
		}),
		backlog,
	};
};

// 3. The wish bubble pops away and the ball turns fuzzy, wobbling like jelly.
const FUZZ_FROM = 0.35;
export const fuzzyBeatOf: StoryBeat = (spec, before) => (sec) => {
	if (sec < FUZZ_FROM) {
		const shrink = interpolate(sec, [0, FUZZ_FROM], [0, 1], { easing: Easing.in(Easing.back(2)) });
		return storyOf(storyWishesOf(spec, before), { bubble: unless(Math.max(0, 1 - shrink), 1) });
	}
	const fuzz = bounce(sec, FUZZ_FROM, WOBBLY);
	const squash = jelly(sec, FUZZ_FROM, 0.16);
	return storyOf(storyIsFuzzyOf(spec, before), { fuzz: unless(fuzz, 1), squash: unless(squash, 1) });
};

// 4. It crouches, launches, and flies along its arc, stretching with speed.
export const CROUCH = { from: 0.25, to: 0.75 };
export const CROUCH_POINT: Point = { x: HOVER.x - 4, y: HOVER.y + 42 };
export const FLIGHT_SECONDS = 2.5;
// The ball reaches the product on the flight beat's last frame.
export const ARC_UNTIL = lastFrameAt(FLIGHT_SECONDS);

// Flight progress over the beat: 0 until launch, then slightly accelerating.
const flightAt = (sec: number): number => {
	const u = clamp01((sec - CROUCH.to) / (ARC_UNTIL - CROUCH.to));
	return 0.75 * u + 0.25 * u * u;
};

export const flightBeatOf: StoryBeat = (spec, before) => (sec) => {
	const base = storyFliesOf(spec, before);
	const arc = (t: number) => flightPoint(t, spec.impact);
	const flight = flightAt(sec);
	if (sec < CROUCH.to) {
		// Still fuzzy, it gathers itself: dips and squashes.
		const k = between(sec, CROUCH.from, CROUCH.to, Easing.inOut(Easing.quad));
		return storyOf(storyIsFuzzyOf(spec, before), {
			at: k === 0 ? undefined : lerpPoint(HOVER, CROUCH_POINT, k),
			squash: unless(1 + 0.3 * k, 1),
		});
	}
	// Leaving the crouch, it eases from its crouch point onto the arc.
	const join = clamp01(flight / 0.25);
	const offset = { x: CROUCH_POINT.x - arc(0).x, y: CROUCH_POINT.y - arc(0).y };
	const onArc = arc(flight);
	const at = join < 1 ? { x: onArc.x + offset.x * (1 - join), y: onArc.y + offset.y * (1 - join) } : undefined;
	const step = 1 / FPS;
	const a = arc(flightAt(sec - step));
	const b = arc(flightAt(sec + step));
	const speed = Math.hypot(b.x - a.x, b.y - a.y) / 2; // px per frame
	const along = Math.min(1.5, 1 + speed / 70);
	const snap = Math.max(0, 1 - (sec - CROUCH.to) / 0.12); // launch: squash snaps into stretch
	const stretch = { along: lerp(along, 0.8, snap), across: 1 / lerp(along, 0.8, snap) };
	return storyOf(base, { flight, at, stretch });
};

// 5. SPLAT: the paint bursts across cells and rows, the word pops, and it drips.
export const splatBeatOf: StoryBeat = (spec, before) => (sec) => {
	const base = storySplashesOf(spec, before);
	const splat = base.splat!;
	const radius = settle(lerp(0.3, splat.radius, bounce(sec, 0, POPPY)), splat.radius);
	const drip = settle(
		interpolate(sec, [0.45, 2.4], [0, splat.drip], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.inOut(Easing.cubic),
		}),
		splat.drip,
	);
	const shoutScale = bounce(sec, 0.08, POPPY);
	const growing: SplatPose = withoutUndefined({ ...splat, radius, drip, shoutScale: unless(shoutScale, 1) });
	return { ...base, splat: growing };
};

const pink = pinkBefore();
export const backlogBeat = backlogBeatOf(pinkStory, pink);
export const wishBeat = wishBeatOf(pinkStory, pink);
export const fuzzyBeat = fuzzyBeatOf(pinkStory, pink);
export const flightBeat = flightBeatOf(pinkStory, pink);
export const splatBeat = splatBeatOf(pinkStory, pink);
