import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ATDDScene, DiagramBoard } from '../../src/atdd/Scene';
import { cue } from '../../src/atdd/diagrams';
import { durationInFrames, FPS } from '../../src/atdd/film';
import { palette, STROKE } from '../../src/atdd/art';
import { ballColors } from '../../src/storyImpact/scene';
import { ATDDStaging, staging as selectedStaging } from '../../src/atdd/staging';
import { baselineStaging, revisedStaging } from './stagingFixtures';

type Point = { x: number; y: number };
const svg = (element: React.ReactElement) => new DOMParser().parseFromString(renderToStaticMarkup(element), 'image/svg+xml');
const scene = (seconds: number, staging: ATDDStaging) => svg(<ATDDScene seconds={seconds} staging={staging} />);
const label = (document: Document | Element, text: string) => Array.from(document.querySelectorAll('text')).find((node) => node.textContent === text)!;
const sheets = (document: Document) => Array.from(document.querySelectorAll('text')).filter((node) => node.textContent === 'Scenario A').map((node) => node.parentElement!);
const numbers = (value: string) => value.match(/-?\d*\.?\d+/g)!.map(Number);
const world = (element: Element, point: Point): Point => {
	let result = point;
	for (let current: Element | null = element; current; current = current.parentElement) {
		const transforms = [...(current.getAttribute('transform') ?? '').matchAll(/(translate|scale)\(([^)]+)\)/g)].reverse();
		for (const [, kind, args] of transforms) {
			const [x, y] = numbers(args);
			result = kind === 'translate' ? { x: result.x + x, y: result.y + (y ?? 0) } : { x: result.x * x, y: result.y * (y ?? x) };
		}
	}
	return result;
};
const location = (element: Element) => world(element, { x: Number(element.getAttribute('x') ?? element.getAttribute('cx')), y: Number(element.getAttribute('y') ?? element.getAttribute('cy')) });

// Sample the actual drawn rounded outline, rather than importing the layout's
// unrounded polygon or its attachment/clearance implementation.
const drawnOutline = (sheet: Element) => {
	const path = sheet.querySelector(`path[fill="${palette.panel}"][stroke="${palette.structure}"]`)!;
	const points: Point[] = [];
	let cursor = { x: 0, y: 0 };
	for (const [, command, args] of path.getAttribute('d')!.matchAll(/([MLQ])([^MLQZ]+)/g)) {
		const values = numbers(args);
		if (command === 'Q') {
			const start = cursor;
			for (let i = 1; i <= 10; i++) {
				const t = i / 10;
				points.push({ x: (1 - t) ** 2 * start.x + 2 * (1 - t) * t * values[0] + t ** 2 * values[2], y: (1 - t) ** 2 * start.y + 2 * (1 - t) * t * values[1] + t ** 2 * values[3] });
			}
			cursor = { x: values[2], y: values[3] };
		} else {
			cursor = { x: values[0], y: values[1] };
			points.push(cursor);
		}
	}
	return points.map((point) => world(path, point));
};
const distance = (point: Point, outline: Point[]) => {
	let winding = 0;
	const gap = Math.min(...outline.map((a, i) => {
	const b = outline[(i + 1) % outline.length];
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const side = dx * (point.y - a.y) - dy * (point.x - a.x);
	if (a.y <= point.y && b.y > point.y && side > 0) winding++;
	if (a.y > point.y && b.y <= point.y && side < 0) winding--;
	const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy)));
	return Math.hypot(point.x - a.x - t * dx, point.y - a.y - t * dy);
	}));
	return winding === 0 ? gap : -gap;
};
const endpoints = (path: Element) => {
	const values = numbers(path.getAttribute('d')!);
	return [world(path, { x: values[0], y: values[1] }), world(path, { x: values[values.length - 2], y: values[values.length - 1] })];
};
const flows = (document: Document | Element) => Array.from(document.querySelectorAll(`path[stroke-width="${STROKE.flow}"][pathLength]`));
const arcs = (document: Document | Element, radius: number) => flows(document).filter((path) => path.getAttribute('d')!.includes(` A${radius} ${radius} `));
const assertDirection = (document: Document, path: Element) => {
	expect(path.getAttribute('marker-end')).toBeTruthy();
	const id = path.getAttribute('marker-end')!.slice(5, -1);
	expect(document.getElementById(id)!.getAttribute('orient')).toBe('auto');
};

describe('authored circle staging through the actual ATDD drawings', () => {
	it.each([['source', baselineStaging], ['edited', revisedStaging], ['selected second edit', selectedStaging]] as const)('%s: trims all clockwise main routes to current outlines and badge reservations', (_, staging) => {
		const board = svg(<DiagramBoard diagram="circle" staging={staging} />);
		const nodes = sheets(board);
		expect(nodes).toHaveLength(6);
		const routes = arcs(board, staging.circle.radius);
		expect(routes).toHaveLength(6);
		[0, 1, 2, 5, 3, 4].forEach((source, i) => {
			const path = routes[i];
			expect(path.getAttribute('d')).toContain(' 0 0 1 ');
			assertDirection(board, path);
			endpoints(path).forEach((point, end) => {
				const node = nodes[(source + end) % 6];
				const gap = distance(point, drawnOutline(node));
				expect(gap).toBeGreaterThanOrEqual(17.9);
				expect(gap).toBeLessThan(23);
				const badge = node.querySelector(`circle[fill="${palette.cellSky}"]`)!;
				const center = location(badge);
				expect(Math.hypot(point.x - center.x, point.y - center.y)).toBeGreaterThan(17 * staging.circle.sheetScale + 17);
			});
		});
	});

	it('moves individual sheets, their labels and badges without moving their semantic rows', () => {
		const before = svg(<DiagramBoard diagram="circle" staging={baselineStaging} />);
		const after = svg(<DiagramBoard diagram="circle" staging={revisedStaging} />);
		const first = sheets(after)[0];
		expect(location(label(first, 'Scenario A'))).not.toEqual(location(label(sheets(before)[0], 'Scenario A')));
		const center = world(first, { x: 90, y: 78 });
		expect(Math.hypot(center.x - revisedStaging.circle.x, center.y - revisedStaging.circle.y)).toBeCloseTo(revisedStaging.circle.radius, 6);
		expect(Math.atan2(center.y - revisedStaging.circle.y, center.x - revisedStaging.circle.x) * 180 / Math.PI).toBeCloseTo(-95, 6);
		expect(first.parentElement!.getAttribute('transform')).toContain('scale(0.94)');
		['Given', 'Select', 'Update', 'Then', '1'].forEach((text) => expect(label(first, text)).toBeDefined());
		const saved = scene(cue(3, 1, 'evidence') + 0.8, revisedStaging);
		const title = location(label(sheets(saved)[0], 'Scenario A'));
		const evidence = location(label(saved, 'Saved'));
		expect(evidence.x - title.x).toBeCloseTo(100 * revisedStaging.circle.sheetScale, 6);
	});

	it('attaches backlog entry and the orange next route after compact motion and a backlog move', () => {
		[cue(3, 0, 'take') - 0.1, cue(3, 0, 'take') + 0.6, cue(3, 0, 'take') + 1.3, cue(11, 1, 'next') + 0.2].forEach((seconds) => {
			const frame = scene(seconds, revisedStaging);
			const backlog = label(frame, 'Backlog').parentElement!;
			const outline = backlog.querySelector('rect[fill="none"]')!;
			const corner = location(outline);
			expect(corner.x).toBe(revisedStaging.backlog.x);
			const entry = flows(frame).find((path) => path.getAttribute('d')!.includes(' C'))!;
			const [start, end] = endpoints(entry);
			expect(start.x - corner.x - Number(outline.getAttribute('width'))).toBeCloseTo(10, 6);
			expect(distance(end, drawnOutline(sheets(frame)[0]))).toBeCloseTo(18, 1);
			if (seconds > cue(11, 1, 'next')) {
				const next = flows(frame).find((path) => path.getAttribute('stroke') === ballColors.orange)!;
				expect(distance(endpoints(next)[1], drawnOutline(sheets(frame)[0]))).toBeCloseTo(18, 1);
				assertDirection(frame, next);
				expect(location(label(frame, 'Next →')).x).toBe(revisedStaging.backlog.x + 50);
			}
		});
	});

	it.each([['source', baselineStaging], ['edited', revisedStaging], ['selected second edit', selectedStaging]] as const)('%s: reserves the waiting label inside the current backlog, below its rows and above the caption', (_, staging) => {
		const times = [36, cue(3, 0, 'take') + 0.3, cue(3, 0, 'take') + 0.6, cue(3, 0, 'take') + 0.9, cue(3, 0, 'take') + 1.3];
		const opacity = times.map((seconds) => {
			const frame = scene(seconds, staging);
			const waiting = label(frame, 'Waiting scenarios');
			const backlog = waiting.parentElement!;
			const panel = backlog.querySelector('rect[fill="none"]')!;
			const panelOrigin = location(panel);
			const center = location(waiting);
			const size = Number(waiting.getAttribute('font-size'));
			// Conservative reservation for the actual Baloo typography; native
			// measurements additionally observe the glyph bounds at both displays.
			const top = center.y - size * 1.2;
			const bottom = center.y + size * 0.35;
			const rows = Array.from(backlog.querySelectorAll(`rect[fill="${palette.panel}"]`));
			expect(rows).toHaveLength(5);
			rows.forEach((row) => expect(location(row).y + Number(row.getAttribute('height')) + 2).toBeLessThan(top - 2));
			expect(center.x - size * 4.2).toBeGreaterThan(panelOrigin.x + 4.5);
			expect(center.x + size * 4.2).toBeLessThan(panelOrigin.x + Number(panel.getAttribute('width')) - 4.5);
			expect(bottom).toBeLessThan(panelOrigin.y + Number(panel.getAttribute('height')) - 4.5);
			const band = frame.querySelector('[data-testid="caption"]')!.parentElement!.querySelector('rect[stroke]')!;
			expect(bottom).toBeLessThan(location(band).y - Number(band.getAttribute('stroke-width')) / 2 - 4);
			return Number(waiting.querySelector('tspan')!.getAttribute('opacity'));
		});
		expect(opacity[0]).toBe(1);
		expect(opacity[opacity.length - 1]).toBe(0);
		opacity.slice(1).forEach((value, i) => expect(value).toBeLessThan(opacity[i]));
	});

	it('keeps both directed local-loop ports outside Update and the current local cycle at existing cues', () => {
		[cue(7, 0, 'red') + 0.3, cue(7, 0, 'green') + 0.3, cue(7, 0, 'refactor') + 0.3, cue(7, 1, 'return') + 1.1].forEach((seconds) => {
			const frame = scene(seconds, revisedStaging);
			const node = sheets(frame)[2];
			const cycle = label(frame, 'Local TDD').parentElement!;
			const center = world(cycle, { x: 0, y: 0 });
			expect(center).toEqual({ x: revisedStaging.circle.x + revisedStaging.localLoop.offset.x, y: revisedStaging.circle.y + revisedStaging.localLoop.offset.y });
			const routes = flows(frame).filter((path) => path.getAttribute('d')!.includes(' C')).slice(1);
			expect(routes).toHaveLength(2);
			const [out, back] = routes.map(endpoints);
			[out[0], back[1]].forEach((port) => expect(distance(port, drawnOutline(node))).toBeCloseTo(18, 1));
			[out[1], back[0]].forEach((port) => expect(Math.hypot(port.x - center.x, port.y - center.y)).toBeCloseTo(52 * revisedStaging.localLoop.size + 18, 1));
			expect(out[0].y).toBeLessThan(back[1].y);
			assertDirection(frame, routes[0]);
			if (seconds > cue(7, 1, 'return') + 1) assertDirection(frame, routes[1]);
		});
	});

	it('keeps the revised main/local journey above the actual film caption band', () => {
		[cue(3, 0, 'pass') + 0.3, cue(4, 0, 'fails') + 0.3, cue(7, 1, 'return') + 1.1, cue(8, 0, 'wrong') + 0.3].forEach((seconds) => {
			const frame = scene(seconds, revisedStaging);
			const caption = frame.querySelector('[data-testid="caption"]')!.parentElement!;
			const band = caption.querySelector('rect[stroke]')!;
			const top = location(band).y - Number(band.getAttribute('stroke-width')) / 2;
			sheets(frame).forEach((sheet) => {
				// Observe the rendered shadow as well as the sheet's stroked face.
				const shadow = sheet.querySelector(`path[fill="${palette.paperShadow}"]`)!;
				const bottom = Math.max(...drawnOutline(sheet).map((p) => p.y));
				const shadowOffset = world(shadow, { x: 0, y: 0 }).y - world(sheet, { x: 0, y: 0 }).y;
				expect(bottom + shadowOffset + STROKE.panel / 2).toBeLessThan(top - 8);
			});
		});
	});

	it('draws the selected staging on both cover/closing miniatures and seeks times without prior-frame state', () => {
		const times = [cue(7, 1, 'return') + 1.1, cue(3, 0, 'pass') + 0.3, 0, cue(4, 0, 'fails') + 0.3, (durationInFrames - 1) / FPS];
		const observed = times.map((seconds) => renderToStaticMarkup(<ATDDScene seconds={seconds} staging={revisedStaging} />));
		[4, 1, 3, 0, 2].forEach((i) => expect(renderToStaticMarkup(<ATDDScene seconds={times[i]} staging={revisedStaging} />)).toBe(observed[i]));
		[0, (durationInFrames - 1) / FPS].forEach((seconds) => {
			const frame = scene(seconds, revisedStaging);
			expect(arcs(label(frame, 'ATDD').parentElement!, revisedStaging.circle.radius)).toHaveLength(6);
			expect(label(frame, 'Backlog')).toBeDefined();
			expect(label(frame, 'Local TDD')).toBeDefined();
		});
	});
});
