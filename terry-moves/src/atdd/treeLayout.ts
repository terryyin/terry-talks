import { ATDDStaging, TreeBox, TreeNodeId } from './staging';
import { Point, pointOnOutline, roundedLine } from './geometry';

// Identity and uneven hierarchy belong to the argument, not to its staging.
export const treeStructure: { id: TreeNodeId; parent?: TreeNodeId; label: string; needed: boolean }[] = [
	{ id: 'result', label: 'User result', needed: true },
	{ id: 'front', parent: 'result', label: 'Front end', needed: true },
	{ id: 'back', parent: 'result', label: 'Back end', needed: true },
	{ id: 'frontDetail', parent: 'front', label: '', needed: true },
	{ id: 'frontSibling', parent: 'front', label: '', needed: false },
	{ id: 'backSibling', parent: 'back', label: '', needed: false },
	{ id: 'backDetail', parent: 'back', label: '', needed: true },
	{ id: 'backLeft', parent: 'backDetail', label: '', needed: true },
	{ id: 'backRight', parent: 'backDetail', label: '', needed: true },
];

const outline = (box: TreeBox) => [
	{ x: box.x - box.width / 2, y: box.y - box.height / 2 },
	{ x: box.x + box.width / 2, y: box.y - box.height / 2 },
	{ x: box.x + box.width / 2, y: box.y + box.height / 2 },
	{ x: box.x - box.width / 2, y: box.y + box.height / 2 },
];
const port = (box: TreeBox, direction: Point, x = box.x) => pointOnOutline(outline(box), { x, y: box.y }, direction, 0);
const top = (box: TreeBox) => port(box, { x: 0, y: -1 });
const bottom = (box: TreeBox) => port(box, { x: 0, y: 1 });
const right = (box: TreeBox) => port(box, { x: 1, y: 0 });

export const treePose = (staging: ATDDStaging) => {
	const { nodes, lanes } = staging.tree;
	const { result, front, back, frontDetail, backDetail, backLeft, backRight } = nodes;
	const frontLane = { x: front.x - front.width / 2 + lanes.branchInset, y: bottom(front).y - 5 };
	const backLane = { x: back.x + back.width / 2 - lanes.branchInset, y: bottom(back).y - 5 };
	const frontReturnY = bottom(front).y + lanes.frontReturnDrop;
	const frontPort = { x: frontDetail.x - frontDetail.width / 2 + lanes.frontDetailInset, y: frontDetail.y };
	const rootPort = port(result, { x: 0, y: 1 }, result.x - result.width / 3);
	const rootLaneY = (rootPort.y + top(front).y) / 2;
	const backExitY = (bottom(backDetail).y + top(backRight).y) / 2;
	const crossingY = backLane.y;
	const scenario = [rootPort, { x: rootPort.x, y: rootLaneY }, { x: frontLane.x, y: rootLaneY }, frontLane,
		{ x: frontLane.x, y: frontReturnY }, { x: frontPort.x, y: frontReturnY }, frontPort,
		{ x: frontPort.x, y: frontReturnY }, { x: frontLane.x, y: frontReturnY }, frontLane,
		{ x: backLane.x, y: crossingY }, { x: backLane.x, y: backExitY }, { x: backRight.x, y: backExitY }, { x: backRight.x, y: backRight.y }];
	const endToEnd = { x: right(result).x + 183, y: result.y, radius: 29 };
	const internal = { x: right(back).x + 116, y: back.y, radius: 27 };
	const detailX = backDetail.x - lanes.internalDetailInset;
	const detailBottom = port(backDetail, { x: 0, y: 1 }, detailX);
	const leafLaneY = (detailBottom.y + Math.min(top(backLeft).y, top(backRight).y)) / 2;
	return {
		nodes, scenario, endToEnd, internal,
		edges: treeStructure.filter((node) => node.parent).map((node) => {
			const from = bottom(nodes[node.parent!]);
			const to = top(nodes[node.id]);
			const y = (from.y + to.y) / 2;
			return { ...node, d: roundedLine([from, { x: from.x, y }, { x: to.x, y }, to]) };
		}),
		endToEndRoute: roundedLine([right(result), { x: endToEnd.x - endToEnd.radius - 4, y: endToEnd.y }]),
		internalRoutes: [
			roundedLine([right(back), { x: internal.x - internal.radius - 9, y: internal.y }]),
			roundedLine([port(back, { x: 0, y: 1 }, detailX), port(backDetail, { x: 0, y: -1 }, detailX)]),
			...(['backLeft', 'backRight'] as const).map((id) => roundedLine([detailBottom, { x: detailX, y: leafLaneY }, { x: nodes[id].x, y: leafLaneY }, top(nodes[id])])),
		],
	};
};
