import { render } from '@testing-library/react';
import { beats as oneStoryBeats, beatRange as oneStoryRange, FPS, poseAt as oneStoryPoseAt } from '@/storyImpact/film';
import { fullFilm } from '@/storyImpact/fullFilm';
import { ballColors, CellPose, plainCellColor, productOverTime, productSpace } from '@/storyImpact/scene';
import { laterStoryBeatList } from '@/storyImpact/laterStories';
import { historySpot } from '@/storyImpact/layout';
import { boards } from '@/storyImpact/boards';
import { StoryImpactScene } from '@/storyImpact/StoryImpactScene';

const { beatRange, captionAt, durationInFrames, poseAt } = fullFilm;

const framesOf = (name: string) => {
	const { from, durationInFrames: frames } = beatRange(name);
	return Array.from({ length: frames }, (_, i) => from + i);
};
const lastFrame = (name: string) => {
	const { from, durationInFrames: frames } = beatRange(name);
	return from + frames - 1;
};

const renderFrame = (f: number) => render(<StoryImpactScene pose={poseAt(f)} caption={captionAt(f)} />);

describe('StoryImpactFilm', () => {
	test('opens with the title, the product space and Time, then the one-story beats, then more stories, then the ending', () => {
		const later = ['launch', 'flight', 'splat', 'wobble', 'assimilate', 'coherent', 'history'];
		expect(fullFilm.beats.map((b) => b.name)).toEqual([
			'title',
			'space',
			'time',
			...oneStoryBeats.map((b) => b.name),
			...later.map((b) => `sun-${b}`),
			...later.map((b) => `grape-${b}`),
			'story-outline',
			'feature-outline',
			'closing',
		]);
	});

	describe('the title', () => {
		test('shows the title on the empty paper, with no caption', () => {
			const mid = framesOf('title')[Math.round(2 * FPS)];
			const pose = poseAt(mid);
			expect(pose.cells).toEqual([]);
			expect(captionAt(mid)).toBe('');
			const { getByTestId, queryByTestId, queryAllByTestId } = renderFrame(mid);
			expect(getByTestId('title')).toHaveTextContent('Romantic stories,');
			expect(getByTestId('title')).toHaveTextContent('disciplined products');
			expect(queryByTestId('caption')).toBeNull();
			expect(queryByTestId('product-grid')).toBeNull();
			expect(queryByTestId('behavior-axis')).toBeNull();
			expect(queryAllByTestId('product-cell')).toHaveLength(0);
		});

		test('the title has shrunk away by the end of its beat', () => {
			expect(poseAt(lastFrame('title')).title!.leave).toBe(1);
			expect(renderFrame(lastFrame('title')).queryByTestId('title')).toBeNull();
		});
	});

	describe('the product space is built', () => {
		test('the axes grow from the origin over the space beat', () => {
			const growth = framesOf('space').map((f) => poseAt(f).axes ?? 1);
			expect(growth[0]).toBe(0);
			growth.slice(1).forEach((g, i) => expect(g).toBeGreaterThanOrEqual(growth[i]));
			expect(growth.some((g) => g > 0.2 && g < 0.8)).toBe(true);
		});

		test('the cells pop in one after another', () => {
			const shown = framesOf('space').map((f) => poseAt(f).cells.filter((c) => (c.pop ?? 1) > 0).length);
			expect(shown[0]).toBe(0);
			expect(shown.some((n) => n > 0 && n < 20)).toBe(true);
			expect(shown[shown.length - 1]).toBe(20);
		});

		test('ends on the first board', () => {
			expect(poseAt(lastFrame('space'))).toEqual(productSpace());
		});
	});

	describe('Time and the backlog arrive', () => {
		test('the Time arrow grows and the balls drop into the tray', () => {
			const frames = framesOf('time');
			const first = poseAt(frames[0]);
			expect(first.showTime).toBe(true);
			expect(first.timeGrow).toBe(0);
			expect(first.trayIn).toBe(0);
			const heights = frames.map((f) => poseAt(f).backlog.map((b) => b.hop ?? 0));
			first.backlog.forEach((_, i) => {
				expect(Math.max(...heights.map((h) => h[i]))).toBeGreaterThan(300);
			});
		});

		test('ends on the second board', () => {
			expect(poseAt(lastFrame('time'))).toEqual(productOverTime());
		});
	});

	test('the pink story plays exactly as in the one-story film', () => {
		for (const b of oneStoryBeats) {
			const full = beatRange(b.name);
			const one = oneStoryRange(b.name);
			expect(full.durationInFrames).toBe(one.durationInFrames);
			const n = one.durationInFrames;
			for (const i of [0, 1, Math.floor(n / 3), Math.floor(n / 2), Math.floor((2 * n) / 3), n - 2, n - 1]) {
				expect(poseAt(full.from + i)).toEqual(oneStoryPoseAt(one.from + i));
			}
		}
	});

	test('captions show in beat order, each for at least 2.5 s, ending on the closing line, in 75–90 s', () => {
		const runs: { caption: string; frames: number }[] = [];
		for (let f = 0; f < durationInFrames; f++) {
			const caption = captionAt(f);
			const last = runs[runs.length - 1];
			if (last && last.caption === caption) last.frames++;
			else runs.push({ caption, frames: 1 });
		}
		expect(runs.map((r) => r.caption)).toEqual([
			'',
			...boards.map((b) => b.caption),
			'More stories come and go…',
			'…and the product stays coherent. No scars.',
			'Each one changes the product a little.',
			'Spent stories pile up in History, out of the way.',
			'One story touches many features…',
			'…and one feature carries many stories.',
			'Stories should be romantic. Products should not.',
		]);
		runs.slice(1).forEach((r) => expect(r.frames).toBeGreaterThanOrEqual(2.5 * FPS));
		expect(durationInFrames).toBeGreaterThanOrEqual(75 * FPS);
		expect(durationInFrames).toBeLessThanOrEqual(90 * FPS);
	});

	test('every frame of the opening renders', () => {
		for (let f = 0; f < beatRange('backlog').from; f += 4) {
			const { unmount, queryByTestId } = renderFrame(f);
			if (captionAt(f) === '') expect(queryByTestId('caption')).toBeNull();
			else expect(queryByTestId('caption')).toHaveTextContent(captionAt(f));
			unmount();
		}
	});

	describe('more stories come and go while the product stays coherent', () => {
		const storyColored = (cells: CellPose[]) => cells.filter((c) => c.color !== plainCellColor(c) || c.split !== undefined).length;
		const ends = ['coherent', 'sun-coherent', 'grape-coherent'].map((name) => poseAt(lastFrame(name)));

		test('each story ends aligned, with no smear or splat, and more story-colored cells', () => {
			for (const pose of ends) {
				expect(pose.splat).toBeUndefined();
				pose.cells.forEach((c) => {
					expect([c.dx, c.dy, c.rot]).toEqual([0, 0, 0]);
					expect(c.smear).toBeUndefined();
				});
			}
			const counts = ends.map((pose) => storyColored(pose.cells));
			expect(counts[1]).toBeGreaterThan(counts[0]);
			expect(counts[2]).toBeGreaterThan(counts[1]);
		});

		test('a cell the pink story changed ends split between pink and sun', () => {
			const [pink, sun] = ends;
			const both = sun.cells.find((c) => c.color === ballColors.pink && c.split === ballColors.sun)!;
			expect(both).toBeDefined();
			const before = pink.cells.find((c) => c.col === both.col && c.row === both.row)!;
			expect([before.color, before.split]).toEqual([ballColors.pink, undefined]);
		});

		test('each story splats across rows and columns', () => {
			for (const name of ['sun-wobble', 'grape-wobble']) {
				const knocked = poseAt(lastFrame(name)).cells.filter((c) => c.smear);
				expect(new Set(knocked.map((c) => c.col)).size).toBeGreaterThanOrEqual(2);
				expect(new Set(knocked.map((c) => c.row)).size).toBeGreaterThanOrEqual(2);
			}
		});

		test('a new ball drops into the back of the tray as each story leaves it', () => {
			for (const story of ['sun', 'grape']) {
				const frames = framesOf(`${story}-launch`);
				const backs = frames.map((f) => poseAt(f).backlog).filter((b) => b.length === 3 && b[0].id !== story);
				expect(Math.max(...backs.map((b) => b[2].hop ?? 0))).toBeGreaterThan(300);
				const end = poseAt(frames[frames.length - 1]).backlog;
				expect(end).toHaveLength(3);
				expect(end[2].hop).toBeUndefined();
			}
		});

		test('at the end, History holds pink, sun and grape in spent order, none of them waiting', () => {
			const last = poseAt(durationInFrames - 1);
			expect(last.history!.map((b) => b.id)).toEqual(['pink', 'sun', 'grape']);
			expect(last.backlog).toHaveLength(3);
			last.backlog.forEach((b) => expect(['pink', 'sun', 'grape']).not.toContain(b.id));
		});

		test('earlier History balls shuffle aside smoothly to make room', () => {
			for (const name of ['sun-history', 'grape-history']) {
				const xs = framesOf(name).map((f) => {
					const { history, historyRoom } = poseAt(f);
					return historySpot(historyRoom ?? history!.length, 0, history![0].size).x;
				});
				expect(xs[xs.length - 1]).toBeLessThan(xs[0]);
				xs.slice(1).forEach((x, i) => expect(Math.abs(x - xs[i])).toBeLessThan(8));
			}
		});

		test('every frame of the later stories renders', () => {
			const from = beatRange(laterStoryBeatList[0].name).from;
			for (let f = from; f < beatRange('story-outline').from; f += 5) {
				const { unmount, getByTestId } = renderFrame(f);
				expect(getByTestId('caption')).toHaveTextContent(captionAt(f));
				unmount();
			}
		});
	});
});
