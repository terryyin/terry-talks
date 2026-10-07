export type CircleStep = 'given' | 'selection' | 'update' | 'then' | 'finishing' | 'finished';
export type TreeNodeId = 'result' | 'front' | 'back' | 'frontDetail' | 'frontSibling' | 'backSibling' | 'backDetail' | 'backLeft' | 'backRight';
export type TreeBox = { x: number; y: number; width: number; height: number };

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
	tree: {
		nodes: Record<TreeNodeId, TreeBox>;
		lanes: { branchInset: number; frontDetailInset: number; internalDetailInset: number; frontReturnDrop: number };
	};
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
	tree: {
		nodes: {
			result: { x: 540, y: 245, width: 240, height: 88 },
			front: { x: 360, y: 410, width: 260, height: 80 },
			back: { x: 710, y: 400, width: 230, height: 80 },
			frontDetail: { x: 265, y: 568, width: 110, height: 68 },
			frontSibling: { x: 440, y: 568, width: 110, height: 68 },
			backSibling: { x: 610, y: 570, width: 110, height: 68 },
			backDetail: { x: 790, y: 575, width: 120, height: 68 },
			backLeft: { x: 685, y: 735, width: 105, height: 68 },
			backRight: { x: 865, y: 746, width: 105, height: 68 },
		},
		lanes: { branchInset: 15, frontDetailInset: 20, internalDetailInset: 10, frontReturnDrop: 53 },
	},
};
