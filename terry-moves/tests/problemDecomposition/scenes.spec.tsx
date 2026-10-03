import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProblemDecompositionScene } from '../../src/problemDecomposition/Scene';
import { filmScript, finalFrameSeconds } from '../../src/problemDecomposition/film';
import { assimilationAt, blueBallAt, blueCoherentAt, blueStory, chapterOf, coherentAt, customerSplitAt, deliveryAt, feedbackCue, firstStory, flightStart, flowFlightAt, flowImpactAt, futureSpot, impactAt, productAt, sceneById, solutionLayers, spokenCue, structuralSplitAt, verticalFlightAt, verticalFlashAt, verticalImpactAt, wholeProductGlowAt } from '../../src/problemDecomposition/series';

// Actual image decoding and text layout are observed in the complete film render.
jest.mock('remotion', () => ({
	...jest.requireActual('remotion'),
	Img: (props: React.ComponentProps<'img'>) => React.createElement('img', props),
}));

describe('a recognizable sequel with useful stopping boundaries', () => {
	const frame = (seconds: number) => renderToStaticMarkup(<ProblemDecompositionScene seconds={seconds} />);

	it('keeps the Story Impact product axes throughout all four explicit chapters', () => {
		expect(filmScript.scenes.map((scene) => chapterOf(scene.id))).toEqual([0, 0, 0, 1, 2, 2, 3, 3, 3, 3, 3]);
		filmScript.scenes.forEach((scene) => {
			const rendered = frame(scene.start + 0.5);
			['Structure', 'Behavior', 'Time', 'Product', 'Distinction', 'Premises', 'Goals', 'Principles'].forEach((label) => expect(rendered).toContain(label));
		});
		expect(frame(sceneById('premises').start + 1)).toContain('Two premises');
		expect(frame(sceneById('value').start + 1)).toContain('Two goals');
		expect(frame(sceneById('vertical').start + 1)).toContain('Four principles');
	});

	it('labels actual Screen, API and Database cells in the projected leftmost structural column', () => {
		const cue = spokenCue('parts', 0, 'structure');
		expect(structuralSplitAt(cue)).toBe(0);
		expect(structuralSplitAt(cue + 1)).toBe(1);
		expect(solutionLayers.map(({ col, row, name }) => ({ col, row, name }))).toEqual([
			{ col: 3, row: 3, name: 'Screen' }, { col: 3, row: 2, name: 'API' }, { col: 3, row: 0, name: 'Database' },
		]);
		const rendered = frame(cue + 1.1);
		expect(rendered).toContain('data-testid="solution-layers"');
		expect(rendered.match(/data-layer=/g)).toHaveLength(3);
		expect(rendered).not.toContain('data-testid="solution-pieces"');
		expect(rendered).not.toContain('data-testid="customer-outcome"');
	});

	it('splits the wish into three narrower travel outcomes without using a bill-splitting example', () => {
		const cue = spokenCue('problem', 0, 'splits');
		expect(customerSplitAt(cue)).toBe(0);
		expect(customerSplitAt(cue + 1.4)).toBe(1);
		const rendered = frame(cue + 1.4);
		expect(rendered.match(/data-testid="customer-outcome"/g)).toHaveLength(3);
		['Find the next train', 'Check the fare', 'Find a step-free route'].forEach((name) => expect(rendered).toContain(`data-outcome="${name}"`));
		expect(rendered).not.toContain('Split equally');
		expect(rendered).toContain('cx="640" cy="440" r="58"');
		expect(rendered).toContain('cx="980" cy="440" r="58"');
	});

	it('keeps the premises illustration within the same travel problem', () => {
		const rendered = frame(spokenCue('premises', 1) + 0.6);
		expect(rendered).toContain('Get home');
		expect(rendered).toContain('Next train');
		expect(rendered).not.toContain('$90 / 3 friends');
	});

	it('flies one wish across the wall, splashes several structural rows, then assimilates before feedback', () => {
		expect(deliveryAt(flightStart()).ball).toEqual({ x: 640, y: 440 });
		const flying = deliveryAt((flightStart() + impactAt()) / 2);
		expect(flying.ball).toBeDefined();
		expect(flying.paint).toBeUndefined();
		const splashed = deliveryAt(impactAt() + 0.4);
		expect(splashed.ball).toBeUndefined();
		expect(splashed.paint!.radius).toBeGreaterThan(1);
		expect(new Set(splashed.cells.filter((cell) => cell.smear).map((cell) => cell.row)).size).toBeGreaterThan(1);
		const completed = deliveryAt(coherentAt());
		expect(completed.complete).toBe(true);
		expect(completed.paint).toBeUndefined();
		firstStory.changed.forEach((spot) => expect(completed.cells.find((cell) => cell.col === spot.col && cell.row === spot.row)?.color).toBe(firstStory.ball.color));
		expect(completed.cells.every((cell) => cell.dx === 0 && cell.dy === 0 && cell.rot === 0 && !cell.smear)).toBe(true);
		expect(coherentAt()).toBeLessThan(feedbackCue());
	});

	it('reorders only untouched future balls, with labels and spheres kept apart, and retains completed value at stop', () => {
		expect(futureSpot(1, feedbackCue() - 0.01).x).toBeLessThan(futureSpot(2, feedbackCue() - 0.01).x);
		expect(futureSpot(2, feedbackCue() + 1.75).x).toBeLessThan(futureSpot(1, feedbackCue() + 1.75).x);
		for (let elapsed = 0; elapsed <= 1.75; elapsed += 0.025) {
			const first = futureSpot(1, feedbackCue() + elapsed);
			const second = futureSpot(2, feedbackCue() + elapsed);
			// Radius 58 + two label lines: bounds from -58 to +126; names fit 170 px.
			expect(Math.abs(first.x - second.x) >= 170 || Math.abs(first.y - second.y) >= 184).toBe(true);
		}
		const stopped = frame(sceneById('stop').start + 4);
		expect(stopped).toContain('data-testid="time-paused"');
		expect(stopped).toContain('No waste.');
		expect(stopped).toContain('No damage.');
		expect(stopped).toContain('data-coherent="true"');
		expect(stopped).toContain('Next train leaves at 22:45');
		expect(stopped.match(/data-started="false"/g)).toHaveLength(2);
		expect(stopped).not.toContain('data-testid="splat"');
	});

	it('grows and glows the blue story for Valuable, then makes its customer result visible', () => {
		const valuable = spokenCue('vertical', 0, 'valuable');
		const idle = blueBallAt(valuable - 0.01)!;
		const valued = blueBallAt(valuable + 0.5)!;
		expect(idle.radius).toBe(58);
		expect(valued.radius).toBe(68);
		expect(valued.glow).toBe(1);
		expect(valued.visible).toBe(0);
		const visible = blueBallAt(spokenCue('vertical', 0, 'visible') + 0.5)!;
		expect(visible.visible).toBe(1);
		expect(frame(spokenCue('vertical', 0, 'visible') + 0.5)).toContain('data-visible="1"');
	});

	it('physically flies the blue ball into three affected structural layers, then replays for one-piece flow', () => {
		expect(blueBallAt(verticalFlightAt())!.at).toEqual({ x: 820, y: 490 });
		const flying = blueBallAt(verticalFlightAt() + 0.4)!;
		expect(flying.at.x).toBeLessThan(820);
		expect(flying.at.y).toBeLessThan(490);
		expect(blueBallAt(verticalImpactAt())).toBeUndefined();
		expect(productAt(verticalImpactAt() + 0.4).paint!.color).toBe('#334c9b');
		expect(verticalFlashAt(verticalImpactAt() + 0.4)).toBeGreaterThan(0.3);
		expect(new Set([...blueStory.changed, blueStory.reorganized].map((spot) => spot.row))).toEqual(new Set([0, 3, 2]));
		const flash = frame(verticalImpactAt() + 0.4);
		expect(flash).toContain('data-testid="vertical-layer-flash"');
		expect(blueBallAt(flowFlightAt())!.at).toEqual({ x: 820, y: 490 });
		expect(blueBallAt(flowImpactAt())).toBeUndefined();
		expect(productAt(flowImpactAt() + 0.2).paint!.radius).toBeGreaterThan(1.25);
	});

	it('carries exactly the same blue mess through smaller scales and the last-commit section', () => {
		const held = productAt(flowImpactAt() + 0.8);
		expect(held.complete).toBe(false);
		expect(held.paint!.color).toBe('#334c9b');
		['fractal', 'commit'].forEach((id) => {
			const seconds = sceneById(id as 'fractal' | 'commit').start + 1;
			expect(productAt(seconds)).toEqual(held);
			expect(frame(seconds)).toContain('data-testid="splat"');
			expect(frame(seconds)).toContain('data-coherent="false"');
		});
		expect(productAt(assimilationAt() - 0.01)).toEqual(held);
	});

	it('absorbs that blue splash into a coherent product while glowing the entire boundary', () => {
		expect(wholeProductGlowAt(spokenCue('health', 0, 'whole') + 0.6)).toBeGreaterThan(0.5);
		expect(frame(assimilationAt() + 0.5)).toContain('data-testid="whole-product-glow"');
		const midway = productAt(assimilationAt() + 1);
		expect(midway.paint!.radius).toBeLessThan(productAt(assimilationAt()).paint!.radius);
		const coherent = productAt(blueCoherentAt());
		expect(coherent.complete).toBe(true);
		expect(coherent.paint).toBeUndefined();
		expect(coherent.cells.every((cell) => cell.dx === 0 && cell.dy === 0 && cell.rot === 0 && !cell.smear)).toBe(true);
		blueStory.changed.forEach((spot) => expect(coherent.cells.find((cell) => cell.col === spot.col && cell.row === spot.row)?.color).toBe('#334c9b'));
		expect(blueCoherentAt()).toBeLessThan(spokenCue('health', 1));
	});

	it('uses the exact ending composition as the cover, then reveals the hook before narration starts', () => {
		expect(frame(0)).toBe(frame(finalFrameSeconds));
		expect(frame(filmScript.coverDuration)).toContain('Split the wish.');
		expect(frame(filmScript.coverDuration)).not.toContain('data-coherent="true"');
		expect(spokenCue('hook', 0)).toBeGreaterThan(filmScript.coverDuration);
	});

	it('ends with the useful product and freedom to choose, with the narrator disclosed', () => {
		const ended = frame(finalFrameSeconds);
		expect(ended).toContain('Choose again.');
		expect(ended).toContain('An idea by Terry Yin');
		expect(ended).toContain('CEDAR');
		expect(ended).toContain('AI-GENERATED NARRATION');
		expect(ended).toContain('data-coherent="true"');
	});
});
