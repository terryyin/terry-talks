import { render } from '@testing-library/react';
import { PAUSE_SECONDS, readingSeconds } from '@/storyImpact/readingPace';
import { beats as oneStoryBeats, beatRange as oneStoryRange, FPS, poseAt as oneStoryPoseAt } from '@/storyImpact/film';
import { fullFilm } from '@/storyImpact/fullFilm';
import { ballColors, CellPose, extentOf, plainCellColor, productOverTime, productSpace, wallExtentOf } from '@/storyImpact/scene';
import { laterStoryBeatList } from '@/storyImpact/laterStories';
import { historySpot, traySpot, trayBallCenter } from '@/storyImpact/layout';
import { boardNamed, boards } from '@/storyImpact/boards';
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
			'The idea fits the same domain…',
			'…so it comes cheap: the option pays off.',
			'Spent stories pile up in History, out of the way.',
			'One story touches many features…',
			'…and one feature carries many stories.',
			'Neither is better. They do different jobs.',
			'',
		]);
		runs.forEach((r) => expect({ caption: r.caption, enough: r.frames >= readingSeconds(r.caption) * FPS }).toEqual({ caption: r.caption, enough: true }));
		expect(durationInFrames).toBeGreaterThanOrEqual(120 * FPS);
		expect(durationInFrames).toBeLessThanOrEqual(150 * FPS);
	});

	test('the film breathes: the caption line is empty for 1 s at six places while the picture moves', () => {
		const runs = captionRuns();
		const breaths = runs.flatMap((r, i) => (r.caption === '' && i > 0 && i < runs.length - 1 ? [{ before: runs[i + 1].caption, frames: r.frames }] : []));
		expect(breaths.map((b) => b.before)).toEqual([
			'Behavior gets messy. Structure wobbles.',
			"A story's goal is an impact, with two values.",
			'Option value, unseen by users: judgment spent on tests…',
			'More stories come and go…',
			'One story touches many features…',
			'Neither is better. They do different jobs.',
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

	describe("a customer feels the pink story's impact and gets a new idea", () => {
		const customers = framesOf('customer').map((f) => poseAt(f).customer);

		test('a customer appears in front of the coherent product, nods, and a light bulb pops', () => {
			const shown = customers.filter((c) => c !== undefined);
			expect(customers[0]).toBeUndefined();
			expect(Math.max(...shown.map((c) => c!.nod ?? 0))).toBeGreaterThan(0.9);
			expect(customers[customers.length - 1]).toEqual({ bulb: 1, hearts: 1 });
			framesOf('customer').forEach((f) => expect(poseAt(f).cells).toEqual(poseAt(lastFrame('coherent')).cells));
			const { getByTestId, unmount } = renderFrame(lastFrame('customer'));
			expect(getByTestId('customer')).toContainElement(getByTestId('light-bulb'));
			unmount();
		});

		test('the idea joins the backlog second and the two balls behind it swap', () => {
			const ids = (f: number) => poseAt(f).backlog.map((b) => b.id);
			expect(ids(lastFrame('coherent'))).toEqual(['sun', 'grape', 'lime']);
			expect(ids(lastFrame('new-idea'))).toEqual(['sun', 'idea', 'lime', 'grape']);
			expect(poseAt(lastFrame('new-idea')).customer).toBeUndefined();
		});

		test('every ball moves into its new place smoothly, the idea flying in from the bulb', () => {
			const frames = [lastFrame('customer'), ...framesOf('new-idea')];
			const centers = frames.map((f) => {
				const { backlog } = poseAt(f);
				return new Map(
					backlog
						.filter((b) => (b.scale ?? 1) > 0)
						.map((b, _, all) => [b.id, trayBallCenter(b, traySpot(backlog.length, backlog.indexOf(b), b.size))] as const),
				);
			});
			centers.slice(1).forEach((now, i) =>
				now.forEach((at, id) => {
					const was = centers[i].get(id);
					if (was) expect({ id, step: Math.hypot(at.x - was.x, at.y - was.y) < 50 }).toEqual({ id, step: true });
				}),
			);
			expect(framesOf('new-idea').some((f) => poseAt(f).backlog.some((b) => b.flying))).toBe(true);
		});
	});

	describe('the product changes shape, tidily', () => {
		const sizeAt = (f: number) => extentOf(poseAt(f).cells);

		test('4×4 at first, then 5×4, 5×3 and 6×3 after the pink, sun and idea stories', () => {
			expect(sizeAt(lastFrame('space'))).toEqual({ columns: 4, rows: 4 });
			expect(sizeAt(lastFrame('coherent'))).toEqual({ columns: 5, rows: 4 });
			expect(sizeAt(lastFrame('sun-coherent'))).toEqual({ columns: 5, rows: 3 });
			expect(sizeAt(lastFrame('idea-coherent'))).toEqual({ columns: 6, rows: 3 });
			expect(sizeAt(durationInFrames - 1)).toEqual({ columns: 6, rows: 3 });
		});

		test('the wall eases to each new size, and no cell is ever drawn off it', () => {
			const walls = Array.from({ length: beatRange('finale').from }, (_, f) => poseAt(f))
				.filter((p) => p.cells.length > 0)
				.map((p) => ({ p, wall: wallExtentOf(p) }));
			walls.slice(1).forEach(({ wall }, i) => {
				const was = walls[i].wall;
				expect(Math.abs(wall.columns - was.columns)).toBeLessThanOrEqual(0.1);
				expect(Math.abs(wall.rows - was.rows)).toBeLessThanOrEqual(0.1);
			});
			walls.forEach(({ p, wall }) =>
				p.cells
					.filter((c) => (c.pop ?? 1) > 0)
					.forEach((c) => expect({ c, inside: c.col + 1 <= wall.columns + 1e-9 && c.row + 1 <= wall.rows + 1e-9 }).toEqual({ c, inside: true })),
			);
		});

		test('only one size changes at a time, once per story', () => {
			const changes = ['assimilate', 'sun-assimilate', 'idea-assimilate'].map((name) => {
				const sizes = framesOf(name).map((f) => wallExtentOf(poseAt(f)));
				return {
					columns: sizes.some((s) => s.columns !== sizes[0].columns),
					rows: sizes.some((s) => s.rows !== sizes[0].rows),
				};
			});
			expect(changes).toEqual([
				{ columns: true, rows: false },
				{ columns: false, rows: true },
				{ columns: true, rows: false },
			]);
		});
	});

	describe('more stories come and go while the product stays coherent', () => {
		const storyColored = (cells: CellPose[]) => cells.filter((c) => c.color !== plainCellColor(c) || c.split !== undefined).length;
		const ends = ['coherent', 'sun-coherent', 'idea-coherent'].map((name) => poseAt(lastFrame(name)));

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

		test('each story splats across cells', () => {
			const knocked = poseAt(lastFrame('sun-wobble')).cells.filter((c) => c.smear);
			expect(new Set(knocked.map((c) => c.col)).size).toBeGreaterThanOrEqual(2);
			expect(new Set(knocked.map((c) => c.row)).size).toBeGreaterThanOrEqual(2);
			expect(poseAt(lastFrame('idea-wobble')).cells.filter((c) => c.smear).length).toBeGreaterThanOrEqual(2);
		});

		test("the customer's idea exercises the option: a smaller splash, fewer knocked cells, less work", () => {
			const moved = (name: string) => poseAt(lastFrame(name)).cells.filter((c) => c.dx !== 0 || c.dy !== 0 || c.rot !== 0).length;
			expect(moved('idea-wobble')).toBeLessThan(moved('sun-wobble'));
			expect(poseAt(lastFrame('idea-splat')).splat!.radius).toBeLessThan(poseAt(lastFrame('sun-splat')).splat!.radius);
			const work = (story: string) => ['wobble', 'assimilate', 'coherent'].reduce((n, part) => n + beatRange(`${story}-${part}`).durationInFrames, 0);
			expect(work('idea')).toBeLessThan(work('sun') * 0.8);
			const option = (f: number) => poseAt(f).values?.option ?? 0;
			[...framesOf('idea-flight'), ...framesOf('idea-assimilate'), ...framesOf('idea-coherent')].forEach((f) => expect(option(f)).toBe(1));
			expect(poseAt(lastFrame('idea-coherent')).values).toMatchObject({ customer: 0, option: 1, glint: 1 });
			[...framesOf('sun-launch'), ...framesOf('sun-coherent')].forEach((f) => expect(poseAt(f).values).toBeUndefined());
			expect(poseAt(lastFrame('idea-history')).values).toBeUndefined();
			framesOf('idea-wobble').forEach((f) => expect(captionAt(f)).toBe('…so it comes cheap: the option pays off.'));
		});

		test('a new ball drops into the back of the tray as the idea leaves it', () => {
			for (const story of ['idea']) {
				const frames = framesOf(`${story}-launch`);
				const backs = frames.map((f) => poseAt(f).backlog).filter((b) => b.length === 3 && b[0].id !== story);
				expect(Math.max(...backs.map((b) => b[2].hop ?? 0))).toBeGreaterThan(300);
				const end = poseAt(frames[frames.length - 1]).backlog;
				expect(end).toHaveLength(3);
				expect(end[2].hop).toBeUndefined();
			}
		});

		test("at the end, History holds pink, sun and the customer's idea in spent order, none of them waiting", () => {
			const last = poseAt(durationInFrames - 1);
			expect(last.history!.map((b) => b.id)).toEqual(['pink', 'sun', 'idea']);
			expect(last.backlog).toHaveLength(3);
			last.backlog.forEach((b) => expect(['pink', 'sun', 'idea']).not.toContain(b.id));
		});

		test('earlier History balls shuffle aside smoothly to make room', () => {
			for (const name of ['sun-history', 'idea-history']) {
				const xs = framesOf(name).map((f) => {
					const { history, historyRoom } = poseAt(f);
					return historySpot(historyRoom ?? history!.length, 0, history![0].size).x;
				});
				expect(xs[xs.length - 1]).toBeLessThan(xs[0]);
				xs.slice(1).forEach((x, i) => expect(Math.abs(x - xs[i])).toBeLessThan(8));
			}
		});

		test('the later stories carry no focus labels', () => {
			for (const f of framesOf('sun-launch').concat(framesOf('idea-assimilate'))) {
				expect(poseAt(f).tag).toBeUndefined();
				expect(poseAt(f).outlines).toBeUndefined();
			}
		});

		test('every frame of the later stories renders', () => {
			const from = beatRange(laterStoryBeatList[0].name).from;
			for (let f = from; f < beatRange('story-outline').from; f += 5) {
				const { unmount, queryByTestId } = renderFrame(f);
				if (captionAt(f) === '') expect(queryByTestId('caption')).toBeNull();
				else expect(queryByTestId('caption')).toHaveTextContent(captionAt(f));
				unmount();
			}
		});
	});
});
