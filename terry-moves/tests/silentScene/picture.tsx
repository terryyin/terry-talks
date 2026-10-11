import { renderToStaticMarkup } from 'react-dom/server';
import { engineerRig } from '../../src/aiTestAutomation/actors';
import { ScenePose } from '../../src/silentScene/compileScene';
import { SceneScript } from '../../src/silentScene/script';
import { SilentScene } from '../../src/silentScene/SilentScene';

const numbers = (text: string) => text.match(/-?[\d.]+/g)!.map(Number);
const point = (text: string) => { const [x, y] = text.split(',').map(Number); return { x, y }; };
const propsAt = (document: Document, testId: string) => [...document.querySelectorAll(`[data-testid="${testId}"]`)].map((prop) => {
	const [x, y] = numbers(prop.querySelector('g')!.getAttribute('transform')!);
	return { name: prop.getAttribute('data-prop'), x, y };
});

// Reads the drawn picture: the world hand comes from the real articulated arm.
export const picture = (pose: ScenePose, places: SceneScript['places']) => {
	const document = new DOMParser().parseFromString(renderToStaticMarkup(<SilentScene pose={pose} places={places}/>), 'text/html');
	const actor = document.querySelector('[data-testid="engineer"]')!;
	const [x, y, scale] = numbers(actor.getAttribute('transform')!);
	const arm = actor.querySelectorAll('[data-testid="articulated-arm"]')[1];
	const [shoulder, elbow, hand] = ['data-shoulder', 'data-elbow', 'data-hand'].map((name) => point(arm.getAttribute(name)!));
	const pupils = [...actor.querySelectorAll('ellipse[rx="4.5"]')].map((pupil) => Number(pupil.getAttribute('cx')));
	return {
		document,
		actor: { x, y },
		hand,
		worldHand: { x: x + hand.x * scale, y: y + hand.y * scale },
		upper: Math.hypot(elbow.x - shoulder.x, elbow.y - shoulder.y),
		lower: Math.hypot(hand.x - elbow.x, hand.y - elbow.y),
		// The Engineer's pupils sit at -31 and 17 when looking straight ahead.
		gaze: pupils[0] + 31,
		carried: propsAt(document, 'carried-prop'),
		resting: propsAt(document, 'resting-prop'),
	};
};

export const expectCarriedWrench = (pose: ScenePose, places: SceneScript['places']) => {
	const drawn = picture(pose, places);
	expect(drawn.actor).toEqual({ x: pose.x, y: pose.y - pose.lift });
	expect(drawn.carried).toHaveLength(1);
	expect(drawn.carried[0].name).toBe('wrench');
	expect(drawn.carried[0].x).toBeCloseTo(drawn.worldHand.x, 8);
	expect(drawn.carried[0].y).toBeCloseTo(drawn.worldHand.y, 8);
	expect(drawn.upper).toBeCloseTo(engineerRig.upper, 8);
	expect(drawn.lower).toBeCloseTo(engineerRig.lower, 8);
	expect(drawn.resting).toEqual([]);
	expect(drawn.document.querySelector('[data-testid="caption"], text')).toBeNull();
	expect(drawn.document.body.textContent).toBe('');
	return drawn;
};

export const firstMiddleLast = ({ from, durationInFrames }: { from: number; durationInFrames: number }) => [from, from + Math.floor(durationInFrames / 2), from + durationInFrames - 1];

// The released wrench is drawn once, on the surface, with nothing in the fixed-length arm's hand.
export const expectWrenchRestingAt = (surface: { x: number; y: number }, pose: ScenePose, places: SceneScript['places']) => {
	const drawn = picture(pose, places);
	expect(drawn.resting).toEqual([{ name: 'wrench', ...surface }]);
	expect(drawn.carried).toEqual([]);
	expect(drawn.upper).toBeCloseTo(engineerRig.upper, 8);
	expect(drawn.lower).toBeCloseTo(engineerRig.lower, 8);
	return drawn;
};
