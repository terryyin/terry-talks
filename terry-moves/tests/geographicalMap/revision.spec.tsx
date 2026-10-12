import { baselinePicture, baselineRegistration, revisionPicture, revisionRegistration } from './renderedFilm';
import { attr, pathPoints } from './mapObservations';
import { mapTimeline } from '../../src/geographicalMap/direction';
import { GeographicalMapFilm } from '../../src/geographicalMap/GeographicalMapFilm';
import { mapBaseline, mapWideComparison } from '../../src/geographicalMap/script';

const baseline = mapTimeline(mapBaseline, 30);
const revision = mapTimeline(mapWideComparison, 30);
const camera = (page: HTMLElement) => page.querySelector('[data-map-camera]')!.getAttribute('transform');
const route = (page: HTMLElement, id: string) => page.querySelector(`[data-map-route="${id}"]`)!;

test('both saved takes register the same renderer and cue-derived 77-second clock', () => {
	expect(baselineRegistration()).toMatchObject({ id: 'GeographicalMapBaseline', component: GeographicalMapFilm, defaultProps: { direction: mapBaseline } });
	expect(revisionRegistration()).toMatchObject({
		id: 'GeographicalMapWideComparison', component: GeographicalMapFilm, defaultProps: { direction: mapWideComparison },
		durationInFrames: 2310, fps: 30, width: 1080, height: 1080,
	});
	expect(revision.durationInFrames).toBe(baseline.durationInFrames);
	expect(mapTimeline(mapWideComparison, 60).durationInFrames).toBe(4620);
	for (const cue of mapBaseline.cues) expect(revision.beatRange(cue.id)).toEqual(baseline.beatRange(cue.id));
});

test('the saved revision changes only comparison and return framing and leaves the baseline selectable and unchanged', () => {
	const retainedBaseline = JSON.stringify(mapBaseline);
	expect(mapWideComparison.geography).toBe(mapBaseline.geography);
	for (let frame = 0; frame < baseline.durationInFrames; frame++) {
		const original = baseline.poseAt(frame);
		const revised = revision.poseAt(frame);
		const { camera: originalCamera, ...originalContent } = original;
		const { camera: revisedCamera, ...revisedContent } = revised;
		expect(revisedContent).toEqual(originalContent);
		if (frame <= 1650 || frame >= 2010) expect(revisedCamera).toEqual(originalCamera);
		else expect(revisedCamera).not.toEqual(originalCamera);
	}
	for (const frame of [0, 149, 225, 419, 599, 720, 930, 1140, 1350, 1440, 1649, 1650, 2010, 2129, 2130, 2309]) {
		expect(revisionPicture(frame).innerHTML).toBe(baselinePicture(frame).innerHTML);
	}
	for (const frame of [1680, 1710, 1800, 1919, 1920, 1965, 2009]) {
		const original = baselinePicture(frame);
		const changed = revisionPicture(frame);
		expect(camera(changed)).not.toBe(camera(original));
		for (const id of ['coast-road', 'possible-ferry']) {
			expect(route(changed, id).getAttribute('d')).toBe(route(original, id).getAttribute('d'));
			expect(route(changed, id).getAttribute('stroke-dashoffset')).toBe('0');
			expect(route(changed, id).parentElement!.getAttribute('opacity')).toBe('1');
			expect(changed.querySelector(`[data-map-route-label="${id}"]`)!.textContent).toBe(original.querySelector(`[data-map-route-label="${id}"]`)!.textContent);
		}
		expect(changed.querySelector('[data-map-headline]')!.textContent).toBe(original.querySelector('[data-map-headline]')!.textContent);
		expect(changed.querySelector('[data-map-supporting]')?.textContent).toBe(original.querySelector('[data-map-supporting]')?.textContent);
	}
	expect(JSON.stringify(mapBaseline)).toBe(retainedBaseline);
	expect(camera(baselinePicture(1800))).toBe('translate(540 635) scale(1.12) translate(-500 -325)');
	expect(camera(revisionPicture(1800))).toBe('translate(540 635) scale(0.88) translate(-500 -300)');
});

test('both routes and fixed-size labels remain inside the map throughout the wider comparison and return', () => {
	for (const frame of [1650, 1680, 1710, 1800, 1919, 1920, 1965, 2010]) {
		const page = revisionPicture(frame);
		const [screenX, screenY, scale, offsetX, offsetY] = camera(page)!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
		for (const id of ['coast-road', 'possible-ferry']) {
			for (const point of pathPoints(route(page, id))) {
				const x = screenX + (point.x + offsetX) * scale;
				const y = screenY + (point.y + offsetY) * scale;
				expect(x).toBeGreaterThan(80);
				expect(x).toBeLessThan(1000);
				expect(y).toBeGreaterThan(390);
				expect(y).toBeLessThan(960);
			}
			const label = page.querySelector(`[data-map-route-label="${id}"]`)!;
			expect(label.getAttribute('font-size')).toBe('44');
			expect(label.closest('[data-map-camera]')).toBeNull();
			expect(attr(label, 'y')).toBeGreaterThan(420);
			// Leave descent room below the inherited start-of-move label.
			expect(attr(label, 'y')).toBeLessThan(958);
		}
		for (const label of page.querySelectorAll('[data-map-town-label]')) {
			expect(label.getAttribute('font-size')).toBe('48');
			expect(label.closest('[data-map-camera]')).toBeNull();
			expect(attr(label, 'x')).toBeGreaterThan(200);
			expect(attr(label, 'x')).toBeLessThan(880);
			expect(attr(label, 'y')).toBeGreaterThan(430);
			expect(attr(label, 'y')).toBeLessThan(900);
		}
	}
	expect(attr(revisionPicture(1800).querySelector('[data-map-town-marker]')!, 'cx')).toBeGreaterThan(attr(baselinePicture(1800).querySelector('[data-map-town-marker]')!, 'cx'));
});

test('fresh direct and reverse seeks reproduce revised movement, holds and continuous cue joins', () => {
	const ranges = mapWideComparison.cues.map((cue) => revision.beatRange(cue.id));
	const frames = [...new Set([...ranges.flatMap(({ from, durationInFrames }) => [from, from + Math.floor(durationInFrames / 2), from + durationInFrames - 1]), 1680, 1710, 1800, 1965, 2010])];
	const forward = new Map(frames.map((frame) => [frame, revisionPicture(frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(revisionPicture(frame).innerHTML).toBe(forward.get(frame));
	for (const frame of [1965, 1800, 0, 2309, 1680]) expect(revisionPicture(frame).innerHTML).toBe(forward.get(frame));
	for (const { from } of ranges.slice(1)) {
		const before = revisionPicture(from - 1);
		const after = revisionPicture(from);
		expect(camera(before)).toBe(camera(after));
		for (const id of ['coast-road', 'possible-ferry']) {
			expect(route(before, id).getAttribute('stroke-dashoffset')).toBe(route(after, id).getAttribute('stroke-dashoffset'));
			expect(route(before, id).parentElement!.getAttribute('opacity')).toBe(route(after, id).parentElement!.getAttribute('opacity'));
		}
	}
	expect(revisionPicture(1710).innerHTML).toBe(revisionPicture(1919).innerHTML);
	expect(revisionPicture(2010).innerHTML).toBe(revisionPicture(2129).innerHTML);
	expect(revisionPicture(3930, mapWideComparison, 60).innerHTML).toBe(revisionPicture(1965).innerHTML);
});
