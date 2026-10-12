import { picture, registration } from './renderedFilm';
import { attr, onLand, pathPoints } from './mapObservations';
import { mapTimeline } from '../../src/geographicalMap/direction';
import { GeographicalMapFilm } from '../../src/geographicalMap/GeographicalMapFilm';
import { mapOpening } from '../../src/geographicalMap/script';

const camera = (page: HTMLElement) => page.querySelector('[data-map-camera]')!;
const route = (page: HTMLElement) => page.querySelector('[data-map-route="coast-road"]')!;
const markers = (page: HTMLElement) => [...page.querySelectorAll('[data-map-town-marker]')];

test('the registered opening consumes its local script and derives its square 30fps duration from the same cues', () => {
	expect(registration()).toMatchObject({
		id: 'GeographicalMapOpening', component: GeographicalMapFilm,
		defaultProps: { direction: mapOpening }, durationInFrames: 420, fps: 30, width: 1080, height: 1080,
	});
	expect(mapTimeline(mapOpening, 30).beatRange('follow-the-coast')).toEqual({ from: 150, durationInFrames: 270 });
	const first = picture(0);
	expect(first.textContent).toContain('A FICTIONAL BAY');
	expect(first.querySelector('[data-map-headline]')!.textContent).toBe('Two towns.Across one bay.');
	expect([...first.querySelectorAll('[data-map-town-label]')].map((label) => label.textContent)).toEqual(['Westhaven', 'Eastmere']);
	expect(first.querySelector('[data-map-water-label]')!.textContent).toBe('Hollow Bay');
	expect(first.querySelector('[data-map-route-label]')!.textContent).toBe('Coastal road');
	expect(first.querySelector('audio,video,img')).toBeNull();
});

test('the rendered road connects the two town markers on land while the direct gap between them crosses the bay', () => {
	const page = picture(330);
	const land = pathPoints(page.querySelector('[data-map-land]')!);
	const road = pathPoints(route(page));
	const transform = camera(page).getAttribute('transform')!;
	const values = transform.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
	const [screenX, screenY, scale, offsetX, offsetY] = values;
	const towns = markers(page).map((marker) => ({ x: (attr(marker, 'cx') - screenX) / scale - offsetX, y: (attr(marker, 'cy') - screenY) / scale - offsetY }));
	expect(road[0].x).toBeCloseTo(towns[0].x);
	expect(road[0].y).toBeCloseTo(towns[0].y);
	expect(road[road.length - 1].x).toBeCloseTo(towns[1].x);
	expect(road[road.length - 1].y).toBeCloseTo(towns[1].y);
	for (const town of towns) expect(onLand(town, land)).toBe(true);
	for (let i = 1; i < road.length; i++) {
		for (let sample = 0; sample <= 10; sample++) {
			const t = sample / 10;
			expect(onLand({ x: road[i - 1].x + (road[i].x - road[i - 1].x) * t, y: road[i - 1].y + (road[i].y - road[i - 1].y) * t }, land)).toBe(true);
		}
	}
	for (const x of [400, 450, 500, 550, 600]) expect(onLand({ x, y: towns[0].y }, land)).toBe(false);
});

test('the overview-to-detail move projects markers and reveals the road while labels retain their screen font sizes', () => {
	const overview = picture(149);
	const join = picture(150);
	const moving = picture(225);
	const detail = picture(330);
	expect(camera(overview).getAttribute('transform')).toBe(camera(join).getAttribute('transform'));
	expect(route(overview).getAttribute('stroke-dashoffset')).toBe(route(join).getAttribute('stroke-dashoffset'));
	expect(route(join).getAttribute('stroke-dashoffset')).toBe('1');
	expect(Number(route(moving).getAttribute('stroke-dashoffset'))).toBeGreaterThan(0);
	expect(Number(route(moving).getAttribute('stroke-dashoffset'))).toBeLessThan(1);
	expect(route(detail).getAttribute('stroke-dashoffset')).toBe('0');
	expect(camera(moving).getAttribute('transform')).not.toBe(camera(join).getAttribute('transform'));
	expect(camera(moving).getAttribute('transform')).not.toBe(camera(detail).getAttribute('transform'));
	expect(attr(markers(detail)[0], 'cx')).toBeLessThan(attr(markers(overview)[0], 'cx'));
	expect(attr(markers(detail)[1], 'cx')).toBeGreaterThan(attr(markers(overview)[1], 'cx'));
	for (const page of [overview, moving, detail]) {
		for (const label of page.querySelectorAll('[data-map-town-label]')) {
			expect(label.closest('[data-map-camera]')).toBeNull();
			expect(label.getAttribute('font-size')).toBe('48');
			const marker = label.parentElement!.querySelector('[data-map-town-marker]')!;
			expect(attr(label, 'x')).toBe(attr(marker, 'cx'));
			expect(attr(label, 'y')).toBe(attr(marker, 'cy') - 46);
			expect(attr(label, 'x')).toBeGreaterThan(200);
			expect(attr(label, 'x')).toBeLessThan(880);
		}
		expect(page.querySelector('[data-map-route-label]')!.getAttribute('font-size')).toBe('44');
	}
	expect(picture(330).innerHTML).toBe(picture(419).innerHTML);
});

test('fresh direct and reverse seeks reproduce cue boundaries, moving pictures and held detail without replay', () => {
	const frames = [0, 75, 149, 150, 151, 195, 225, 299, 300, 330, 419];
	const forward = new Map(frames.map((frame) => [frame, picture(frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(picture(frame).innerHTML).toBe(forward.get(frame));
	for (const frame of [225, 419, 150, 0, 300]) expect(picture(frame).innerHTML).toBe(forward.get(frame));
	expect(picture(149).querySelector('[data-map-cue]')!.getAttribute('data-map-cue')).toBe('locate-the-towns');
	expect(picture(150).querySelector('[data-map-cue]')!.getAttribute('data-map-cue')).toBe('follow-the-coast');
	expect(picture(150).querySelector('[data-map-headline]')!.textContent).toBe('The familiar wayfollows the coast.');
	expect(mapTimeline(mapOpening, 60).durationInFrames).toBe(840);
	expect(picture(450, mapOpening, 60).innerHTML).toBe(picture(225).innerHTML);
});

test('authored place, route and camera values reach the same film without recognizing cue identities', () => {
	const edited = {
		...mapOpening,
		geography: {
			...mapOpening.geography,
			places: mapOpening.geography.places.map((place, index) => index === 0 ? { ...place, name: 'Westport' } : place),
			routes: mapOpening.geography.routes.map((path) => ({ ...path, name: 'Shore road', points: path.points.map((point, index) => index === 6 ? { ...point, y: 565 } : point) })),
		},
		cues: mapOpening.cues.map((cue) => ({ ...cue, id: `renamed-${cue.id}`, to: { ...cue.to, camera: { center: { x: 500, y: 350 }, scale: 1.08 } } })),
	};
	const original = picture(330);
	const revision = picture(330, edited);
	expect(revision.querySelector('[data-map-town-label]')!.textContent).toBe('Westport');
	expect(revision.querySelector('[data-map-route-label]')!.textContent).toBe('Shore road');
	expect(route(revision).getAttribute('d')).not.toBe(route(original).getAttribute('d'));
	expect(camera(revision).getAttribute('transform')).not.toBe(camera(original).getAttribute('transform'));
	expect(route(revision).getAttribute('stroke-dashoffset')).toBe('0');
	expect(original.querySelector('[data-map-town-label]')!.textContent).toBe('Westhaven');
});
