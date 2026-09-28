import { render } from '@testing-library/react';
import { beatRange, beats, captionAt, filmDurationInFrames, FPS, poseAt } from '@/storyImpact/film';
import { flightPoint, wallPoint } from '@/storyImpact/layout';
import { IMPACT, productOverTime, storyIsFuzzy, storySplashes, storyWishes } from '@/storyImpact/scene';
import { StoryImpactScene } from '@/storyImpact/StoryImpactScene';

const framesOf = (name: string) => {
	const { from, durationInFrames } = beatRange(name);
	return Array.from({ length: durationInFrames }, (_, i) => from + i);
};
const firstFrame = (name: string) => beatRange(name).from;
const lastFrame = (name: string) => {
	const { from, durationInFrames } = beatRange(name);
	return from + durationInFrames - 1;
};

describe('StoryImpactOneSplash', () => {
	test('the timeline is the sum of its beats', () => {
		expect(filmDurationInFrames).toBe(beats.reduce((sum, b) => sum + Math.round(b.seconds * FPS), 0));
		expect(beats.map((b) => b.name).slice(0, 5)).toEqual(['backlog', 'wish', 'fuzzy', 'flight', 'splat']);
	});

	describe('the wish takes off and splashes onto the product', () => {
		test('opens on the tidy product with the whole backlog', () => {
			const pose = poseAt(0);
			expect(pose.cells).toEqual(productOverTime().cells);
			expect(pose.backlog.map((b) => b.id)).toEqual(productOverTime().backlog.map((b) => b.id));
			expect(pose.story).toBeUndefined();
		});

		test('the front ball hops in the tray before it springs out', () => {
			const hops = framesOf('backlog').map((f) => poseAt(f).backlog[0].hop ?? 0);
			expect(Math.max(...hops)).toBeGreaterThan(20);
			expect(poseAt(firstFrame('backlog')).backlog[0].hop).toBeUndefined();
		});

		test('the wish beat ends on the wish board', () => {
			expect(poseAt(lastFrame('wish'))).toEqual(storyWishes());
		});

		test('the ball springs up past its hover spot and the bubble pops in', () => {
			const frames = framesOf('wish').map(poseAt);
			const ys = frames.map((p) => p.story!.at?.y ?? Infinity);
			const hoverY = 318;
			expect(Math.min(...ys)).toBeLessThan(hoverY); // overshoot
			expect(frames[0].story!.bubble).toBe(0);
			expect(Math.max(...frames.map((p) => p.story!.bubble ?? 1))).toBeGreaterThan(1); // pop overshoot
		});

		test('the fuzzy beat ends on the fuzzy board, turning fuzzy on the way', () => {
			const fuzz = framesOf('fuzzy')
				.map(poseAt)
				.filter((p) => p.story!.state === 'fuzzy')
				.map((p) => p.story!.fuzz ?? 1);
			expect(fuzz[0]).toBeLessThan(0.5);
			expect(poseAt(lastFrame('fuzzy'))).toEqual(storyIsFuzzy());
		});

		test('the flight moves steadily from the tray to the product', () => {
			const flights = framesOf('flight')
				.map(poseAt)
				.filter((p) => p.story!.state === 'flying')
				.map((p) => p.story!.flight);
			flights.slice(1).forEach((f, i) => expect(f).toBeGreaterThanOrEqual(flights[i]));
			expect(flights[0]).toBeLessThan(0.05);
			expect(flights[flights.length - 1]).toBe(1);
			expect(flights.some((f) => f > 0.35 && f < 0.45)).toBe(true); // passes the flight board
			expect(flightPoint(1)).toEqual(wallPoint(IMPACT.col, IMPACT.row));
		});

		test('the ball squashes before launch and stretches in flight', () => {
			const poses = framesOf('flight').map(poseAt);
			expect(Math.max(...poses.map((p) => p.story!.squash ?? 1))).toBeGreaterThan(1.2);
			expect(Math.max(...poses.map((p) => p.story!.stretch?.along ?? 1))).toBeGreaterThan(1.2);
		});

		test('the splat grows with overshoot, drips, and ends on the splat board', () => {
			const splats = framesOf('splat').map((f) => poseAt(f).splat!);
			expect(splats[0].radius).toBeLessThan(0.5);
			expect(Math.max(...splats.map((s) => s.radius))).toBeGreaterThan(1);
			expect(splats[0].drip).toBe(0);
			expect(poseAt(lastFrame('splat'))).toEqual(storySplashes());
		});

		test('captions follow the storyboard in order, each for at least 2.5 s', () => {
			const runs: { caption: string; frames: number }[] = [];
			for (let f = 0; f < filmDurationInFrames; f++) {
				const caption = captionAt(f);
				const last = runs[runs.length - 1];
				if (last && last.caption === caption) last.frames++;
				else runs.push({ caption, frames: 1 });
			}
			expect(runs.map((r) => r.caption).slice(0, 4)).toEqual([
				'A story is romantic: a wish for a better world.',
				'It\'s fuzzy. It doesn\'t care about our boundaries.',
				'It carries an impact we want in the world…',
				'…and it makes an impact on the product: SPLAT!',
			]);
			runs.forEach((r) => expect(r.frames).toBeGreaterThanOrEqual(2.5 * FPS));
		});

		test('every frame of these beats renders', () => {
			for (let f = 0; f < lastFrame('splat'); f += 7) {
				const { unmount, getByTestId } = render(<StoryImpactScene pose={poseAt(f)} caption={captionAt(f)} />);
				expect(getByTestId('caption')).toHaveTextContent(captionAt(f));
				unmount();
			}
		});
	});
});
