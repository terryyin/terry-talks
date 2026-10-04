import { PAUSE_SECONDS, readingSeconds } from '@/storyImpact/readingPace';
import { beats as oneStoryBeats, beatRange as oneStoryRange, FPS, poseAt as oneStoryPoseAt } from '@/storyImpact/film';
import { fullFilm } from '@/storyImpact/fullFilm';
import { productOverTime, productSpace } from '@/storyImpact/scene';
import { boardNamed, boards } from '@/storyImpact/boards';
import { framesOf, lastFrame, renderFrame } from './filmFrames';

const { beatRange, captionAt, durationInFrames, poseAt } = fullFilm;

describe('StoryImpactFilm', () => {
	test('opens with the title, the product space and Time, then the one-story beats, then more stories, then the ending', () => {
		const later = ['launch', 'flight', 'splat', 'wobble', 'assimilate', 'coherent', 'history'];
		expect(fullFilm.beats.map((b) => b.name)).toEqual([
			'title',
			'space',
			'time',
			...oneStoryBeats.map((b) => b.name),
			...later.map((b) => `sun-${b}`),
			...later.map((b) => `idea-${b}`),
			'story-outline',
			'feature-outline',
			'closing',
			'finale',
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
			const all = productSpace().cells.length;
			expect(shown.some((n) => n > 0 && n < all)).toBe(true);
			expect(shown[shown.length - 1]).toBe(all);
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

	test('the pink story plays as in the one-story film, with a faster next-story transition', () => {
		for (const b of oneStoryBeats) {
			const full = beatRange(b.name);
			const one = oneStoryRange(b.name);
			if (b.name === 'next') expect(full.durationInFrames).toBeLessThan(one.durationInFrames);
			else expect(full.durationInFrames).toBe(one.durationInFrames);
			const n = one.durationInFrames;
			for (const i of [0, 1, Math.floor(n / 3), Math.floor(n / 2), Math.floor((2 * n) / 3), n - 2, n - 1]) {
				if (b.name === 'next') {
					const progress = i / (n - 1);
					expect(fullFilm.beats.find((beat) => beat.name === b.name)!.pose(progress)).toEqual(b.pose(progress));
				} else expect(poseAt(full.from + i)).toEqual(oneStoryPoseAt(one.from + i));
			}
		}
	});

	test('the next-story transition and sun story reach the new idea within 14 seconds', () => {
		expect(beatRange('idea-launch').from - beatRange('next').from).toBeLessThanOrEqual(14 * FPS);
		expect(captionAt(beatRange('sun-launch').from)).toBe('More stories come and go…');
		expect(captionAt(beatRange('idea-launch').from)).toBe('If a new idea fits the same domain…');
		expect(poseAt(lastFrame('next'))).toEqual(oneStoryPoseAt(oneStoryRange('next').from + oneStoryRange('next').durationInFrames - 1));
		expect(poseAt(lastFrame('sun-history')).history!.map((ball) => ball.id)).toEqual(['pink', 'sun']);
	});

	// The film's caption line, run by run.
	const captionRuns = () => {
		const runs: { caption: string; frames: number }[] = [];
		for (let f = 0; f < durationInFrames; f++) {
			const caption = captionAt(f);
			const last = runs[runs.length - 1];
			if (last && last.caption === caption) last.frames++;
			else runs.push({ caption, frames: 1 });
		}
		return runs;
	};

	test('captions show in beat order, each for at least its reading time, ending on the end card, in 2–2.5 minutes', () => {
		const runs = captionRuns();
		expect(runs.map((r) => r.caption).filter((c, i, all) => c !== '' || i === 0 || i === all.length - 1)).toEqual([
			'',
			...boards.map((b) => b.caption),
			'More stories come and go…',
			'…and the product stays coherent. No scars.',
			'If a new idea fits the same domain…',
			'…so it comes cheap: the option pays off.',
			'The product shows what is, not what was.',
			'One story touches many features…',
			'…and one feature takes many layers working together.',
			'Story after story, value builds up. Not debt.',
			'',
		]);
		runs.forEach((r) => expect({ caption: r.caption, enough: r.frames >= readingSeconds(r.caption) * FPS }).toEqual({ caption: r.caption, enough: true }));
		expect(durationInFrames).toBeGreaterThanOrEqual(120 * FPS);
		expect(durationInFrames).toBeLessThanOrEqual(150 * FPS);
	});

	test('the film breathes: the caption line is empty for 1 s at five places while the picture moves', () => {
		const runs = captionRuns();
		const breaths = runs.flatMap((r, i) => (r.caption === '' && i > 0 && i < runs.length - 1 ? [{ before: runs[i + 1].caption, frames: r.frames }] : []));
		expect(breaths.map((b) => b.before)).toEqual([
			'Behavior gets messy. Structure wobbles.',
			"A story's goal is an impact, with two values.",
			'Option value, unseen by users: judgment spent on tests…',
			'One story touches many features…',
			'Story after story, value builds up. Not debt.',
		]);
		breaths.forEach((b) => expect(b.frames).toBe(PAUSE_SECONDS * FPS));
	});

	test('example 3: a breath after the SPLAT while the cells start to wobble, then the wobble ends on its board', () => {
		const wobble = framesOf('wobble');
		const breath = wobble.slice(0, PAUSE_SECONDS * FPS);
		expect(captionAt(breath[0] - 1)).toBe('…and it makes an impact on the product: SPLAT!');
		breath.forEach((f) => expect(captionAt(f)).toBe(''));
		expect(poseAt(breath[breath.length - 1])).not.toEqual(poseAt(breath[0]));
		const caption = 'Behavior gets messy. Structure wobbles.';
		expect(wobble.slice(PAUSE_SECONDS * FPS).length).toBeGreaterThanOrEqual(readingSeconds(caption) * FPS);
		expect(poseAt(lastFrame('wobble'))).toEqual(boardNamed('wobble').pose);
	});

	test('every frame of the opening renders', () => {
		for (let f = 0; f < beatRange('backlog').from; f += 4) {
			const { unmount, queryByTestId } = renderFrame(f);
			if (captionAt(f) === '') expect(queryByTestId('caption')).toBeNull();
			else expect(queryByTestId('caption')).toHaveTextContent(captionAt(f));
			unmount();
		}
	});

});
