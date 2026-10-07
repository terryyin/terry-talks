import type { ATDDStaging } from '../../src/atdd/staging';

// Source c379fd4 geometry, independent of the maintained production default.
export const baselineStaging: ATDDStaging = {
	circle: {
		x: 610, y: 485, radius: 280, sheetScale: 0.9,
		sheets: {
			given: { angle: -90, scale: 1 },
			selection: { angle: -30, scale: 1 },
			update: { angle: 30, scale: 1 },
			then: { angle: 90, scale: 1 },
			finishing: { angle: 150, scale: 1 },
			finished: { angle: 210, scale: 1 },
		},
	},
	backlog: { x: 49, y: 231 },
	localLoop: { offset: { x: 385, y: 300 }, size: 0.75 },
	participants: { scales: [0.78, 0.78, 0.78, 0.78, 0.78] },
};

export const revisedStaging: ATDDStaging = {
	...baselineStaging,
	circle: {
		...baselineStaging.circle,
		x: 575, y: 495, radius: 290, sheetScale: 0.94,
		sheets: {
			...baselineStaging.circle.sheets,
			given: { angle: -95, scale: 1 },
			selection: { angle: -28, scale: 1 },
			update: { angle: 31, scale: 1 },
		},
	},
	backlog: { x: 65, y: 236 },
	localLoop: { offset: { x: 390, y: 295 }, size: 0.75 },
};

export const resizedStaging: ATDDStaging = {
	...revisedStaging,
	circle: { ...revisedStaging.circle, sheets: { ...revisedStaging.circle.sheets, finished: { angle: 210, scale: 1.12 } } },
	participants: { scales: [0.78, 0.78, 0.98, 0.78, 0.78] },
};
