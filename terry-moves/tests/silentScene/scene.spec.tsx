import { renderToStaticMarkup } from 'react-dom/server';
import { compileScene } from '../../src/silentScene/compileScene';
import { SceneScript, script } from '../../src/silentScene/script';
import { SilentScene } from '../../src/silentScene/SilentScene';

const reordered: SceneScript = {
	...script,
	moves: [
		script.moves[2],
		script.moves[1],
		script.moves[0],
		{ kind: 'hold', seconds: 0.8 },
	],
};

describe.each([['authored', script], ['reordered with hold', reordered]] as const)('%s picture', (_order, authored) => {
	const scene = compileScene(authored);

	test('keeps the wrench on the real articulated hand through every move without captions', () => {
		scene.beats.forEach((current) => {
			const { from, durationInFrames } = scene.beatRange(current.name);
			[from, from + Math.floor(durationInFrames / 2), from + durationInFrames - 1].forEach((frame) => {
				const pose = scene.poseAt(frame);
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
			});
		});
	});
});
