// The one-story film as a timeline of beats over the storyboard's pose model.
// Each beat maps its progress (0–1) to a pose; where a beat matches a
// storyboard board it ends on that board's pose. Stories move with springs,
// squash and stretch; the product stays tidy. Pure, so any frame can be
// sampled in tests.

import { Easing, interpolate } from 'remotion';
import {
	BallPose,
	exampleBall,
	laterStories,
	Pose,
	productOverTime,
	SplatPose,
	StoryPose,
	storyFlies,
	storyIsFuzzy,
	storySplashes,
	storyWishes,
} from './scene';
import { flightPoint, HOVER, Point, traySpot } from './layout';
import { bounce, bounceSpeed, BOUNCY, clamp01, FPS, jelly, lerp, lerpPoint, POPPY, settle, unless, WOBBLY, withoutUndefined } from './motion';

export { FPS };

export type Beat = {
	name: string;
	seconds: number;
	caption?: string; // shown from this beat until the next captioned beat
	pose: (t: number) => Pose;
};

const storyOf = (base: Pose, motion: Partial<StoryPose>): Pose => ({
	...base,
	story: withoutUndefined({ ...base.story!, ...motion }),
});

// --- beats ------------------------------------------------------------------

// The front ball's spot in the full tray, and the rest of the queue's.
const frontSpot = traySpot(laterStories.length + 1, 0, exampleBall.size);
// Just high enough to clear the tray's front lip.
const TAKE_OFF_HOP = 22;

// 1. The tidy product with its backlog; the front ball gets eager and hops.
const backlogBeat = (sec: number): Pose => {
	const base = productOverTime();
	const hops = [
		{ from: 0.45, to: 0.95, height: 16 },
		{ from: 1.05, to: 1.4, height: 8 },
	];
	const airborne = hops.find((h) => sec >= h.from && sec < h.to);
	const landed = hops.find((h) => sec >= h.to && sec < h.to + 0.12);
	let hop = 0;
	let squash = 1;
	if (airborne) {
		const k = (sec - airborne.from) / (airborne.to - airborne.from);
		hop = airborne.height * 4 * k * (1 - k);
		squash = 1 - 0.12 * Math.sin(Math.PI * k);
	} else if (landed) {
		squash = 1 + 0.22 * Math.sin((Math.PI * (sec - landed.to)) / 0.12);
	} else if (sec >= 1.5) {
		// Crouch, then rise onto its toes, ready to spring out.
		const crouch = interpolate(sec, [1.5, 1.7], [0, 1], { extrapolateRight: 'clamp' });
		const rise = interpolate(sec, [1.7, 2], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.out(Easing.quad),
		});
		squash = 1 + 0.2 * crouch * (1 - rise) - 0.08 * rise;
		hop = TAKE_OFF_HOP * rise;
	}
	const [front, ...rest] = base.backlog;
	const moving: BallPose = { ...front, hop: unless(hop, 0), squash: unless(squash, 1) };
	return { ...base, backlog: [withoutUndefined(moving), ...rest] };
};

// 2. The front ball springs up out of the tray to hover, and its wish pops out.
const wishBeat = (sec: number): Pose => {
	const base = storyWishes();
	const LAUNCH = 0.05;
	const rise = bounce(sec, LAUNCH, BOUNCY);
	const speed = Math.abs(bounceSpeed(sec, LAUNCH, BOUNCY));
	const start = { x: frontSpot.x, y: frontSpot.y - TAKE_OFF_HOP };
	const at = rise === 1 ? undefined : lerpPoint(start, HOVER, rise);
	const size = lerp(exampleBall.size, base.story!.ball.size, Math.min(1, rise));
	// Tall and thin while shooting up, then a jelly wobble once it hovers.
	const squash = settle(jelly(sec, 0.6, 0.12, 2.5, 4) / (1 + speed * 2), 1);
	const bubble = bounce(sec, 0.9, POPPY);
	// The rest of the queue rolls up to fill the gap.
	const roll = interpolate(sec, [0.35, 1.2], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	const backlog = base.backlog.map((ball, i) => {
		const dx = (traySpot(base.backlog.length + 1, i + 1, ball.size).x - traySpot(base.backlog.length, i, ball.size).x) * roll;
		return withoutUndefined({ ...ball, dx: unless(dx, 0) });
	});
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
const fuzzyBeat = (sec: number): Pose => {
	if (sec < FUZZ_FROM) {
		const shrink = interpolate(sec, [0, FUZZ_FROM], [0, 1], { easing: Easing.in(Easing.back(2)) });
		return storyOf(storyWishes(), { bubble: unless(Math.max(0, 1 - shrink), 1) });
	}
	const fuzz = bounce(sec, FUZZ_FROM, WOBBLY);
	const squash = jelly(sec, FUZZ_FROM, 0.16);
	return storyOf(storyIsFuzzy(), { fuzz: unless(fuzz, 1), squash: unless(squash, 1) });
};

// 4. It crouches, launches, and flies along its arc, stretching with speed.
const CROUCH = { from: 0.25, to: 0.75 };
const CROUCH_POINT: Point = { x: HOVER.x - 4, y: HOVER.y + 42 };
const FLIGHT_SECONDS = 2.5;
// The ball reaches the product on the flight beat's last frame.
const ARC_UNTIL = (FLIGHT_SECONDS * FPS - 1) / FPS;

// Flight progress over the beat: 0 until launch, then slightly accelerating.
const flightAt = (sec: number): number => {
	const u = clamp01((sec - CROUCH.to) / (ARC_UNTIL - CROUCH.to));
	return 0.75 * u + 0.25 * u * u;
};

const flightBeat = (sec: number): Pose => {
	const base = storyFlies();
	const flight = flightAt(sec);
	if (sec < CROUCH.to) {
		// Still fuzzy, it gathers itself: dips and squashes.
		const k = interpolate(sec, [CROUCH.from, CROUCH.to], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.inOut(Easing.quad),
		});
		return storyOf(storyIsFuzzy(), {
			at: k === 0 ? undefined : lerpPoint(HOVER, CROUCH_POINT, k),
			squash: unless(1 + 0.3 * k, 1),
		});
	}
	// Leaving the crouch, it eases from its crouch point onto the arc.
	const join = clamp01(flight / 0.25);
	const offset = { x: CROUCH_POINT.x - flightPoint(0).x, y: CROUCH_POINT.y - flightPoint(0).y };
	const onArc = flightPoint(flight);
	const at = join < 1 ? { x: onArc.x + offset.x * (1 - join), y: onArc.y + offset.y * (1 - join) } : undefined;
	const step = 1 / FPS;
	const a = flightPoint(flightAt(sec - step));
	const b = flightPoint(flightAt(sec + step));
	const speed = Math.hypot(b.x - a.x, b.y - a.y) / 2; // px per frame
	const along = Math.min(1.5, 1 + speed / 70);
	const snap = Math.max(0, 1 - (sec - CROUCH.to) / 0.12); // launch: squash snaps into stretch
	const stretch = { along: lerp(along, 0.8, snap), across: 1 / lerp(along, 0.8, snap) };
	return storyOf(base, { flight, at, stretch });
};

// 5. SPLAT: the paint bursts across cells and rows, the word pops, and it drips.
const splatBeat = (sec: number): Pose => {
	const base = storySplashes();
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

// --- timeline ------------------------------------------------------------

const beat = (name: string, seconds: number, caption: string | undefined, bySeconds: (sec: number) => Pose): Beat => {
	const frames = Math.round(seconds * FPS);
	return {
		name,
		seconds,
		caption,
		pose: (t) => bySeconds((clamp01(t) * (frames - 1)) / FPS),
	};
};

export const beats: Beat[] = [
	beat('backlog', 2, 'A story is romantic: a wish for a better world.', backlogBeat),
	beat('wish', 3.5, undefined, wishBeat),
	beat('fuzzy', 3, 'It\'s fuzzy. It doesn\'t care about our boundaries.', fuzzyBeat),
	beat('flight', FLIGHT_SECONDS, 'It carries an impact we want in the world…', flightBeat),
	beat('splat', 3, '…and it makes an impact on the product: SPLAT!', splatBeat),
];

const framesOf = (b: Beat) => Math.round(b.seconds * FPS);

export const filmDurationInFrames = beats.reduce((sum, b) => sum + framesOf(b), 0);

// Where a beat sits on the film's timeline, in frames.
export const beatRange = (name: string): { from: number; durationInFrames: number } => {
	let from = 0;
	for (const b of beats) {
		if (b.name === name) return { from, durationInFrames: framesOf(b) };
		from += framesOf(b);
	}
	throw new Error(`No beat named ${name}`);
};

const beatAt = (frame: number): { index: number; t: number } => {
	const f = Math.max(0, Math.min(filmDurationInFrames - 1, Math.floor(frame)));
	let from = 0;
	for (let index = 0; index < beats.length; index++) {
		const frames = framesOf(beats[index]);
		if (f < from + frames) return { index, t: frames > 1 ? (f - from) / (frames - 1) : 1 };
		from += frames;
	}
	return { index: beats.length - 1, t: 1 };
};

export const poseAt = (frame: number): Pose => {
	const { index, t } = beatAt(frame);
	return beats[index].pose(t);
};

export const captionAt = (frame: number): string => {
	const { index } = beatAt(frame);
	for (let i = index; i >= 0; i--) {
		const { caption } = beats[i];
		if (caption !== undefined) return caption;
	}
	return '';
};
