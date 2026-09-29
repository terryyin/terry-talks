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
import { assimilateEndJudgment, assimilateEndOutline, wobbleEndOutline, withOutline, withValueTag } from './focus';
import { assimilating, coherentProduct, customerHasIdea, structureMapsDomain, testsGuardBehavior, ideaInBacklog, readyForNext, storyInHistory } from './assimilation';

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
		pose: withValueTag(storyWishes(), 1),
	},
	{
		caption: 'It\'s fuzzy. It doesn\'t care about our boundaries.',
		pose: withValueTag(storyIsFuzzy(), 1),
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
		pose: withOutline(messyProduct(), wobbleEndOutline()),
	},
	{
		caption: 'Developers assimilate the splash…',
		pose: assimilateEndJudgment(withOutline(assimilating(), assimilateEndOutline())),
	},
	{
		caption: '…into a coherent product, changed where it matters. No scars.',
		pose: coherentProduct(),
	},
	{
		caption: 'Judgment spent: tests guard what it does…',
		pose: testsGuardBehavior(),
	},
	{
		caption: '…and how it\'s built maps the domain.',
		pose: structureMapsDomain(),
	},
	{
		caption: 'A customer feels the impact… and gets a new idea!',
		pose: customerHasIdea(),
	},
	{
		caption: 'New ideas join the backlog, and it\'s reordered.',
		pose: ideaInBacklog(),
	},
	{
		caption: 'The spent story goes to history. Available, but out of the way.',
		pose: storyInHistory(),
	},
	{
		caption: 'Ready for the next story.',
		pose: readyForNext(),
	},
];

export const boardAt = (frame: number): Board =>
	boards[Math.max(0, Math.min(boards.length - 1, Math.floor(frame)))];
