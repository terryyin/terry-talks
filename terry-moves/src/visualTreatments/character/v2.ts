// Treatment B, second take. Review of the first take found the shopper's
// response to the stock answer and to the closed door read too weakly, and the
// pointing hand ended partly hidden under the opening-hours sign. This take
// revises only those performances; every other beat, the timing and the
// shared wording are the first take's.
import { blinkAt, gesture, mix, travel } from '../../aiTestAutomation/motion';
import { CharacterPose, characterV1, CharacterVersion, stage } from './script';

const first = characterV1.performance;

// Points on the shopper's own body and the scene, for this take's gestures.
const chest = { x: stage.home + 6, y: stage.ground - 168 };
const chin = { x: stage.door + 8, y: stage.ground - 230 };
// Touching the hours sign's near edge, in front of it rather than under it.
const hoursEdge = { x: 600, y: 705 };

// A usable answer: a visible breath out with a hand to the chest, then the
// shopper looks up at the kept result and gives one small nod. Relief, not
// celebration: the stock question is answered, nothing more.
const result = (s: number): CharacterPose => {
	const pose = first.result(s);
	const answered = travel(s, 0.3, 0.6);
	const relief = s >= 0.9 && s < 2.2;
	const look = travel(s, 2.0, 0.6);
	return {
		...pose,
		shopper: {
			...pose.shopper,
			mood: answered < 0.5 ? 'focused' : relief ? 'relieved' : 'pleased',
			gaze: 1,
			headTilt: mix(3 * gesture(s, 0.8, 1.6), 7, look) + 5 * gesture(s, 2.8, 0.9),
			blink: blinkAt(s, [4.1]),
			reach: { to: chest, amount: gesture(s, 0.8, 1.7) },
		},
	};
};

// The closed door: a half step back in surprise, then a thoughtful hand to the
// chin as the question changes, the hand back at rest before opening hours
// become next.
const feedback = (s: number): CharacterPose => {
	const pose = first.feedback(s);
	if (s < 2.3) return pose;
	return {
		...pose,
		shopper: {
			...pose.shopper,
			x: stage.door - 30 * gesture(s, 2.3, 1.6),
			mood: s < 3.9 ? 'surprised' : 'concerned',
			headTilt: -5 * gesture(s, 2.3, 1.2) + 5 * travel(s, 3.9, 0.6),
			reach: { to: chin, amount: gesture(s, 4.0, 1.9) },
		},
	};
};

// Opening hours become next: the same turn and glance back as the first take,
// with the hand settling against the hours sign's edge where it stays visible.
const next = (s: number): CharacterPose => {
	const pose = first.next(s);
	return { ...pose, shopper: { ...pose.shopper, reach: { ...pose.shopper.reach, to: hoursEdge } } };
};

export const characterV2: CharacterVersion = {
	...characterV1,
	id: 'TreatmentCharacterV2',
	performance: { ...first, result, feedback, next },
};
