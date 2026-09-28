// The later stories' shorter start: no wish bubble and no fuzzy beat (the
// first story explained those). The front ball gets eager, springs out of
// the tray to hover, and a new ball drops into the back of the tray; then it
// crouches and flies along its arc to its own impact spot.

import { Easing } from 'remotion';
import { BallPose, leftTrayOf, Pose, STORY_SIZE, StoryBefore, storyInBacklogOf, StorySpec, storyWishesOf } from './scene';
import { HOP, HOVER } from './layout';
import { dropping } from './openingBeats';
import { ARC_UNTIL, CROUCH, CROUCH_POINT, flightBeatOf, rollingUp, storyOf, takeOffPose, takeOffSpot } from './storyBeats';
import { between, bounce, bounceSpeed, BOUNCY, hopping, jelly, lastFrameAt, lerp, lerpPoint, toward, unless, withoutUndefined } from './motion';

export const LAUNCH_SECONDS = 2.2;
const LAUNCH_END = lastFrameAt(LAUNCH_SECONDS);
const LEAVE = 0.7; // it springs out of the tray
const ROLL = { from: 0.8, to: 1.3 }; // the rest of the queue rolls up
const REFILL_FROM = 0.85; // the new ball starts dropping in
const LAND = { from: LAUNCH_END - 0.35, to: LAUNCH_END }; // it settles exactly on its hover spot

// Still in the tray: settling from its eager hop (or hopping once, getting
// eager), then it crouches and rises onto its toes.
const inTray = (sec: number, eager: boolean): { hop: number; squash: number } => {
	if (eager && sec < 0.3) {
		const k = between(sec, 0, 0.3, Easing.in(Easing.quad));
		return { hop: HOP * (1 - k), squash: 1 - 0.08 * k };
	}
	const hops = eager ? [{ from: 0, to: 0.3, height: 0 }] : [{ from: 0.05, to: 0.3, height: 20 }];
	const hopped = hopping(sec, hops, 0.12);
	if (hopped) return hopped;
	const crouch = between(sec, 0.42, 0.55);
	return takeOffPose(crouch, between(sec, 0.55, LEAVE, Easing.out(Easing.quad)));
};

// The queue behind the story rolls up a slot, and its refill drops into the back.
const queueOf = (before: StoryBefore, stage: StoryBefore, sec: number): BallPose[] => {
	const roll = 1 - between(sec, ROLL.from, ROLL.to, Easing.inOut(Easing.cubic));
	return stage.backlog.map((ball, i) => {
		if (i >= before.backlog.length) {
			const drop = dropping(sec - REFILL_FROM);
			return withoutUndefined({ ...ball, hop: unless(drop?.hop, 0), squash: unless(drop?.squash, 1) });
		}
		return rollingUp(ball, i, before.backlog.length + 1, stage.backlog.length, roll);
	});
};

// `eager`: the story starts hopping at the front of the queue, as the
// previous story's last beat left it.
export const launchBeatOf = (spec: StorySpec, before: StoryBefore, eager = false) => (sec: number): Pose => {
	if (sec < LEAVE) {
		const base = storyInBacklogOf(spec, before);
		const { hop, squash } = inTray(sec, eager);
		const excited = eager || sec >= 0.05;
		const front: BallPose = {
			...spec.ball,
			eager: excited ? true : undefined,
			hop: excited ? unless(hop, HOP) : unless(hop, 0),
			squash: unless(squash, 1),
		};
		return { ...base, backlog: [withoutUndefined(front), ...base.backlog.slice(1)] };
	}
	const stage = leftTrayOf(spec, before);
	const base = storyWishesOf(spec, stage);
	const rise = bounce(sec, LEAVE, BOUNCY);
	const speed = Math.abs(bounceSpeed(sec, LEAVE, BOUNCY));
	const land = between(sec, LAND.from, LAND.to);
	const sprung = lerpPoint(takeOffSpot(spec, before), HOVER, rise);
	const at = land >= 1 ? undefined : lerpPoint(sprung, HOVER, land);
	// Tall and thin while shooting up, then a jelly wobble as it hovers.
	const squash = toward(jelly(sec, LEAVE + 0.55, 0.12, 2.5, 4) / (1 + speed * 2), 1, land);
	return {
		...storyOf(base, {
			ball: { ...base.story!.ball, size: lerp(spec.ball.size, STORY_SIZE, Math.min(1, rise)) },
			at,
			squash: unless(squash, 1),
			bubble: 0,
		}),
		backlog: queueOf(before, stage, sec),
	};
};

// A quick flight: from its hover spot it crouches, turning fuzzy, then flies
// the first story's arc (from its launch on) to its own impact spot.
export const QUICK_FLIGHT_SECONDS = 1.8;
const QUICK_END = lastFrameAt(QUICK_FLIGHT_SECONDS);
const QUICK_CROUCH = 0.3;

export const quickFlightBeatOf = (spec: StorySpec, before: StoryBefore) => {
	const flight = flightBeatOf(spec, before);
	return (sec: number): Pose => {
		if (sec < QUICK_CROUCH) {
			const k = between(sec, 0, QUICK_CROUCH, Easing.inOut(Easing.quad));
			return storyOf(storyWishesOf(spec, before), {
				at: k === 0 ? undefined : lerpPoint(HOVER, CROUCH_POINT, k),
				squash: unless(1 + 0.3 * k, 1),
				bubble: 0,
				fuzz: unless(k, 0),
			});
		}
		const k = (sec - QUICK_CROUCH) / (QUICK_END - QUICK_CROUCH);
		return flight(CROUCH.to + k * (ARC_UNTIL - CROUCH.to));
	};
};
