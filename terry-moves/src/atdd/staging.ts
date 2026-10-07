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
};

// Edit this scene data, then preview/render the existing ATDD compositions.
// Sheets are placed on the authored circumference; their directions and order
// belong to the scenario, independently of their angle and drawn size.
export const staging: ATDDStaging = {
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
};
