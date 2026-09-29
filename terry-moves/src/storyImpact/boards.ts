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
import { assimilateEndJudgment, assimilateEndOutline, focusBoard, wobbleEndOutline } from './focus';
import { assimilating, coherentProduct, readyForNext, storyInHistory } from './assimilation';
import { customerValueBeat, IMPACT_SECONDS, impactBeat, newIdeaValueBeat, optionDomainBeat, optionTestsBeat } from './valueBeats';
import { CUSTOMER_SECONDS, NEW_IDEA_SECONDS } from './customerBeats';
import { DOMAIN_SECONDS, TESTS_SECONDS } from './protectBeats';
import { lastFrameAt } from './motion';

// The pose a beat ends on.
const endOf = (beat: (sec: number) => Pose, seconds: number): Pose => beat(lastFrameAt(seconds));

export type Board = {
	name: string; // the film beat that ends on this board
	caption: string;
	pose: Pose;
};

export const boards: Board[] = [
	{
		name: 'space',
		caption: 'a software product is a space: what it does × how it\'s built.',
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
		pose: wobbleEndOutline(messyProduct()),
	},
	{
		name: 'assimilate',
		caption: 'Developers assimilate the splash…',
		pose: assimilateEndJudgment(assimilateEndOutline(assimilating())),
	},
	{
		name: 'coherent',
		caption: '…into a coherent product, changed where it matters.',
		pose: coherentProduct(),
	},
	{
		name: 'impact',
		caption: 'A story\'s goal is an impact, with two values.',
		pose: endOf(impactBeat, IMPACT_SECONDS),
	},
	{
		name: 'customer',
		caption: 'Customer value: people feel the new behavior…',
		pose: endOf(customerValueBeat, CUSTOMER_SECONDS),
	},
	{
		name: 'new-idea',
		caption: '…and bring new ideas. The backlog is reordered.',
		pose: endOf(newIdeaValueBeat, NEW_IDEA_SECONDS),
	},
	{
		name: 'tests',
		caption: 'Option value, unseen by users: judgment spent on tests…',
		pose: endOf(optionTestsBeat, TESTS_SECONDS),
	},
	{
		name: 'domain',
		caption: '…and on a structure that maps the domain.',
		pose: endOf(optionDomainBeat, DOMAIN_SECONDS),
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
