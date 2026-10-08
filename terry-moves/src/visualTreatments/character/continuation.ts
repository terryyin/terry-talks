// Treatment B continued: after the passage, the same shopper begins the
// opening-hours question. They lean in to read the question on the door, then
// raise a hand to ask it, the way they asked about stock. Nothing answers it:
// the stock result stays kept and reservation stays unstarted.
import { blinkAt, gesture, lerpPoint, mix, travel } from '../../aiTestAutomation/motion';
import { Beat, beat } from '../../beatTimeline';
import { continuationBeat } from '../brief';
import { CharacterPose, stage } from './script';

const seconds = 5;

// The raised hand of the stock question, beside the head: aimed up and to
// the right as far from the shopper as the stock card was when they asked it.
const askingFrom = (x: number) => ({ x: x + stage.stockCard.x - stage.home, y: stage.stockCard.y });

// The beat that follows a character version, starting from that version's
// own last pose so the join carries its performance on.
export const characterContinuation = (end: CharacterPose, fps: number): Beat<CharacterPose> => beat(continuationBeat.name, seconds, continuationBeat.caption, (s): CharacterPose => {
	const lean = travel(s, 0.2, 0.8);
	const ask = travel(s, 2.0, 0.8);
	const x = end.shopper.x + 16 * lean;
	return {
		...end,
		beat: continuationBeat.name,
		// Stock stays a kept result, hours is the question being asked, and
		// reservation is still left alone.
		outcomes: { stock: { status: 'done', shown: 1 }, hours: { status: 'next', shown: 1 }, reservation: { status: 'unstarted', shown: 1 } },
		closedSign: 1,
		feedback: 1,
		attention: 'hours',
		shopper: {
			...end.shopper,
			x,
			lift: 4 * gesture(s, 0.2, 0.8),
			mood: 'focused',
			gaze: 1,
			headTilt: mix(mix(end.shopper.headTilt, -10, lean), -4, ask),
			blink: blinkAt(s, [1.4, 4.2]),
			reach: { to: lerpPoint(end.shopper.reach.to, askingFrom(x), ask), amount: mix(end.shopper.reach.amount, 1, ask) },
		},
	};
}, fps);
