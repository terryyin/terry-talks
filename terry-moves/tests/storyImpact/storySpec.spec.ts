import {
	ballColors,
	CellPose,
	GridSpot,
	laterStories,
	messyProduct,
	messyProductOf,
	pinkStory,
	storyFlies,
	storyFliesOf,
	storyIsFuzzy,
	storyIsFuzzyOf,
	storySplashes,
	storySplashesOf,
	StorySpec,
	storyWishes,
	storyWishesOf,
	tidyCells,
} from '@/storyImpact/scene';
import {
	afterStory,
	assimilating,
	assimilatingOf,
	coherentProduct,
	coherentProductOf,
	readyForNext,
	readyForNextOf,
	storyInHistory,
	storyInHistoryOf,
} from '@/storyImpact/assimilation';
import { flightBeat, flightBeatOf, splatBeat, splatBeatOf, wishBeat, wishBeatOf } from '@/storyImpact/storyBeats';
import { assimilateBeat, assimilateBeatOf, coherentBeat, coherentBeatOf, wobbleBeat, wobbleBeatOf } from '@/storyImpact/productBeats';
import { historyBeat, historyBeatOf, nextBeat, nextBeatOf } from '@/storyImpact/historyBeats';

const pinkFromScratch = () => ({ cells: tidyCells(), history: [], backlog: laterStories });

const cellAt = (cells: CellPose[], { col, row }: GridSpot) => cells.find((c) => c.col === col && c.row === row)!;
const isAt = (spots: GridSpot[], cell: CellPose) => spots.some((s) => s.col === cell.col && s.row === cell.row);

describe('story poses built from any story and the product before it', () => {
	test('the pink story built through the general form is today\'s poses', () => {
		const before = pinkFromScratch();
		expect(storyWishesOf(pinkStory, before)).toStrictEqual(storyWishes());
		expect(storyIsFuzzyOf(pinkStory, before)).toStrictEqual(storyIsFuzzy());
		expect(storyFliesOf(pinkStory, before)).toStrictEqual(storyFlies());
		expect(storySplashesOf(pinkStory, before)).toStrictEqual(storySplashes());
		expect(messyProductOf(pinkStory, before)).toStrictEqual(messyProduct());
		expect(assimilatingOf(pinkStory, before)).toStrictEqual(assimilating());
		expect(coherentProductOf(pinkStory, before)).toStrictEqual(coherentProduct());
		expect(storyInHistoryOf(pinkStory, before)).toStrictEqual(storyInHistory());
		expect(readyForNextOf(pinkStory, before)).toStrictEqual(readyForNext());
	});

	test('the pink story\'s beats built through the general form move as today\'s', () => {
		const before = pinkFromScratch();
		const pairs = [
			[wishBeatOf, wishBeat],
			[flightBeatOf, flightBeat],
			[splatBeatOf, splatBeat],
			[wobbleBeatOf, wobbleBeat],
			[assimilateBeatOf, assimilateBeat],
			[coherentBeatOf, coherentBeat],
			[historyBeatOf, historyBeat],
			[nextBeatOf, nextBeat],
		] as const;
		for (const [general, pink] of pairs) {
			const beat = general(pinkStory, before);
			for (const sec of [0, 0.5, 1.2, 2.4, 3.5]) expect(beat(sec)).toStrictEqual(pink(sec));
		}
	});

	describe('a second story on the pink story\'s product', () => {
		const sun: StorySpec = {
			ball: laterStories[0],
			impact: { col: 3, row: 1 },
			changed: [
				{ col: 3, row: 1 }, // a pink cell: it turns sun
				{ col: 4, row: 3 },
				{ col: 0, row: 1 },
			],
			reorganized: { col: 2, row: 0 }, // a pink cell: it splits pink and sun
			seed: 11,
		};
		const before = afterStory(pinkStory, pinkFromScratch());
		const pinkCells = coherentProduct().cells;

		test('starts from the coherent pink product, pink in History, the rest waiting', () => {
			expect(before.cells).toStrictEqual(pinkCells);
			expect(before.history).toEqual([pinkStory.ball]);
			expect(before.backlog.map((b) => b.id)).toEqual(['grape', 'lime']);
			expect(storyWishesOf(sun, before).history).toEqual([pinkStory.ball]);
		});

		test('knocked cells keep the colors the pink story gave them', () => {
			const messy = messyProductOf(sun, before).cells;
			messy.forEach((cell, i) => {
				expect(cell.color).toBe(pinkCells[i].color);
				expect(cell.split).toBe(pinkCells[i].split);
			});
			expect(messy.some((c) => c.color === ballColors.pink && (c.dx !== 0 || c.rot !== 0))).toBe(true);
		});

		test('keeps the pink cells it does not change and paints its own', () => {
			const cells = coherentProductOf(sun, before).cells;
			cells.forEach((cell, i) => {
				const was = pinkCells[i];
				if (isAt([...sun.changed, sun.reorganized], cell)) return;
				expect(cell).toStrictEqual(was);
			});
			sun.changed.forEach((spot) => expect(cellAt(cells, spot).color).toBe(ballColors.sun));
			const reorganized = cellAt(cells, sun.reorganized);
			expect(reorganized.color).toBe(ballColors.pink);
			expect(reorganized.split).toBe(ballColors.sun);
			expect(cells.filter((c) => c.color === ballColors.pink).length).toBeGreaterThanOrEqual(2);
		});

		test('an already split cell takes the new color on its other half', () => {
			const grape: StorySpec = { ...sun, ball: laterStories[1], reorganized: pinkStory.reorganized, changed: [] };
			const cell = cellAt(coherentProductOf(grape, before).cells, pinkStory.reorganized);
			expect(cell.split).toBe(ballColors.pink);
			expect(cell.color).toBe(ballColors.grape);
		});

		test('flies toward its own impact spot', () => {
			expect(storyFliesOf(sun, before).story!.toward).toEqual(sun.impact);
			expect(storyFlies().story!.toward).toBeUndefined();
		});

		test('its spent ball joins History after the pink one, and the next steps up', () => {
			expect(storyInHistoryOf(sun, before).history).toEqual([pinkStory.ball, sun.ball]);
			expect(historyBeatOf(sun, before)(4.49).history!.map((b) => b.id)).toEqual(['pink', 'sun']);
			expect(historyBeatOf(sun, before)(0).historyReveal).toBeUndefined();
			const next = readyForNextOf(sun, before).backlog;
			expect(next.map((b) => b.id)).toEqual(['grape', 'lime']);
			expect(next[0].eager).toBe(true);
		});
	});
});
