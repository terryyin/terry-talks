import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ATDDScene, DiagramBoard } from '../../src/atdd/Scene';
import { cue } from '../../src/atdd/diagrams';
import { FPS, scenes } from '../../src/atdd/film';
import { palette, RED, STROKE, TEAM_COLORS } from '../../src/atdd/art';
import { ATDDStaging, staging as selectedStaging } from '../../src/atdd/staging';
import { baselineStaging, resizedStaging } from './stagingFixtures';
import { actorBounds, bounds, gap, labelBounds, outline, shapeBounds, visible, world } from './renderedGeometry';

const svg = (element: React.ReactElement) => new DOMParser().parseFromString(renderToStaticMarkup(element), 'image/svg+xml');
const scene = (seconds: number, staging: ATDDStaging) => svg(<ATDDScene seconds={seconds} staging={staging} />);
const label = (element: Document | Element, text: string) => Array.from(element.querySelectorAll('text')).find((node) => node.textContent === text)!;
const sheets = (frame: Document) => Array.from(frame.querySelectorAll('text')).filter((text) => text.textContent === 'Scenario A').map((text) => text.parentElement!);
const people = (frame: Document) => TEAM_COLORS.map((color) => frame.querySelector(`rect[fill="${color}"][width="36"]`)!.parentElement!);
const status = (sheet: Element) => ['Given', 'Select', 'Update', 'Then'].map((text) => label(sheet, text).parentElement!.querySelector('circle')!.getAttribute('fill'));
const center = (person: Element) => world(person, { x: 0, y: 0 });
const endpoints = (path: Element) => {
	const values = path.getAttribute('d')!.match(/-?\d*\.?\d+/g)!.map(Number);
	return [{ x: values[0], y: values[1] }, { x: values[values.length - 2], y: values[values.length - 1] }].map((p) => world(path, p));
};
const nearestEdge = (point: { x: number; y: number }, polygon: { x: number; y: number }[]) => Math.min(...polygon.map((a, i) => {
	const b = polygon[(i + 1) % polygon.length];
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy)));
	return Math.hypot(point.x - a.x - t * dx, point.y - a.y - t * dy);
}));

describe('resized collaborators in the actual circle film', () => {
	it.each([['source', baselineStaging], ['resized', resizedStaging], ['selected second edit', selectedStaging]] as const)('%s: preserves failure, 3/2 work, unfinished finishing, pre-pass merge and all-green reunion', (_, staging) => {
		const failed = scene(cue(8, 0, 'wrong') + 0.3, staging);
		expect(status(sheets(failed)[3])).toEqual([palette.behavior, palette.behavior, palette.behavior, RED]);
		const split = scene(cue(9, 1, 'two') + 1.3, staging);
		const locations = people(split).map(center);
		expect(people(split).map((person) => person.querySelector('text')!.textContent)).toEqual(['1', '2', '3', '4', '5']);
		const finished = bounds(outline(sheets(split)[5]));
		const finishing = bounds(outline(sheets(split)[4]));
		expect(locations.slice(0, 3).every((p) => p.x > finished.right && p.y < finishing.top)).toBe(true);
		expect(locations.slice(3).every((p) => p.x < finishing.left && p.y > finishing.top)).toBe(true);
		expect(status(sheets(split)[4])[3]).toBe(palette.paper);
		const merged = scene(cue(10, 0, 'reunite') + 1.6, staging);
		expect(status(sheets(merged)[5])).toEqual(Array(4).fill(palette.paper));
		const heights = people(merged).map((person) => center(person).y);
		expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(5);
		const passed = scene(cue(10, 0, 'pass') + 0.2, staging);
		expect(status(sheets(passed)[5])).toEqual(Array(4).fill(palette.behavior));
		expect(people(passed).map((person) => person.querySelector('text')!.textContent)).toEqual(['1', '2', '3', '4', '5']);
		const restored = scene(scenes[11].start + 0.8, staging);
		expect(sheets(restored).every(visible)).toBe(true);
	});

	it.each([['source', baselineStaging], ['resized', resizedStaging], ['selected second edit', selectedStaging]] as const)('%s: actor silhouettes clear each other, visible sheet labels/badges and film furniture through the journey', (_, staging) => {
		const times = Array.from({ length: Math.ceil((scenes[11].start + 0.8 - scenes[9].start) * FPS) }, (_, i) => scenes[9].start + i / FPS);
		times.push(cue(10, 0, 'reunite') + 0.4, cue(10, 0, 'reunite') + 0.7, cue(10, 0, 'reunite') + 1.1);
		times.forEach((seconds) => {
			const frame = scene(seconds, staging);
			const actors = people(frame).map(actorBounds);
			const reservations = sheets(frame).filter(visible).flatMap((sheet) => [
				...Array.from(sheet.querySelectorAll('text')).map(labelBounds),
				...Array.from(sheet.querySelectorAll(`circle[fill="${palette.cellSky}"]`)).map(shapeBounds),
			]);
			Array.from(frame.querySelectorAll('text')).filter((text) => visible(text) && ['RED', 'GREEN', 'REFACTOR', '3 · Front-end TDD', '2 · Finish Scenario A'].includes(text.textContent ?? '')).forEach((text) => reservations.push(labelBounds(text)));
			const band = frame.querySelector('[data-testid="caption"]')?.parentElement!.querySelector('rect[stroke]');
			const heading = frame.documentElement.querySelector('g > text')!;
			sheets(frame).filter(visible).forEach((sheet) => {
				const body = bounds(outline(sheet));
				expect(body.top).toBeGreaterThan(labelBounds(heading).bottom + 8);
				if (band) expect(body.bottom + 10).toBeLessThan(shapeBounds(band).top - 8);
			});
			actors.forEach((actor, index) => {
				expect(actor.left).toBeGreaterThan(8);
				expect(actor.right).toBeLessThan(1072);
				expect(actor.top).toBeGreaterThan(labelBounds(heading).bottom + 8);
				if (band) expect(actor.bottom).toBeLessThan(shapeBounds(band).top - 8);
				actors.slice(index + 1).forEach((other, otherIndex) => { if (gap(actor, other) <= 1) throw new Error(`${seconds}: actors ${index}/${index + otherIndex + 1} gap ${gap(actor, other)}`); });
				reservations.forEach((reservation, reservationIndex) => { if (gap(actor, reservation) <= 2) throw new Error(`${seconds}: actor ${index} reservation ${reservationIndex} gap ${gap(actor, reservation)}`); });
			});
		});
	}, 30000);

	it('enlarges an actual sheet and identity through maintained scene data, with owner-derived fork and merge ports', () => {
		const edited = scene(cue(9, 1, 'two') + 1.3, resizedStaging);
		expect(actorBounds(people(edited)[2]).right - actorBounds(people(edited)[2]).left).toBeGreaterThan((actorBounds(people(edited)[1]).right - actorBounds(people(edited)[1]).left) * 1.2);
		const board = svg(<DiagramBoard diagram="circle" staging={resizedStaging} />);
		const nodes = sheets(board);
		expect(nodes[5].parentElement!.getAttribute('transform')).toContain(`scale(${0.94 * 1.12})`);
		const routes = Array.from(board.querySelectorAll(`path[stroke-width="${STROKE.flow}"][pathLength]`)).filter((path) => /^M[-\d.]+ [-\d.]+ L[-\d.]+ [-\d.]+$/.test(path.getAttribute('d')!));
		expect(routes).toHaveLength(2);
		expect(nearestEdge(endpoints(routes[0])[0], outline(nodes[3]))).toBeCloseTo(18, 0);
		expect(nearestEdge(endpoints(routes[1])[1], outline(nodes[5]))).toBeGreaterThanOrEqual(17.9);
		expect(nearestEdge(endpoints(routes[1])[1], outline(nodes[5]))).toBeLessThan(23);
		routes.forEach((path) => {
			const id = path.getAttribute('marker-end')!.slice(5, -1);
			expect(board.getElementById(id)!.getAttribute('orient')).toBe('auto');
		});
	});

	it('derives enlarged main-team spacing before the split and renders seeks without accumulated poses', () => {
		[cue(3, 1, 'evidence') + 0.8, cue(4, 0, 'fails') + 0.3, cue(7, 1, 'return') + 1.1, cue(8, 0, 'wrong') + 0.3].forEach((seconds) => {
			const frame = scene(seconds, resizedStaging);
			const actors = people(frame).map(actorBounds);
			actors.forEach((actor, index) => {
				actors.slice(index + 1).forEach((other) => expect(gap(actor, other)).toBeGreaterThan(1));
				sheets(frame).filter(visible).forEach((sheet, sheetIndex) => {
					Array.from(sheet.querySelectorAll('text')).forEach((text) => { if (gap(actor, labelBounds(text)) <= 2) throw new Error(`${seconds}: main actor ${index} sheet ${sheetIndex} label ${text.textContent} gap ${gap(actor, labelBounds(text))}`); });
					Array.from(sheet.querySelectorAll(`circle[fill="${palette.cellSky}"]`)).forEach((badge) => expect(gap(actor, shapeBounds(badge))).toBeGreaterThan(2));
				});
			});
		});
		const times = [106.4, 96.9, 112, 114.8, 105.9];
		const renders = times.map((seconds) => renderToStaticMarkup(<ATDDScene seconds={seconds} staging={resizedStaging} />));
		[3, 0, 4, 1, 2].forEach((index) => expect(renderToStaticMarkup(<ATDDScene seconds={times[index]} staging={resizedStaging} />)).toBe(renders[index]));
	});

	it.each([['source', baselineStaging], ['resized', resizedStaging], ['selected second edit', selectedStaging]] as const)('%s: the moving main-team label reserves its own room on the approach to Then', (_, staging) => {
		const count = Math.ceil((scenes[8].end - scenes[8].start) * FPS);
		Array.from({ length: count }, (_, i) => scenes[8].start + i / FPS).forEach((seconds) => {
			const frame = scene(seconds, staging);
			const movingLabel = labelBounds(label(frame, 'Working together'));
			const actors = people(frame).map(actorBounds);
			actors.forEach((actor) => expect(gap(actor, movingLabel)).toBeGreaterThan(2));
			sheets(frame).filter(visible).forEach((sheet) => {
				const reservations = [...Array.from(sheet.querySelectorAll('text')).map(labelBounds), ...Array.from(sheet.querySelectorAll(`circle[fill="${palette.cellSky}"]`)).map(shapeBounds)];
				reservations.forEach((reservation) => {
					if (gap(movingLabel, reservation) <= 2) throw new Error(`${seconds}: moving label reservation gap ${gap(movingLabel, reservation)}`);
					actors.forEach((actor) => expect(gap(actor, reservation)).toBeGreaterThan(2));
				});
			});
			const band = frame.querySelector('[data-testid="caption"]')?.parentElement!.querySelector('rect[stroke]');
			if (band) expect(movingLabel.bottom).toBeLessThan(shapeBounds(band).top - 8);
		});
	}, 30000);
});
