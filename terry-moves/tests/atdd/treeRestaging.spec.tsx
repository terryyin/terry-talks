import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ATDDScene, DiagramBoard } from '../../src/atdd/Scene';
import { cue } from '../../src/atdd/diagrams';
import { durationInFrames, FPS } from '../../src/atdd/film';
import { palette, STROKE } from '../../src/atdd/art';
import { ATDDStaging, TreeNodeId, staging as selectedStaging } from '../../src/atdd/staging';
import { baselineStaging, treeStaging } from './stagingFixtures';
import { Bounds, gap, labelBounds, pathPoints, shapeBounds, visible, world } from './renderedGeometry';

const svg = (element: React.ReactElement) => new DOMParser().parseFromString(renderToStaticMarkup(element), 'image/svg+xml');
const scene = (staging: ATDDStaging, seconds: number) => svg(<ATDDScene staging={staging} seconds={seconds} />);
const board = (staging: ATDDStaging) => svg(<DiagramBoard staging={staging} diagram="tree" />);
const box = (document: Document, id: TreeNodeId) => document.querySelector(`[data-tree-node="${id}"] rect[stroke]`)!;
const attr = (element: Element, name: string) => Number(element.getAttribute(name));
const path = (document: Document) => document.querySelector(`path[stroke="${palette.behavior}"][stroke-width="${STROKE.emphasis}"]`)!;
const cursor = (document: Document) => document.querySelector(`circle[fill="${palette.behavior}"][r="12"]`)!;
const inBox = (point: { x: number; y: number }, element: Element) => {
	const bounds = shapeBounds(element);
	return point.x >= bounds.left && point.x <= bounds.right && point.y >= bounds.top && point.y <= bounds.bottom;
};
const endpoint = (element: Element, last = false) => {
	const points = pathPoints(element);
	return world(element, last ? points[points.length - 1] : points[0]);
};
const distance = (p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) => {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const fraction = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1)));
	return Math.hypot(p.x - a.x - fraction * dx, p.y - a.y - fraction * dy);
};

const hierarchy: [TreeNodeId, TreeNodeId][] = [
	['result', 'front'], ['result', 'back'], ['front', 'frontDetail'], ['front', 'frontSibling'],
	['back', 'backSibling'], ['back', 'backDetail'], ['backDetail', 'backLeft'], ['backDetail', 'backRight'],
];

describe.each([['source', baselineStaging], ['authored tree edit', treeStaging], ['selected second edit', selectedStaging]] as const)('%s tree relationships through the actual consumers', (_, staging) => {
	it('keeps the uneven hierarchy, labels and parent/child outline attachments when boxes move or resize', () => {
		const drawing = board(staging);
		expect(drawing.querySelectorAll('[data-tree-node]')).toHaveLength(9);
		Object.entries(staging.tree.nodes).forEach(([id, input]) => {
			const body = box(drawing, id as TreeNodeId);
			expect([attr(body, 'x'), attr(body, 'y'), attr(body, 'width'), attr(body, 'height')]).toEqual([input.x - input.width / 2, input.y - input.height / 2, input.width, input.height]);
			const label = body.parentElement!.querySelector('text')!;
			expect(attr(label, 'x')).toBe(input.x);
			expect(attr(label, 'y')).toBeGreaterThan(input.y - input.height / 2);
			expect(attr(label, 'y')).toBeLessThan(input.y + input.height / 2);
		});
		const edges = Array.from(drawing.querySelectorAll(`path[stroke-width="${STROKE.detail}"]`));
		expect(edges).toHaveLength(hierarchy.length);
		hierarchy.forEach(([parent, child], i) => {
			const p = box(drawing, parent);
			const c = box(drawing, child);
			expect(endpoint(edges[i])).toEqual({ x: attr(p, 'x') + attr(p, 'width') / 2, y: attr(p, 'y') + attr(p, 'height') });
			expect(endpoint(edges[i], true)).toEqual({ x: attr(c, 'x') + attr(c, 'width') / 2, y: attr(c, 'y') });
			expect(endpoint(edges[i], true).y).toBeGreaterThan(endpoint(edges[i]).y);
		});
	});

	it('descends front detail, returns, crosses the back end, and reaches deeper back detail in the original narrated stages', () => {
		const began = cue(1, 0, 'scenario');
		const stages: [number, TreeNodeId][] = [[0.9, 'front'], [1.95, 'frontDetail'], [3.25, 'front'], [4.45, 'back'], [5.75, 'backRight']];
		stages.forEach(([offset, owner]) => {
			const drawing = scene(staging, began + offset);
			const point = world(cursor(drawing), { x: attr(cursor(drawing), 'cx'), y: attr(cursor(drawing), 'cy') });
			expect({ offset, owner, point, inside: inBox(point, box(drawing, owner)) }).toEqual(expect.objectContaining({ inside: true }));
		});
		const frontHold = scene(staging, began + 2.1);
		expect(inBox(endpoint(path(frontHold), true), box(frontHold, 'frontDetail'))).toBe(true);
		const full = board(staging);
		const points = pathPoints(path(full));
		const visits = (owner: TreeNodeId) => points.map((p, i) => inBox(p, box(full, owner)) ? i : -1).filter((i) => i >= 0);
		expect(Math.min(...visits('frontDetail'))).toBeLessThan(Math.min(...visits('back')));
		expect(Math.min(...visits('back'))).toBeLessThan(Math.min(...visits('backRight')));
		expect(inBox(endpoint(path(full)), box(full, 'result'))).toBe(true);
		expect(inBox(endpoint(path(full), true), box(full, 'backRight'))).toBe(true);
	});

	it('keeps every moving cursor on both the current visible trace endpoint and the final rounded route, including bends', () => {
		const complete = path(board(staging));
		const route = pathPoints(complete);
		expect(complete.getAttribute('d')).toContain('Q');
		const began = cue(1, 0, 'scenario');
		for (let frame = 1; frame <= Math.ceil(5.75 * FPS); frame++) {
			const drawing = scene(staging, began + frame / FPS);
			const dot = cursor(drawing);
			const point = world(dot, { x: attr(dot, 'cx'), y: attr(dot, 'cy') });
			const end = endpoint(path(drawing), true);
			expect(Math.hypot(point.x - end.x, point.y - end.y)).toBeLessThan(0.0001);
			expect(Math.min(...route.slice(1).map((to, i) => distance(point, route[i], to)))).toBeLessThan(0.06);
		}
	});

	it('keeps two distinct probes attached to their current owner and descendant outlines, with readable reserved labels', () => {
		const drawing = scene(staging, cue(1, 1, 'internal') + 1);
		const probes = Array.from(drawing.querySelectorAll(`circle[fill="${palette.cellMint}"]`));
		expect(probes).toHaveLength(2);
		const routes = Array.from(drawing.querySelectorAll(`path[stroke="${palette.behavior}"]`)).filter((flow) => flow !== path(drawing));
		const ownerPort = (id: TreeNodeId) => ({ x: attr(box(drawing, id), 'x') + attr(box(drawing, id), 'width'), y: attr(box(drawing, id), 'y') + attr(box(drawing, id), 'height') / 2 });
		expect(endpoint(routes[0])).toEqual(ownerPort('result'));
		expect(endpoint(routes[1])).toEqual(ownerPort('back'));
		expect(endpoint(routes[0], true).x).toBeLessThan(attr(probes[0], 'cx') - attr(probes[0], 'r'));
		expect(endpoint(routes[1], true).x).toBeLessThan(attr(probes[1], 'cx') - attr(probes[1], 'r'));
		const back = box(drawing, 'back');
		const detail = box(drawing, 'backDetail');
		expect(endpoint(routes[2]).y).toBe(attr(back, 'y') + attr(back, 'height'));
		expect(endpoint(routes[2], true).y).toBe(attr(detail, 'y'));
		['backLeft', 'backRight'].forEach((id, i) => {
			expect(endpoint(routes[3 + i]).y).toBe(attr(detail, 'y') + attr(detail, 'height'));
			expect(endpoint(routes[3 + i], true)).toEqual({ x: attr(box(drawing, id as TreeNodeId), 'x') + attr(box(drawing, id as TreeNodeId), 'width') / 2, y: attr(box(drawing, id as TreeNodeId), 'y') });
		});
		const furniture = [drawing.querySelector('rect[y="880"]')!, ...Array.from(drawing.querySelectorAll('text')).filter((label) => label.textContent === 'One narrow result')];
		const reservations: Bounds[] = [...probes.map(shapeBounds), ...Array.from(drawing.querySelectorAll('text')).filter((label) => ['End-to-end', 'Internal', 'test'].includes(label.textContent!)).map(labelBounds)];
		reservations.forEach((reservation) => {
			expect(reservation.left).toBeGreaterThan(0);
			expect(reservation.right).toBeLessThan(attr(drawing.documentElement, 'width'));
			furniture.forEach((element) => expect(gap(reservation, element.tagName === 'text' ? labelBounds(element) : shapeBounds(element))).toBeGreaterThan(0));
			Object.keys(staging.tree.nodes).forEach((id) => expect(gap(reservation, shapeBounds(box(drawing, id as TreeNodeId)))).toBeGreaterThan(0));
		});
	});

	it('uses the same authored tree in both transformed cover miniatures and remains deterministic when seeking out of order', () => {
		[0, (durationInFrames - 1) / FPS].forEach((seconds) => {
			const drawing = scene(staging, seconds);
			const trees = Array.from(drawing.querySelectorAll('[data-tree-node="front"]')).filter(visible);
			expect(trees).toHaveLength(1);
			const body = trees[0].querySelector('rect[stroke]')!;
			const input = staging.tree.nodes.front;
			expect(attr(body, 'width')).toBe(input.width);
			expect(world(body, { x: input.x, y: input.y })).toEqual({ x: -16 + input.x * 0.47, y: 434 + input.y * 0.47 });
		});
		const requested = [cue(1, 0, 'scenario') + 3.5, cue(1, 1, 'internal') + 0.5, cue(1, 0, 'scenario') + 1.2];
		const prior = requested.map((seconds) => renderToStaticMarkup(<ATDDScene staging={staging} seconds={seconds} />));
		requested.slice().reverse().forEach((seconds) => expect(renderToStaticMarkup(<ATDDScene staging={staging} seconds={seconds} />)).toBe(prior[requested.indexOf(seconds)]));
	});
});
