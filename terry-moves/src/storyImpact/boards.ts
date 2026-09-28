import { Pose, productOverTime, productSpace } from './scene';

export type Board = {
	caption: string;
	pose: Pose;
};

export const boards: Board[] = [
	{
		caption: 'A product is a space: what it does × how it\'s built.',
		pose: productSpace(),
	},
	{
		caption: 'It moves through Time. The backlog holds stories waiting their turn.',
		pose: productOverTime(),
	},
];

export const boardAt = (frame: number): Board =>
	boards[Math.max(0, Math.min(boards.length - 1, Math.floor(frame)))];
