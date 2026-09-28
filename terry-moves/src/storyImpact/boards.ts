import {
	messyProduct,
	Pose,
	productOverTime,
	productSpace,
	storyFlies,
	storyIsFuzzy,
	storySplashes,
	storyWishes,
} from './scene';

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
	{
		caption: 'A story is romantic: a wish for a better world.',
		pose: storyWishes(),
	},
	{
		caption: 'It\'s fuzzy. It doesn\'t care about our boundaries.',
		pose: storyIsFuzzy(),
	},
	{
		caption: 'It carries an impact we want in the world…',
		pose: storyFlies(),
	},
	{
		caption: '…and it makes an impact on the product: SPLAT!',
		pose: storySplashes(),
	},
	{
		caption: 'Behavior gets messy. Structure wobbles.',
		pose: messyProduct(),
	},
];

export const boardAt = (frame: number): Board =>
	boards[Math.max(0, Math.min(boards.length - 1, Math.floor(frame)))];
