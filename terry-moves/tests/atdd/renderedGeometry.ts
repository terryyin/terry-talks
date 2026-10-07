import { palette } from '../../src/atdd/art';

export type Point = { x: number; y: number };
export type Bounds = { left: number; right: number; top: number; bottom: number };
const numbers = (value: string) => value.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)!.map(Number);
export const world = (element: Element, point: Point): Point => {
	let result = point;
	for (let current: Element | null = element; current; current = current.parentElement) {
		for (const [, kind, args] of [...(current.getAttribute('transform') ?? '').matchAll(/(translate|scale)\(([^)]+)\)/g)].reverse()) {
			const [x, y] = numbers(args);
			result = kind === 'translate' ? { x: result.x + x, y: result.y + (y ?? 0) } : { x: result.x * x, y: result.y * (y ?? x) };
		}
	}
	return result;
};
export const bounds = (points: Point[]): Bounds => ({ left: Math.min(...points.map((p) => p.x)), right: Math.max(...points.map((p) => p.x)), top: Math.min(...points.map((p) => p.y)), bottom: Math.max(...points.map((p) => p.y)) });
const attribute = (element: Element, name: string) => Number(element.getAttribute(name) ?? 0);
export const visible = (element: Element) => {
	let opacity = 1;
	for (let node: Element | null = element; node; node = node.parentElement) opacity *= Number(node.getAttribute('opacity') ?? 1);
	return opacity > 0.05;
};

// Read the drawn commands. No pose, footprint or route implementation is used.
export const pathPoints = (path: Element) => {
	const points: Point[] = [];
	let cursor: Point = { x: 0, y: 0 };
	for (const [, command, args] of path.getAttribute('d')!.matchAll(/([MLQmlq])([^MLQmlqZz]+)/g)) {
		const values = numbers(args);
		const relative = command === command.toLowerCase();
		const point = (offset: number) => ({ x: values[offset] + (relative ? cursor.x : 0), y: values[offset + 1] + (relative ? cursor.y : 0) });
		if (command.toUpperCase() === 'Q') {
			const control = point(0);
			const end = point(2);
			for (let i = 1; i <= 16; i++) {
				const t = i / 16;
				points.push({ x: (1 - t) ** 2 * cursor.x + 2 * (1 - t) * t * control.x + t ** 2 * end.x, y: (1 - t) ** 2 * cursor.y + 2 * (1 - t) * t * control.y + t ** 2 * end.y });
			}
			cursor = end;
		} else {
			cursor = point(0);
			points.push(cursor);
		}
	}
	return points;
};
export const outline = (sheet: Element) => {
	const path = sheet.querySelector(`path[fill="${palette.panel}"][stroke="${palette.structure}"]`)!;
	return pathPoints(path).map((point) => world(path, point));
};
export const shapeBounds = (element: Element) => {
	const stroke = attribute(element, 'stroke-width') / 2;
	const points = element.tagName === 'path' ? pathPoints(element) : element.tagName === 'rect'
		? [{ x: attribute(element, 'x'), y: attribute(element, 'y') }, { x: attribute(element, 'x') + attribute(element, 'width'), y: attribute(element, 'y') + attribute(element, 'height') }]
		: [{ x: attribute(element, 'cx') - (attribute(element, 'r') || attribute(element, 'rx')), y: attribute(element, 'cy') - (attribute(element, 'r') || attribute(element, 'ry')) }, { x: attribute(element, 'cx') + (attribute(element, 'r') || attribute(element, 'rx')), y: attribute(element, 'cy') + (attribute(element, 'r') || attribute(element, 'ry')) }];
	return bounds(points.flatMap((p) => [world(element, { x: p.x - stroke, y: p.y - stroke }), world(element, { x: p.x + stroke, y: p.y + stroke })]));
};
export const actorBounds = (person: Element) => bounds(Array.from(person.querySelectorAll('path,rect,circle,ellipse')).flatMap((shape) => {
	const box = shapeBounds(shape);
	return [{ x: box.left, y: box.top }, { x: box.right, y: box.bottom }];
}));
export const labelBounds = (label: Element) => {
	const size = attribute(label, 'font-size');
	const width = (label.textContent?.length ?? 0) * size * 0.65;
	const x = attribute(label, 'x');
	const y = attribute(label, 'y');
	const anchor = label.getAttribute('text-anchor');
	const left = x - (anchor === 'middle' ? width / 2 : anchor === 'end' ? width : 0);
	return bounds([world(label, { x: left, y: y - size * 1.2 }), world(label, { x: left + width, y: y + size * 0.35 })]);
};
export const gap = (a: Bounds, b: Bounds) => Math.max(b.left - a.right, a.left - b.right, b.top - a.bottom, a.top - b.bottom);
