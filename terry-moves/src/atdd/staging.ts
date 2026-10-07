export type CircleStep = 'given' | 'selection' | 'update' | 'then' | 'finishing' | 'finished';

export type ATDDStaging = {
	circle: {
		x: number;
		y: number;
		radius: number;
		sheetScale: number;
		sheets: Record<CircleStep, { angle: number; scale: number }>;
	};
	backlog: { x: number; y: number };
	localLoop: { offset: { x: number; y: number }; size: number };
	participants: { scales: number[] };
};

// Edit this scene data, then preview/render the existing ATDD compositions.
// Sheets are placed on the authored circumference; their directions and order
// belong to the scenario, independently of their angle and drawn size.
export const staging: ATDDStaging = {
	circle: {
		x: 575, y: 495, radius: 290, sheetScale: 0.94,
		sheets: {
			given: { angle: -95, scale: 1 },
			selection: { angle: -28, scale: 1 },
			update: { angle: 31, scale: 1 },
			then: { angle: 90, scale: 1 },
			finishing: { angle: 150, scale: 1 },
			finished: { angle: 210, scale: 1.12 },
		},
	},
	backlog: { x: 65, y: 236 },
	localLoop: { offset: { x: 390, y: 295 }, size: 0.75 },
	participants: { scales: [0.78, 0.78, 0.98, 0.78, 0.78] },
};
