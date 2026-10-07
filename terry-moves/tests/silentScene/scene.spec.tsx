import { renderToStaticMarkup } from 'react-dom/server';
import { compileScene, ScenePose } from '../../src/silentScene/compileScene';
import { SceneScript, script } from '../../src/silentScene/script';
import { SilentScene } from '../../src/silentScene/SilentScene';
import { original, reordered } from './fixtures';

const withHold: SceneScript = {
	...reordered,
	moves: [...reordered.moves, { kind: 'hold', seconds: 0.8 }],
};

const expectAttachedWrench = (pose: ScenePose) => {
	const markup = renderToStaticMarkup(<SilentScene pose={pose}/>);
	const document = new DOMParser().parseFromString(markup, 'text/html');
	const actor = document.querySelector('[data-testid="engineer"]')!;
	const [x, y, scale] = actor.getAttribute('transform')!.match(/-?[\d.]+/g)!.map(Number);
	const hand = actor.querySelectorAll('[data-testid="articulated-arm"]')[1];
	const [handX, handY] = hand.getAttribute('data-hand')!.split(',').map(Number);
	const wrench = document.querySelector('[data-testid="carried-wrench"] > g')!;
	const [wrenchX, wrenchY] = wrench.getAttribute('transform')!.match(/-?[\d.]+/g)!.map(Number);
	expect(x).toBe(pose.x);
	expect(y).toBe(pose.y - pose.lift);
	expect(wrenchX).toBeCloseTo(x + handX * scale, 8);
	expect(wrenchY).toBeCloseTo(y + handY * scale, 8);
	expect(document.querySelector('[data-testid="caption"], text')).toBeNull();
	expect(document.body.textContent).toBe('');
};

describe.each([['original story order', original], ['reordered with hold', withHold], ['authored with cut', script]] as const)('%s picture', (_order, authored) => {
	const scene = compileScene(authored);

	test('keeps the wrench on the real articulated hand through every move without captions', () => {
		scene.beats.forEach((current) => {
			const { from, durationInFrames } = scene.beatRange(current.name);
			[from, from + Math.floor(durationInFrames / 2), from + durationInFrames - 1].forEach((frame) => {
				expectAttachedWrench(scene.poseAt(frame));
			});
		});
	});
});

test('the wrench stays at the real world hand on the cut frame and both neighbors', () => {
	const scene = compileScene(script);
	const { from } = scene.beatRange('3 cut to door');
	[from - 1, from, from + 1].forEach((frame) => expectAttachedWrench(scene.poseAt(frame)));
});
