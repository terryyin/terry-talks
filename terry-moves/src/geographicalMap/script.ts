import { MapCamera, MapDirection, MapFrame, MapGeography, MapPoint } from './direction';

// Locally authored fictional geography, in map units (not latitude/longitude).
// The coast opens northward. Land wraps around the south of the bay; both road
// endpoints are the town markers themselves, so no unseen access leg is implied.
const coast: MapPoint[] = [
	{ x: 310, y: -160 }, { x: 314, y: -30 }, { x: 284, y: 70 }, { x: 270, y: 135 },
	{ x: 289, y: 205 }, { x: 324, y: 278 }, { x: 339, y: 350 }, { x: 367, y: 399 },
	{ x: 421, y: 434 }, { x: 475, y: 450 }, { x: 521, y: 450 }, { x: 579, y: 434 },
	{ x: 633, y: 399 }, { x: 661, y: 350 }, { x: 676, y: 278 }, { x: 711, y: 205 },
	{ x: 730, y: 135 }, { x: 716, y: 70 }, { x: 686, y: -30 }, { x: 690, y: -160 },
];

export const fictionalBay: MapGeography = {
	coastline: coast,
	land: [...coast, { x: 1300, y: -160 }, { x: 1300, y: 900 }, { x: -300, y: 900 }, { x: -300, y: -160 }],
	water: { name: 'Hollow Bay', labelPosition: { x: 500, y: 270 } },
	places: [
		{ id: 'westhaven', name: 'Westhaven', position: { x: 264, y: 240 }, labelOffset: { x: 0, y: -46 } },
		{ id: 'eastmere', name: 'Eastmere', position: { x: 736, y: 240 }, labelOffset: { x: 0, y: -46 } },
	],
	routes: [{
		id: 'coast-road', name: 'Coastal road', color: '#b65a3d',
		points: [
			{ x: 264, y: 240 }, { x: 235, y: 300 }, { x: 251, y: 372 }, { x: 283, y: 438 },
			{ x: 330, y: 490 }, { x: 407, y: 531 }, { x: 500, y: 550 }, { x: 593, y: 531 },
			{ x: 670, y: 490 }, { x: 717, y: 438 }, { x: 749, y: 372 }, { x: 765, y: 300 },
			{ x: 736, y: 240 },
		],
		labelPosition: { x: 500, y: 590 }, labelOffset: { x: 0, y: 0 },
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
