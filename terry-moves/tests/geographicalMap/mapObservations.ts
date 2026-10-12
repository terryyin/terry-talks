import { MapPoint } from '../../src/geographicalMap/direction';

// Observe rendered SVG geometry rather than reconstructing it from the script.
export const attr = (element: Element, name: string) => Number(element.getAttribute(name));

export const pathPoints = (path: Element): MapPoint[] => {
	const numbers = path.getAttribute('d')!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
	return Array.from({ length: numbers.length / 2 }, (_, index) => ({ x: numbers[index * 2], y: numbers[index * 2 + 1] }));
};

export const onLand = (point: MapPoint, polygon: MapPoint[]) => {
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const a = polygon[i];
		const b = polygon[j];
		if ((a.y > point.y) !== (b.y > point.y) && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
	}
	return inside;
};
