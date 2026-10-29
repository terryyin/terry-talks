import { renderToStaticMarkup } from 'react-dom/server';
import { ATDDScene } from '../../src/atdd/Scene';
import { cue } from '../../src/atdd/diagrams';
import { scenes } from '../../src/atdd/film';
import { palette, RED, TEAM_COLORS, WAIT } from '../../src/atdd/art';
import { ATDDStaging, staging as selectedStaging } from '../../src/atdd/staging';
import { baselineStaging, resizedStaging } from './stagingFixtures';
import { actorBounds, bounds, gap, labelBounds, outline, shapeBounds, visible } from './renderedGeometry';

const scene = (seconds: number, staging: ATDDStaging = selectedStaging) => new DOMParser().parseFromString(renderToStaticMarkup(<ATDDScene seconds={seconds} staging={staging} />), 'image/svg+xml');
const label = (frame: Document | Element, content: string) => Array.from(frame.querySelectorAll('text')).find((node) => node.textContent === content)!;
const sheets = (frame: Document) => Array.from(frame.querySelectorAll('text')).filter((node) => node.textContent === 'Scenario A').map((node) => node.parentElement!);
const people = (frame: Document) => TEAM_COLORS.map((color) => frame.querySelector(`rect[fill="${color}"][width="36"]`)!.parentElement!);
const status = (sheet: Element) => ['Given', 'Select', 'Update', 'Then'].map((content) => label(sheet, content).parentElement!.querySelector('circle')!.getAttribute('fill'));

describe('ATDD reading and closing direction', () => {
	it.each([['source', baselineStaging], ['resized', resizedStaging], ['selected', selectedStaging]] as const)('%s: reads the same failed Then sheet and all five people in a settled close view', (_, staging) => {
		const before = scene(scenes[8].start, staging);
		const reading = scene(89.8, staging);
		const original = bounds(outline(sheets(before)[3]));
		const focused = bounds(outline(sheets(reading)[3]));
		expect(sheets(reading)).toHaveLength(6);
		expect(focused.bottom - focused.top).toBeGreaterThan((original.bottom - original.top) * 1.5);
		expect(sheets(reading).filter(visible)).toEqual([sheets(reading)[3]]);
		expect(status(sheets(reading)[3])).toEqual([palette.behavior, palette.behavior, palette.behavior, RED]);
		expect(people(reading).every(visible)).toBe(true);
		const heading = labelBounds(label(reading, 'Actions pass. Result fails.'));
		const caption = shapeBounds(reading.querySelector('[data-testid="caption"]')!.parentElement!.querySelector('rect[stroke]')!);
		[focused, ...people(reading).map(actorBounds), labelBounds(label(reading, 'Working together'))].forEach((subject) => {
			expect(subject.top).toBeGreaterThan(heading.bottom + 8);
			expect(subject.bottom).toBeLessThan(caption.top - 8);
			expect(subject.left).toBeGreaterThan(8);
			expect(subject.right).toBeLessThan(1072);
		});
		const holding = bounds(outline(sheets(scene(91.5, staging))[3]));
		expect(holding).toEqual(focused);
		const returned = bounds(outline(sheets(scene(scenes[8].end - 1 / 30, staging))[3]));
		expect(returned.bottom - returned.top).toBeCloseTo(original.bottom - original.top, 1);
	});

	it('fades neutral temporary paths into real paths one row at a time while Then stays real', () => {
		const begin = cue(12, 1, 'begin');
		[0, 1, 2, 3].forEach((completed) => {
			const frame = scene(begin + completed * 0.65 - 0.05);
			const rows = Array.from(frame.querySelectorAll('[data-advanced-step]'));
			expect(rows.filter((row) => visible(label(row, 'Real path')))).toHaveLength(completed);
			expect(rows.filter((row) => visible(label(row, 'Temporary fake')))).toHaveLength(3 - completed);
			rows.slice(completed).forEach((row) => expect(label(row, 'Temporary fake').getAttribute('fill')).toBe(WAIT));
			expect(visible(label(frame, 'Then: a real result check'))).toBe(true);
		});
		Array.from({ length: 75 }, (_, i) => begin + i / 30).forEach((seconds) => {
			const frame = scene(seconds);
			Array.from(frame.querySelectorAll('[data-advanced-step]')).forEach((row) => expect(visible(label(row, 'Real path')) && visible(label(row, 'Temporary fake'))).toBe(false));
		});
		const frame = scene(132);
		const panel = shapeBounds(label(frame, 'Make the result').parentElement!.querySelector(`rect[fill="${palette.panel}"]`)!);
		['Make the result', 'observable first'].forEach((content) => {
			const title = labelBounds(label(frame, content));
			expect(title.left - panel.left).toBeGreaterThan(30);
			expect(panel.right - title.right).toBeGreaterThan(30);
		});
	});

	it('closes with both actual diagrams, five human identities, and a smaller helper clear of their evidence', () => {
		const frame = scene(139.8);
		expect(frame.querySelectorAll('[data-tree-node]')).toHaveLength(9);
		expect(sheets(frame)).toHaveLength(6);
		['The solution tree', 'The scenario + checks', 'Scenario A · existing checks', 'Grow scope deliberately'].forEach((content) => expect(visible(label(frame, content))).toBe(true));
		expect(people(frame).map((person) => person.querySelector('text')!.textContent)).toEqual(['1', '2', '3', '4', '5']);
		const helper = label(frame, 'AI').parentElement!;
		const ai = actorBounds(helper);
		const humans = people(frame).map(actorBounds);
		expect(visible(helper)).toBe(true);
		expect(ai.bottom - ai.top).toBeLessThan(Math.min(...humans.map((human) => human.bottom - human.top)));
		humans.forEach((human) => expect(gap(human, ai)).toBeGreaterThan(16));
		sheets(frame).forEach((sheet) => expect(gap(bounds(outline(sheet)), ai)).toBeGreaterThan(16));
		expect(ai.bottom).toBeLessThan(787);
		expect(frame.querySelector('rect[stroke-dasharray="18 13"]')).toBeNull();
	});
});
