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
	tree: {
		nodes: {
			result: { x: 540, y: 245, width: 240, height: 88 },
			front: { x: 345, y: 410, width: 210, height: 80 },
			back: { x: 735, y: 410, width: 210, height: 80 },
			frontDetail: { x: 265, y: 568, width: 110, height: 68 },
			frontSibling: { x: 440, y: 568, width: 110, height: 68 },
			backSibling: { x: 635, y: 568, width: 110, height: 68 },
			backDetail: { x: 810, y: 568, width: 110, height: 68 },
			backLeft: { x: 720, y: 738, width: 105, height: 68 },
			backRight: { x: 900, y: 738, width: 105, height: 68 },
		},
		lanes: { branchInset: 15, frontDetailInset: 20, internalDetailInset: 10, frontReturnDrop: 53 },
	},
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


export const treeStaging: ATDDStaging = {
	...resizedStaging,
	tree: {
		...baselineStaging.tree,
		nodes: {
			...baselineStaging.tree.nodes,
			front: { x: 360, y: 410, width: 260, height: 80 },
			back: { x: 710, y: 400, width: 230, height: 80 },
			backSibling: { x: 610, y: 570, width: 110, height: 68 },
			backDetail: { x: 790, y: 575, width: 120, height: 68 },
			backLeft: { x: 685, y: 735, width: 105, height: 68 },
			backRight: { x: 865, y: 746, width: 105, height: 68 },
		},
	},
};
