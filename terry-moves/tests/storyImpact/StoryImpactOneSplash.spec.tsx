import { render } from '@testing-library/react';
import { beatRange, beats, captionAt, filmDurationInFrames, FPS, poseAt } from '@/storyImpact/film';
import { flightPoint, wallPoint } from '@/storyImpact/layout';
import { exampleBall, IMPACT, messyProduct, plainCellColor, Pose, productOverTime, storySplashes, wallExtentOf } from '@/storyImpact/scene';
import { coherentProduct, readyForNext, storyInHistory } from '@/storyImpact/assimilation';
import { boardNamed, boards } from '@/storyImpact/boards';
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
		expect(beats.map((b) => b.name)).toEqual([
			'backlog',
			'wish',
			'focus',
			'fuzzy',
			'flight',
			'splat',
			'wobble',
			'assimilate',
			'coherent',
			'impact',
			'customer',
			'new-idea',
			'tests',
			'domain',
			'history',
			'next',
		]);
	});

	test('the whole film lasts between 30 and 60 seconds', () => {
		expect(filmDurationInFrames).toBeGreaterThanOrEqual(30 * FPS);
		expect(filmDurationInFrames).toBeLessThanOrEqual(60 * FPS);
	});

	test('every storyboard caption from the wish on shows in beat order, each for at least 2.5 s', () => {
		const runs: { caption: string; frames: number }[] = [];
		for (let f = 0; f < filmDurationInFrames; f++) {
			const caption = captionAt(f);
			const last = runs[runs.length - 1];
			if (last && last.caption === caption) last.frames++;
			else runs.push({ caption, frames: 1 });
		}
		expect(runs.map((r) => r.caption)).toEqual(boards.slice(2).map((b) => b.caption));
		runs.forEach((r) => expect(r.frames).toBeGreaterThanOrEqual(2.5 * FPS));
	});

	test('every frame of the film renders', () => {
		for (let f = 0; f < filmDurationInFrames; f += 5) {
			const { unmount, getByTestId } = render(<StoryImpactScene pose={poseAt(f)} caption={captionAt(f)} />);
			expect(getByTestId('caption')).toHaveTextContent(captionAt(f));
			unmount();
		}
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
			expect(poseAt(lastFrame('wish'))).toEqual(boardNamed('wish').pose);
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
			expect(poseAt(lastFrame('fuzzy'))).toEqual(boardNamed('fuzzy').pose);
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

	});

	describe('the product wobbles and then assimilates the splash', () => {
		const displacement = (pose: Pose) => pose.cells.reduce((sum, c) => sum + Math.abs(c.dx) + Math.abs(c.dy), 0);
		const changedIndexes = coherentProduct()
			.cells.map((c, i) => (c.color !== plainCellColor(c) ? i : -1))
			.filter((i) => i >= 0);

		test('the wobble ends on the messy board', () => {
			expect(poseAt(lastFrame('wobble'))).toEqual(boardNamed('wobble').pose);
		});

		test('the cells jiggle past their messy offsets before they settle', () => {
			const messy = displacement(messyProduct());
			const wobble = framesOf('wobble').map((f) => displacement(poseAt(f)));
			expect(wobble[0]).toBeLessThan(messy * 0.2);
			expect(Math.max(...wobble)).toBeGreaterThan(messy * 1.1);
		});

		test('the paint seeps in from on top of the cells', () => {
			const covers = framesOf('wobble').map((f) => poseAt(f).splat!.cover ?? 0);
			expect(covers[0]).toBe(1);
			expect(covers[covers.length - 1]).toBe(0);
		});

		test('the assimilate beat ends on the assimilating board', () => {
			expect(poseAt(lastFrame('assimilate'))).toEqual(boardNamed('assimilate').pose);
		});

		test('the coherent beat ends on the coherent board and holds still', () => {
			expect(poseAt(lastFrame('coherent'))).toEqual(coherentProduct());
			expect(poseAt(lastFrame('coherent') - 1.5 * FPS)).toEqual(coherentProduct());
		});

		test('cells slide home steadily, from messy to aligned', () => {
			const slides = [...framesOf('assimilate'), ...framesOf('coherent')].map((f) => displacement(poseAt(f)));
			slides.slice(1).forEach((d, i) => expect(d).toBeLessThanOrEqual(slides[i] + 1e-9));
			const messy = displacement(messyProduct());
			const mid = displacement(poseAt(firstFrame('assimilate') + beatRange('assimilate').durationInFrames / 2));
			expect(mid).toBeGreaterThan(0);
			expect(mid).toBeLessThan(messy);
			expect(slides[slides.length - 1]).toBe(0);
		});

		test('the paint drains into the changed cells, which fill with the story color only by the end', () => {
			expect(changedIndexes.length).toBeGreaterThanOrEqual(2);
			// How much of each changed cell shows the story color.
			const filled = (f: number) =>
				changedIndexes.map((i) => {
					const cell = poseAt(f).cells[i];
					return cell.color === exampleBall.color ? cell.filling ?? 1 : 0;
				});
			expect(filled(firstFrame('assimilate'))).toEqual(changedIndexes.map(() => 0));
			const midway = filled(firstFrame('assimilate') + Math.round(beatRange('assimilate').durationInFrames * 0.6));
			midway.forEach((k) => expect(k).toBeLessThan(1));
			expect(midway.some((k) => k > 0)).toBe(true);
			expect(filled(lastFrame('assimilate') - 10).some((k) => k < 1)).toBe(true);
			expect(filled(lastFrame('assimilate'))).toEqual(changedIndexes.map(() => 1));
			const radii = framesOf('assimilate').map((f) => poseAt(f).splat!.radius);
			expect(radii[radii.length - 1]).toBeLessThan(radii[0]);
		});

		test('the reorganized cell splits in from nothing', () => {
			const splitting = framesOf('assimilate').map((f) => {
				const cell = poseAt(f).cells.find((c) => c.col === IMPACT.col && c.row === IMPACT.row)!;
				return cell.split ? cell.splitting ?? 1 : 0;
			});
			expect(splitting[0]).toBe(0);
			expect(splitting.some((s) => s > 0 && s < 1)).toBe(true);
			expect(splitting[splitting.length - 1]).toBe(1);
		});

	});

	describe('the story is customer-value focused, the work whole-product focused', () => {
		const tagOf = (f: number) => poseAt(f).tag;
		const productOutline = (f: number) => poseAt(f).outlines?.find((o) => o.label === 'whole-product focused');

		test('the wish bubble shows alone, then the tag in a beat of its own, gone before the story turns fuzzy', () => {
			framesOf('wish').forEach((f) => expect(tagOf(f)).toBeUndefined());
			expect(tagOf(lastFrame('focus'))).toMatchObject({ text: 'customer-value focused', show: 1 });
			expect(poseAt(lastFrame('focus'))).toEqual(boardNamed('focus').pose);
			framesOf('focus').forEach((f) => expect(captionAt(f)).toBe("It's focused on customer value."));
			[...framesOf('focus'), ...framesOf('fuzzy')].forEach((f) => {
				const { story, tag } = poseAt(f);
				const bubbleShown = story!.state === 'wishing' && (story!.bubble ?? 1) > 0;
				expect({ f, both: bubbleShown && tag !== undefined }).toEqual({ f, both: false });
				if (story!.state === 'fuzzy') expect(tag).toBeUndefined();
			});
			expect(tagOf(lastFrame('flight'))).toBeUndefined();
			const { getByTestId, queryByTestId, unmount } = render(<StoryImpactScene pose={poseAt(lastFrame('focus'))} caption="" />);
			expect(getByTestId('story-tag')).toHaveTextContent('customer-value focused');
			expect(queryByTestId('wish-bubble')).toBeNull();
			unmount();
		});

		test('the whole product is outlined while it wobbles and is assimilated, and not once coherent', () => {
			for (const f of [lastFrame('wobble'), firstFrame('assimilate'), lastFrame('assimilate')]) {
				const outline = productOutline(f)!;
				expect(outline.together).toBe(true);
				expect(outline.wall).toEqual(wallExtentOf(poseAt(f)));
			}
			expect(productOutline(firstFrame('wobble'))).toBeUndefined();
			expect(productOutline(lastFrame('coherent'))).toBeUndefined();
		});
	});

	describe('assimilation is judgment-intensive, and the judgment is spent', () => {
		test('"whole-product focused" and "judgment-intensive" never show together', () => {
			const labelShown = (f: number) => {
				const outline = poseAt(f).outlines?.find((o) => o.label === 'whole-product focused');
				return outline !== undefined && (outline.labelShow ?? 1) > 0;
			};
			const judgmentShown = (f: number) => (poseAt(f).judgment?.show ?? 0) > 0;
			[...framesOf('wobble'), ...framesOf('assimilate'), ...framesOf('coherent')].forEach((f) =>
				expect({ f, both: labelShown(f) && judgmentShown(f) }).toEqual({ f, both: false }),
			);
			expect(labelShown(lastFrame('wobble'))).toBe(true);
			expect(judgmentShown(lastFrame('assimilate'))).toBe(true);
			const { queryByTestId, unmount } = render(<StoryImpactScene pose={poseAt(lastFrame('assimilate'))} caption="" />);
			expect(queryByTestId('outline-tag')).toBeNull();
			unmount();
		});


		test('the label and three "?" bubbles show while the splash is assimilated, and are gone once coherent', () => {
			expect(poseAt(firstFrame('assimilate')).judgment).toBeUndefined();
			expect(poseAt(lastFrame('assimilate')).judgment).toMatchObject({ show: 1 });
			expect(poseAt(lastFrame('coherent')).judgment).toBeUndefined();
			const { getByTestId, getAllByTestId, unmount } = render(<StoryImpactScene pose={poseAt(lastFrame('assimilate'))} caption="" />);
			expect(getByTestId('judgment')).toHaveTextContent('judgment-intensive');
			expect(getAllByTestId('judgment-bubble')).toHaveLength(3);
			unmount();
		});

		test('the test shields are captioned as spent judgment, bought as option value', () => {
			framesOf('tests').forEach((f) => expect(captionAt(f)).toBe('Option value, unseen by users: judgment spent on tests…'));
		});

		test('the spent story goes to History with no judgment label', () => {
			framesOf('history')
				.filter((f) => poseAt(f).spent)
				.forEach((f) => {
					expect(poseAt(f).judgment).toBeUndefined();
					expect(poseAt(f).tag).toBeUndefined();
				});
		});
	});

	describe("the story's impact delivers customer value and option value", () => {
		const valuesAt = (f: number) => poseAt(f).values;

		test('"impact!" bursts over the coherent product, and two value pills spring out of it', () => {
			framesOf('impact').forEach((f) => {
				expect(captionAt(f)).toBe("A story's goal is an impact, with two values.");
				expect(poseAt(f).cells).toEqual(coherentProduct().cells);
			});
			const bursts = framesOf('impact').map((f) => valuesAt(f)?.burst ?? 0);
			expect(Math.max(...bursts)).toBeGreaterThan(1); // pops with overshoot
			expect(valuesAt(lastFrame('impact'))).toEqual({ spring: 1, customer: 1, option: 1 });
			expect(poseAt(lastFrame('impact'))).toEqual(boardNamed('impact').pose);
			const { getByTestId, unmount } = render(<StoryImpactScene pose={poseAt(framesOf('impact')[45])} caption="" />);
			expect(getByTestId('impact-burst')).toHaveTextContent('impact!');
			unmount();
			const pills = render(<StoryImpactScene pose={poseAt(lastFrame('impact'))} caption="" />);
			expect(pills.getByTestId('customer-value')).toHaveTextContent('customer value');
			expect(pills.getByTestId('option-value')).toHaveTextContent('option value');
			expect(pills.queryByTestId('impact-burst')).toBeNull();
			pills.unmount();
		});

		test('customer value: the customer sees the outlined behavior the story touched, loves it, and gets an idea', () => {
			const frames = framesOf('customer');
			frames.forEach((f) => expect(poseAt(f).cells).toEqual(coherentProduct().cells));
			const end = poseAt(lastFrame('customer'));
			expect(end).toEqual(boardNamed('customer').pose);
			const bandCols = end.outlines!.map((o) => [...new Set(o.cells.map((c) => c.col))]);
			expect(bandCols).toEqual([[1, 2], [4]]);
			end.outlines!.forEach((o) => expect(o.together).toBe(true));
			expect(end.customer).toMatchObject({ bulb: 1, hearts: 1 });
			expect(end.values).toMatchObject({ customer: 1, option: 0.35 });
			const heartsAt = frames.findIndex((f) => (poseAt(f).customer?.hearts ?? 0) > 0);
			const bulbAt = frames.findIndex((f) => (poseAt(f).customer?.bulb ?? 0) > 0);
			const bandsDrawn = frames.findIndex((f) => poseAt(f).outlines?.[0].draw === 1);
			const customerAt = frames.findIndex((f) => poseAt(f).customer);
			expect(bandsDrawn).toBeLessThanOrEqual(customerAt); // the behavior is outlined before the customer looks
			expect(heartsAt).toBeLessThan(bulbAt);
		});

		test('no customer before the product is coherent, and none while option value is shown', () => {
			const withCustomer = Array.from({ length: filmDurationInFrames }, (_, f) => f).filter((f) => poseAt(f).customer);
			const allowed = new Set([...framesOf('customer'), ...framesOf('new-idea')]);
			withCustomer.forEach((f) => expect({ f, allowed: allowed.has(f) }).toEqual({ f, allowed: true }));
		});

		test('the idea joins the backlog second while the bands fade', () => {
			expect(poseAt(lastFrame('new-idea'))).toEqual(boardNamed('new-idea').pose);
			expect(poseAt(lastFrame('new-idea')).outlines).toBeUndefined();
			expect(poseAt(lastFrame('new-idea')).backlog.map((b) => b.id)).toEqual(['sun', 'idea', 'lime', 'grape']);
		});

		test('option value: the shields and domain links pop while the option pill is in focus', () => {
			expect(poseAt(lastFrame('tests'))).toEqual(boardNamed('tests').pose);
			expect(poseAt(lastFrame('domain'))).toEqual(boardNamed('domain').pose);
			[...framesOf('tests'), ...framesOf('domain')].forEach((f) => expect(poseAt(f).customer).toBeUndefined());
			expect(valuesAt(lastFrame('tests'))).toMatchObject({ customer: 0.35, option: 1 });
			framesOf('domain').forEach((f) => expect(captionAt(f)).toBe('…and on a structure that maps the domain.'));
			const shields = render(<StoryImpactScene pose={boardNamed('tests').pose} caption="" />);
			expect(shields.getAllByTestId('test-shield')).toHaveLength(5);
			expect(shields.queryAllByTestId('domain-chip')).toHaveLength(0);
			shields.unmount();
			const { getAllByTestId } = render(<StoryImpactScene pose={boardNamed('domain').pose} caption="" />);
			expect(getAllByTestId('test-shield')).toHaveLength(5);
			expect(getAllByTestId('domain-chip')).toHaveLength(4);
			expect(new Set(getAllByTestId('domain-link').map((l) => l.getAttribute('data-row')))).toEqual(new Set(['0', '1', '2', '3']));
		});

		test('the pills, shields and links fade as the spent story sets off', () => {
			const lifted = framesOf('history').filter((f) => poseAt(f).spent && (poseAt(f).spent!.peel ?? 1) > 0);
			lifted.forEach((f) => {
				expect(poseAt(f).values).toBeUndefined();
				expect(poseAt(f).protect).toBeUndefined();
			});
		});
	});

	describe('the spent story drifts into history and the next story steps up', () => {
		test('the history beat ends on the history board, the next beat on the last board', () => {
			expect(poseAt(lastFrame('history'))).toEqual(storyInHistory());
			expect(poseAt(lastFrame('next'))).toEqual(readyForNext());
		});

		test('the product keeps its changed cells while the spent story leaves', () => {
			[...framesOf('history'), ...framesOf('next')].forEach((f) => expect(poseAt(f).cells).toEqual(coherentProduct().cells));
		});

		test('the History box pops in and the pale skin peels off near the impact, then drifts to History', () => {
			const poses = framesOf('history').map(poseAt);
			expect(poses[0].historyReveal).toBe(0);
			expect(Math.max(...poses.map((p) => p.historyReveal ?? 1))).toBeGreaterThan(1); // pop overshoot
			const skins = poses.filter((p) => p.spent).map((p) => p.spent!);
			expect(skins[0].peel).toBe(0);
			const impact = wallPoint(IMPACT.col + 0.5, IMPACT.row + 0.5);
			expect(Math.hypot(skins[0].at.x - impact.x, skins[0].at.y - impact.y)).toBeLessThan(1);
			const lastSkin = skins[skins.length - 1];
			expect(lastSkin.at.x).toBeLessThan(250); // above the History box
			expect(lastSkin.at.y).toBeLessThan(200);
			// While it drifts, the story is not yet in History; afterwards it is.
			poses.filter((p) => p.spent).forEach((p) => expect(p.history).toEqual([]));
			expect(poses.filter((p) => !p.spent && p.history!.length === 1).length).toBeGreaterThan(0);
		});

		test('the next ball hops eagerly and the final pose holds at least 1.5 s', () => {
			const hops = framesOf('next').map((f) => poseAt(f).backlog[0].hop ?? 0);
			expect(Math.max(...hops)).toBeGreaterThan(10);
			expect(poseAt(lastFrame('next') - 1.5 * FPS)).toEqual(readyForNext());
		});

		test('the last frame is changed, not reset, not stained', () => {
			const pose = poseAt(filmDurationInFrames - 1);
			pose.cells.forEach((c) => expect([c.dx, c.dy, c.rot]).toEqual([0, 0, 0]));
			expect(pose.cells.filter((c) => c.color === exampleBall.color).length).toBeGreaterThanOrEqual(2);
			expect(pose.cells.filter((c) => c.split).length).toBe(1);
			pose.cells.forEach((c) => expect(c.smear).toBeUndefined());
			expect(pose.splat).toBeUndefined();
			expect(pose.history!.map((b) => b.id)).toEqual(['pink']);
			expect(pose.backlog[0].id).toBe('sun');
		});
	});
});
