import { baselinePicture, baselineRegistration } from './renderedFilm';
import { attr, onLand, pathPoints } from './mapObservations';
import { mapTimeline } from '../../src/geographicalMap/direction';
import { GeographicalMapFilm } from '../../src/geographicalMap/GeographicalMapFilm';
import { mapBaseline } from '../../src/geographicalMap/script';

const performance = mapTimeline(mapBaseline, 30);
const cueFrame = (cue: string, seconds = 0) => performance.beatRange(cue).from + Math.round(seconds * 30);
const route = (page: HTMLElement, id: string) => page.querySelector(`[data-map-route="${id}"]`)!;
const routeOpacity = (page: HTMLElement, id: string) => attr(route(page, id).parentElement!, 'opacity');
const camera = (page: HTMLElement) => page.querySelector('[data-map-camera]')!.getAttribute('transform');

test('the registered complete baseline asks the goal question and reasons through all four considerations in order', () => {
	expect(baselineRegistration()).toMatchObject({
		id: 'GeographicalMapBaseline', component: GeographicalMapFilm,
		defaultProps: { direction: mapBaseline }, durationInFrames: 2310, fps: 30, width: 1080, height: 1080,
	});
	const question = baselinePicture(cueFrame('question-the-inheritance'));
	expect(question.querySelector('[data-map-headline]')!.textContent).toBe('Follow the road?Or reach Eastmere?');
	expect(baselinePicture(cueFrame('name-the-goal', 3)).querySelector('[data-map-headline]')!.textContent).toBe('The goal:Get people to Eastmere.');
	const considerations = [
		['consider-water', 'Water.', 'How could we cross it?'],
		['consider-distance', 'Distance.', 'How far does each option take us?'],
		['consider-capacity', 'Capacity.', 'How many people must it carry?'],
		['consider-transport', 'Available transport.', 'What can we actually use?'],
	];
	let previous = cueFrame('name-the-goal');
	for (const [cue, headline, supporting] of considerations) {
		const frame = cueFrame(cue, 2);
		expect(frame).toBeGreaterThan(previous);
		previous = frame;
		const page = baselinePicture(frame);
		expect(page.querySelector('[data-map-headline]')!.textContent).toBe(headline);
		expect(page.querySelector('[data-map-supporting]')!.textContent).toBe(supporting);
		expect((page.querySelector('[data-map-supporting]') as HTMLElement).style.fontSize).toBe('44px');
		expect(page.textContent).toContain('A FICTIONAL BAY');
		expect(routeOpacity(page, 'coast-road')).toBe(1);
		expect(routeOpacity(page, 'possible-ferry')).toBe(0);
	}
	expect(question.querySelector('audio,video,img')).toBeNull();
});

test('the possible ferry journey reaches the same towns with drawn land access legs and a crossing between coast landings', () => {
	const page = baselinePicture(cueFrame('reveal-possible-ferry', 6));
	const road = pathPoints(route(page, 'coast-road'));
	const ferry = pathPoints(route(page, 'possible-ferry'));
	const land = pathPoints(page.querySelector('[data-map-land]')!);
	const coast = pathPoints(page.querySelector('[data-map-coast]')!);
	expect(ferry[0]).toEqual(road[0]);
	expect(ferry[ferry.length - 1]).toEqual(road[road.length - 1]);
	const landings = [...page.querySelectorAll('[data-map-waypoint="possible-ferry"]')].map((point) => ({ x: attr(point, 'cx'), y: attr(point, 'cy') }));
	expect(landings).toEqual([ferry[2], ferry[3]]);
	for (const landing of landings) expect(coast).toContainEqual(landing);
	for (const [a, b] of [[ferry[0], ferry[1]], [ferry[1], ferry[2]], [ferry[3], ferry[4]], [ferry[4], ferry[5]]]) {
		for (const t of [0.1, 0.5, 0.9]) expect(onLand({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }, land)).toBe(true);
	}
	for (const t of [0.1, 0.5, 0.9]) expect(onLand({ x: ferry[2].x + (ferry[3].x - ferry[2].x) * t, y: ferry[2].y }, land)).toBe(false);
	expect(page.querySelector('[data-map-route-label="possible-ferry"]')!.textContent).toBe('Possible ferry');
});

test('the candidate reveal leaves the inherited route stationary and hides the bay label before the crossing appears', () => {
	const before = baselinePicture(cueFrame('consider-transport', 2));
	const start = baselinePicture(cueFrame('reveal-possible-ferry'));
	const moving = baselinePicture(cueFrame('reveal-possible-ferry', 2));
	const held = baselinePicture(cueFrame('reveal-possible-ferry', 5));
	expect(routeOpacity(before, 'possible-ferry')).toBe(0);
	expect(route(start, 'possible-ferry').getAttribute('stroke-dashoffset')).toBe('1');
	expect(attr(route(moving, 'possible-ferry'), 'stroke-dashoffset')).toBeGreaterThan(0);
	expect(attr(route(moving, 'possible-ferry'), 'stroke-dashoffset')).toBeLessThan(1);
	expect(routeOpacity(moving, 'possible-ferry')).toBeGreaterThan(0);
	expect(routeOpacity(moving, 'possible-ferry')).toBeLessThan(1);
	expect(route(held, 'possible-ferry').getAttribute('stroke-dashoffset')).toBe('0');
	expect(routeOpacity(held, 'possible-ferry')).toBe(1);
	for (const page of [before, start, moving, held]) {
		expect(page.querySelector('[data-map-water-label]')!.getAttribute('opacity')).toBe('0');
		expect(route(page, 'coast-road').getAttribute('stroke-dashoffset')).toBe('0');
		expect(routeOpacity(page, 'coast-road')).toBe(1);
		expect(route(page, 'coast-road').getAttribute('vector-effect')).toBeNull();
	}
	expect(camera(start)).toBe(camera(held));
	expect(held.querySelector('[data-map-headline]')!.textContent).toBe('Could a ferrybe another option?');
});

test('comparison and final overview retain both options without a measured winner and preserve the exact takeaway', () => {
	const compared = baselinePicture(cueFrame('compare-the-options', 4));
	const returned = baselinePicture(cueFrame('return-to-first-principles', 5));
	const final = baselinePicture(cueFrame('reconsider-the-inheritance', 3));
	expect(compared.querySelector('[data-map-headline]')!.textContent).toBe('Compare the options.');
	expect(compared.querySelector('[data-map-supporting]')!.textContent).toBe('A shorter line alonedoes not settle the choice.');
	expect(returned.querySelector('[data-map-headline]')!.textContent).toBe('Start with whatmust be true.');
	expect(final.querySelector('[data-map-headline]')!.textContent).toBe("Reconsider whatwe've inherited.");
	expect(camera(compared)).not.toBe(camera(returned));
	expect(camera(returned)).toBe(camera(baselinePicture(0)));
	for (const page of [compared, returned, final]) {
		for (const id of ['coast-road', 'possible-ferry']) {
			expect(route(page, id).getAttribute('stroke-dashoffset')).toBe('0');
			expect(routeOpacity(page, id)).toBe(1);
			const label = page.querySelector(`[data-map-route-label="${id}"]`)!;
			expect(label.getAttribute('font-size')).toBe('44');
			expect(attr(label, 'y')).toBeGreaterThan(420);
			expect(attr(label, 'y')).toBeLessThan(944);
		}
		expect([...page.querySelectorAll('[data-map-town-label]')].map((label) => label.textContent)).toEqual(['Westhaven', 'Eastmere']);
		expect(page.textContent).not.toMatch(/\d|faster|cheaper|winner|best/i);
	}
});

test('fresh direct and backward sampling reproduce the complete argument, movement and all cue joins', () => {
	const ranges = mapBaseline.cues.map((cue) => performance.beatRange(cue.id));
	const directFrames = [1440, 0, 2070, 900, 2309];
	const frames = [...new Set([...ranges.flatMap(({ from, durationInFrames }) => [from, from + Math.floor(durationInFrames / 2), from + durationInFrames - 1]), ...directFrames])];
	const forward = new Map(frames.map((frame) => [frame, baselinePicture(frame).innerHTML]));
	for (const frame of [...frames].reverse()) expect(baselinePicture(frame).innerHTML).toBe(forward.get(frame));
	for (const frame of directFrames) expect(baselinePicture(frame).innerHTML).toBe(forward.get(frame));
	for (const { from } of ranges.slice(1)) {
		const before = baselinePicture(from - 1);
		const after = baselinePicture(from);
		expect(camera(before)).toBe(camera(after));
		for (const id of ['coast-road', 'possible-ferry']) {
			expect(route(before, id).getAttribute('stroke-dashoffset')).toBe(route(after, id).getAttribute('stroke-dashoffset'));
			expect(routeOpacity(before, id)).toBe(routeOpacity(after, id));
		}
		expect(before.querySelector('[data-map-water-label]')!.getAttribute('opacity')).toBe(after.querySelector('[data-map-water-label]')!.getAttribute('opacity'));
	}
	expect(mapTimeline(mapBaseline, 60).durationInFrames).toBe(4620);
	expect(baselinePicture(2880, mapBaseline, 60).innerHTML).toBe(baselinePicture(1440).innerHTML);
});

test('authored support copy, framing, water visibility and route names reach the film after every cue is renamed', () => {
	const edited = {
		...mapBaseline,
		geography: { ...mapBaseline.geography, routes: mapBaseline.geography.routes.map((path) => ({ ...path, name: `${path.name} study` })) },
		cues: mapBaseline.cues.map((cue) => ({
			...cue, id: `study-${cue.id}`, copy: { ...cue.copy, supporting: ['Authored question.'] },
			from: { ...cue.from, waterLabelOpacity: 0.4 },
			to: { ...cue.to, waterLabelOpacity: 0.4, camera: { center: { x: 500, y: 320 }, scale: 1.04 } },
		})),
	};
	const original = baselinePicture(cueFrame('compare-the-options', 4));
	const changed = baselinePicture(cueFrame('compare-the-options', 4), edited);
	expect(changed.querySelector('[data-map-cue]')!.getAttribute('data-map-cue')).toBe('study-compare-the-options');
	expect(changed.querySelector('[data-map-supporting]')!.textContent).toBe('Authored question.');
	expect(changed.querySelector('[data-map-route-label="possible-ferry"]')!.textContent).toBe('Possible ferry study');
	expect(changed.querySelector('[data-map-water-label]')!.getAttribute('opacity')).toBe('0.4');
	expect(camera(changed)).not.toBe(camera(original));
	expect(routeOpacity(changed, 'possible-ferry')).toBe(1);
});
