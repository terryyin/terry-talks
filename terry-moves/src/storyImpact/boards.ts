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
import { assimilateEndJudgment, assimilateEndOutline, focusBoard, wobbleEndOutline, withOutline } from './focus';
import { assimilating, coherentProduct, customerHasIdea, structureMapsDomain, testsGuardBehavior, ideaInBacklog, readyForNext, storyInHistory } from './assimilation';

export type Board = {
	name: string; // the film beat that ends on this board
	caption: string;
	pose: Pose;
};

export const boards: Board[] = [
	{
		name: 'space',
		caption: 'A product is a space: what it does × how it\'s built.',
		pose: productSpace(),
	},
	{
		name: 'time',
		caption: 'It moves through Time. The backlog holds stories waiting their turn.',
		pose: productOverTime(),
	},
	{
		name: 'wish',
		caption: 'A story is romantic: a wish for a better world.',
		pose: storyWishes(),
	},
	{
		name: 'focus',
		caption: 'It\'s focused on customer value.',
		pose: focusBoard(),
	},
	{
		name: 'fuzzy',
		caption: 'It\'s fuzzy. It doesn\'t care about our boundaries.',
		pose: storyIsFuzzy(),
	},
	{
		name: 'flight',
		caption: 'It carries an impact we want in the world…',
		pose: storyFlies(),
	},
	{
		name: 'splat',
		caption: '…and it makes an impact on the product: SPLAT!',
		pose: storySplashes(),
	},
	{
		name: 'wobble',
		caption: 'Behavior gets messy. Structure wobbles.',
		pose: withOutline(messyProduct(), wobbleEndOutline()),
	},
	{
		name: 'assimilate',
		caption: 'Developers assimilate the splash…',
		pose: assimilateEndJudgment(withOutline(assimilating(), assimilateEndOutline())),
	},
	{
		name: 'coherent',
		caption: '…into a coherent product, changed where it matters. No scars.',
		pose: coherentProduct(),
	},
	{
		name: 'tests',
		caption: 'Judgment spent: tests guard what it does…',
		pose: testsGuardBehavior(),
	},
	{
		name: 'domain',
		caption: '…and how it\'s built maps the domain.',
		pose: structureMapsDomain(),
	},
	{
		name: 'customer',
		caption: 'A customer feels the impact… and gets a new idea!',
		pose: customerHasIdea(),
	},
	{
		name: 'new-idea',
		caption: 'New ideas join the backlog, and it\'s reordered.',
		pose: ideaInBacklog(),
	},
	{
		name: 'history',
		caption: 'The spent story goes to history. Available, but out of the way.',
		pose: storyInHistory(),
	},
	{
		name: 'next',
		caption: 'Ready for the next story.',
		pose: readyForNext(),
	},
];

export const boardNamed = (name: string): Board => {
	const board = boards.find((b) => b.name === name);
	if (!board) throw new Error(`No board named ${name}`);
	return board;
};

export const boardAt = (frame: number): Board =>
	boards[Math.max(0, Math.min(boards.length - 1, Math.floor(frame)))];
