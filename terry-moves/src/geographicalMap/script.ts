import { MapCamera, MapDirection, MapFrame, MapGeography, MapPoint } from './direction';

// Locally authored fictional geography, in map units (not latitude/longitude).
// The coast opens northward. Land wraps around the south of the bay; both road
// endpoints are the town markers themselves, so no unseen access leg is implied.
const westhaven: MapPoint = { x: 264, y: 240 };
const eastmere: MapPoint = { x: 736, y: 240 };
const westLanding: MapPoint = { x: 324, y: 278 };
const eastLanding: MapPoint = { x: 676, y: 278 };

const coast: MapPoint[] = [
	{ x: 310, y: -160 }, { x: 314, y: -30 }, { x: 284, y: 70 }, { x: 270, y: 135 },
	{ x: 289, y: 205 }, westLanding, { x: 339, y: 350 }, { x: 367, y: 399 },
	{ x: 421, y: 434 }, { x: 475, y: 450 }, { x: 521, y: 450 }, { x: 579, y: 434 },
	{ x: 633, y: 399 }, { x: 661, y: 350 }, eastLanding, { x: 711, y: 205 },
	{ x: 730, y: 135 }, { x: 716, y: 70 }, { x: 686, y: -30 }, { x: 690, y: -160 },
];

export const fictionalBay: MapGeography = {
	coastline: coast,
	land: [...coast, { x: 1300, y: -160 }, { x: 1300, y: 900 }, { x: -300, y: 900 }, { x: -300, y: -160 }],
	water: { name: 'Hollow Bay', labelPosition: { x: 500, y: 270 } },
	places: [
		{ id: 'westhaven', name: 'Westhaven', position: westhaven, labelOffset: { x: 0, y: -46 } },
		{ id: 'eastmere', name: 'Eastmere', position: eastmere, labelOffset: { x: 0, y: -46 } },
	],
	routes: [{
		id: 'coast-road', name: 'Coastal road', color: '#b65a3d',
		points: [
			westhaven, { x: 235, y: 300 }, { x: 251, y: 372 }, { x: 283, y: 438 },
			{ x: 330, y: 490 }, { x: 407, y: 531 }, { x: 500, y: 550 }, { x: 593, y: 531 },
			{ x: 670, y: 490 }, { x: 717, y: 438 }, { x: 749, y: 372 }, { x: 765, y: 300 },
			eastmere,
		],
		labelPosition: { x: 500, y: 590 }, labelOffset: { x: 0, y: 0 },
	}, {
		id: 'possible-ferry', name: 'Possible ferry', color: '#287c91',
		// A candidate journey between the same towns, including the land access
		// legs. The two shore waypoints are landings, not new destinations.
		points: [
			westhaven, { x: 285, y: 258 }, westLanding,
			eastLanding, { x: 715, y: 258 }, eastmere,
		],
		waypoints: [westLanding, eastLanding],
		labelPosition: { x: 500, y: 345 }, labelOffset: { x: 0, y: 0 },
	}],
};

const overview: MapCamera = { center: { x: 500, y: 300 }, scale: 1 };
const journeyDetail: MapCamera = { center: { x: 500, y: 365 }, scale: 1.16 };
const frame = (camera: MapCamera, progress: number): MapFrame => ({ camera, routes: { 'coast-road': { progress, opacity: 1 } } });

// This is a coherent opening excerpt, not yet the complete argument. The
// script owns geography, copy, camera endpoints, reveal and reading holds.
export const mapOpening: MapDirection = {
	geography: fictionalBay,
	cues: [
		{
			id: 'locate-the-towns', moveSeconds: 0, holdSeconds: 5,
			from: frame(overview, 0), to: frame(overview, 0),
			copy: { eyebrow: 'A FICTIONAL BAY', headline: ['Two towns.', 'Across one bay.'], footer: 'FIRST PRINCIPLES · OPENING' },
		},
		{
			id: 'follow-the-coast', moveSeconds: 5, holdSeconds: 4,
			from: frame(overview, 0), to: frame(journeyDetail, 1),
			copy: { eyebrow: 'A FICTIONAL BAY', headline: ['The familiar way', 'follows the coast.'], footer: 'FIRST PRINCIPLES · OPENING' },
		},
	],
};

const crossingDetail: MapCamera = { center: { x: 500, y: 300 }, scale: 1.08 };
const comparison: MapCamera = { center: { x: 500, y: 325 }, scale: 1.12 };
const baselineFrame = (camera: MapCamera, ferryProgress = 0, ferryOpacity = 0, waterLabelOpacity = 1): MapFrame => ({
	camera,
	routes: {
		'coast-road': { progress: 1, opacity: 1 },
		'possible-ferry': { progress: ferryProgress, opacity: ferryOpacity },
	},
	waterLabelOpacity,
});
const baselineCopy = (headline: string[], supporting?: string[]) => ({
	eyebrow: 'A FICTIONAL BAY', headline, supporting, footer: 'FIRST PRINCIPLES',
});

// Full argument, sampled through the same timeline and renderer as the opening.
// Route reveal illustrates an option; it is not a vehicle or travel-time race.
export const mapBaseline: MapDirection = {
	geography: fictionalBay,
	cues: [
		...mapOpening.cues.map((cue) => ({ ...cue, copy: baselineCopy(cue.copy.headline) })),
		{
			id: 'question-the-inheritance', moveSeconds: 0, holdSeconds: 6,
			from: baselineFrame(journeyDetail), to: baselineFrame(journeyDetail),
			copy: baselineCopy(['Follow the road?', 'Or reach Eastmere?']),
		},
		{
			id: 'name-the-goal', moveSeconds: 2, holdSeconds: 4,
			from: baselineFrame(journeyDetail), to: baselineFrame(crossingDetail),
			copy: baselineCopy(['The goal:', 'Get people to Eastmere.']),
		},
		{
			id: 'consider-water', moveSeconds: 0, holdSeconds: 5,
			from: baselineFrame(crossingDetail), to: baselineFrame(crossingDetail),
			copy: baselineCopy(['Water.'], ['How could we cross it?']),
		},
		{
			id: 'consider-distance', moveSeconds: 0, holdSeconds: 5,
			from: baselineFrame(crossingDetail), to: baselineFrame(crossingDetail),
			copy: baselineCopy(['Distance.'], ['How far does each option take us?']),
		},
		{
			id: 'consider-capacity', moveSeconds: 0, holdSeconds: 5,
			from: baselineFrame(crossingDetail), to: baselineFrame(crossingDetail),
			copy: baselineCopy(['Capacity.'], ['How many people must it carry?']),
		},
		{
			id: 'consider-transport', moveSeconds: 1, holdSeconds: 4,
			from: baselineFrame(crossingDetail), to: baselineFrame(crossingDetail, 0, 0, 0),
			copy: baselineCopy(['Available transport.'], ['What can we actually use?']),
		},
		{
			id: 'reveal-possible-ferry', moveSeconds: 4, holdSeconds: 5,
			from: baselineFrame(crossingDetail, 0, 0, 0), to: baselineFrame(crossingDetail, 1, 1, 0),
			copy: baselineCopy(['Could a ferry', 'be another option?']),
		},
		{
			id: 'compare-the-options', moveSeconds: 2, holdSeconds: 7,
			from: baselineFrame(crossingDetail, 1, 1, 0), to: baselineFrame(comparison, 1, 1, 0),
			copy: baselineCopy(['Compare the options.'], ['A shorter line alone', 'does not settle the choice.']),
		},
		{
			id: 'return-to-first-principles', moveSeconds: 3, holdSeconds: 4,
			from: baselineFrame(comparison, 1, 1, 0), to: baselineFrame(overview, 1, 1, 0),
			copy: baselineCopy(['Start with what', 'must be true.']),
		},
		{
			id: 'reconsider-the-inheritance', moveSeconds: 0, holdSeconds: 6,
			from: baselineFrame(overview, 1, 1, 0), to: baselineFrame(overview, 1, 1, 0),
			copy: baselineCopy(['Reconsider what', "we've inherited."]),
		},
	],
};

// A saved take: widen the comparison without changing its geography, copy or
// clock. Carry the held camera into the next cue so the return has no jump.
const wideComparison: MapCamera = { center: { x: 500, y: 300 }, scale: 0.88 };
export const mapWideComparison: MapDirection = {
	...mapBaseline,
	cues: mapBaseline.cues.map((cue) => {
		if (cue.id === 'compare-the-options') return { ...cue, to: { ...cue.to, camera: wideComparison } };
		if (cue.id === 'return-to-first-principles') return { ...cue, from: { ...cue.from, camera: wideComparison } };
		return cue;
	}),
};
