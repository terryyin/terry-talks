import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProblemDecompositionScene } from '../../src/problemDecomposition/Scene';
import { filmScript } from '../../src/problemDecomposition/film';
import { chapterOf, coherentAt, customerSplitAt, deliveryAt, feedbackCue, firstStory, flightStart, futureSpot, impactAt, sceneById, spokenCue, structuralSplitAt } from '../../src/problemDecomposition/series';

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

	it('animates a wish into angular solution pieces and separately into smaller round customer outcomes', () => {
		const partsCue = spokenCue('parts', 0, 'solution');
		expect(structuralSplitAt(partsCue)).toBe(0);
		expect(structuralSplitAt(partsCue + 1)).toBe(1);
		const solution = frame(partsCue + 1.1);
		['Database', 'API', 'Screen'].forEach((label) => expect(solution).toContain(label));
		expect(solution).not.toContain('data-testid="customer-outcome"');
		const splitCue = spokenCue('problem', 0, 'splits');
		expect(customerSplitAt(splitCue)).toBe(0);
		expect(customerSplitAt(splitCue + 1.4)).toBe(1);
		const customers = frame(splitCue + 1.4);
		expect(customers.match(/data-testid="customer-outcome"/g)).toHaveLength(3);
		['Split equally', 'Unequal shares', 'Track payments'].forEach((label) => expect(customers).toContain(`data-outcome="${label}"`));
		expect(customers).toContain('cx="650" cy="440" r="58"');
		expect(customers).toContain('cx="960" cy="440" r="58"');
	});

	it('flies one wish across the wall, splashes several structural rows, then assimilates before feedback', () => {
		expect(deliveryAt(flightStart()).ball).toEqual({ x: 650, y: 440 });
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
			// Radius 58 + two label lines: bounds from -58 to +126; names fit 140 px.
			expect(Math.abs(first.x - second.x) >= 140 || Math.abs(first.y - second.y) >= 184).toBe(true);
		}
		const stopped = frame(sceneById('stop').start + 4);
		expect(stopped).toContain('data-testid="time-paused"');
		expect(stopped).toContain('data-coherent="true"');
		expect(stopped).toContain('three friends each owe thirty dollars');
		expect(stopped.match(/data-started="false"/g)).toHaveLength(2);
		expect(stopped).not.toContain('data-testid="splat"');
	});

	it('ends with the useful product and freedom to choose, with the narrator disclosed', () => {
		const ended = frame(filmScript.duration - 1);
		expect(ended).toContain('Choose again.');
		expect(ended).toContain('An idea by Terry Yin');
		expect(ended).toContain('CEDAR');
		expect(ended).toContain('AI-GENERATED NARRATION');
		expect(ended).toContain('data-coherent="true"');
	});
});
