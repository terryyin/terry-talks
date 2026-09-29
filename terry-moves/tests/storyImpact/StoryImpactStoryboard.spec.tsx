import { render } from '@testing-library/react';
import { boardAt, boards } from '@/storyImpact/boards';
import { ballColors, extentOf, splatCells } from '@/storyImpact/scene';
import { StoryImpactScene } from '@/storyImpact/StoryImpactScene';
import { captionLines } from '@/storyImpact/caption';

describe('StoryImpactStoryboard', () => {
	const start = extentOf(boards[0].pose.cells);
	const cellCount = start.columns * start.rows;

	const renderBoard = (index: number) => {
		const board = boards[index];
		return render(<StoryImpactScene pose={board.pose} caption={board.caption} />);
	};

	test('boards carry their captions in reading order', () => {
		const captions = boards.map((_, i) => {
			const { getByTestId, unmount } = renderBoard(i);
			const text = getByTestId('caption').textContent;
			unmount();
			return text;
		});
		expect(captions).toEqual([
			'A product is a space: what it does × how it\'s built.',
			'It moves through Time. The backlog holds stories waiting their turn.',
			'A story is romantic: a wish for a better world.',
			'It\'s focused on customer value.',
			'It\'s fuzzy. It doesn\'t care about our boundaries.',
			'It carries an impact we want in the world…',
			'…and it makes an impact on the product: SPLAT!',
			'Behavior gets messy. Structure wobbles.',
			'Developers assimilate the splash…',
			'…into a coherent product, changed where it matters. No scars.',
			'Judgment spent: tests guard what it does…',
			'…and how it\'s built maps the domain.',
			'A customer feels the impact… and gets a new idea!',
			'New ideas join the backlog, and it\'s reordered.',
			'The spent story goes to history. Available, but out of the way.',
			'Ready for the next story.',
		]);
	});

	test('each frame picks its own board', () => {
		expect(boardAt(0)).toBe(boards[0]);
		expect(boardAt(1)).toBe(boards[1]);
		expect(boardAt(10)).toBe(boards[10]);
	});

	describe('board 1: the product space', () => {
		test('shows the tidy product grid on Behavior and Structure', () => {
			const { getAllByTestId, getByTestId, getByText } = renderBoard(0);
			expect(getAllByTestId('product-cell')).toHaveLength(cellCount);
			expect(getByTestId('behavior-axis')).toBeInTheDocument();
			expect(getByTestId('structure-axis')).toBeInTheDocument();
			expect(getByText('Behavior')).toBeInTheDocument();
			expect(getByText('Structure')).toBeInTheDocument();
		});

		test('has no Time axis and no backlog yet', () => {
			const { queryByTestId, queryAllByTestId } = renderBoard(0);
			expect(queryByTestId('time-axis')).toBeNull();
			expect(queryByTestId('backlog-tray')).toBeNull();
			expect(queryAllByTestId('backlog-ball')).toHaveLength(0);
		});
	});

	describe('board 2: Time and the backlog', () => {
		test('adds the Time axis and a tray of paint balls', () => {
			const { getByTestId, getAllByTestId, getByText } = renderBoard(1);
			expect(getByTestId('time-axis')).toBeInTheDocument();
			expect(getByText('Time')).toBeInTheDocument();
			expect(getByTestId('backlog-tray')).toBeInTheDocument();
			expect(getAllByTestId('backlog-ball').length).toBeGreaterThanOrEqual(3);
			expect(getAllByTestId('product-cell')).toHaveLength(cellCount);
		});
	});
	describe('boards 3–7: the story flies in and splashes', () => {
		const backlogIds = (container: HTMLElement) =>
			Array.from(container.querySelectorAll('[data-testid="backlog-ball"]')).map((b) => b.getAttribute('data-id'));

		test('board 3: the example story leaves the tray and speaks its wish', () => {
			const { getByTestId, getByText, container } = renderBoard(2);
			expect(getByTestId('story-ball')).toHaveAttribute('data-state', 'wishing');
			expect(getByTestId('wish-bubble')).toBeInTheDocument();
			expect(getByText(/split the bill/)).toBeInTheDocument();
			expect(getByTestId('time-axis')).toBeInTheDocument();
			expect(backlogIds(container)).not.toContain('pink');
		});

		test('board 4: the same story looks fuzzy across boundary lines', () => {
			const { getByTestId } = renderBoard(4);
			expect(getByTestId('story-ball')).toHaveAttribute('data-state', 'fuzzy');
			expect(getByTestId('ignored-lines')).toBeInTheDocument();
		});

		test('board 5: the story flies along a trail while the tray no longer holds it', () => {
			const { getByTestId, container } = renderBoard(5);
			expect(getByTestId('story-ball')).toHaveAttribute('data-state', 'flying');
			expect(getByTestId('flight-trail')).toBeInTheDocument();
			expect(backlogIds(container)).not.toContain('pink');
			expect(backlogIds(container).length).toBeGreaterThanOrEqual(3);
		});

		test('board 6: the splat covers at least three cells across rows and columns', () => {
			const { pose } = boards[6];
			const covered = splatCells(pose);
			expect(covered.length).toBeGreaterThanOrEqual(3);
			expect(new Set(covered.map((c) => c.row)).size).toBeGreaterThanOrEqual(2);
			expect(new Set(covered.map((c) => c.col)).size).toBeGreaterThanOrEqual(2);
			const { getByTestId, queryByTestId } = renderBoard(6);
			expect(getByTestId('splat')).toBeInTheDocument();
			expect(queryByTestId('story-ball')).toBeNull();
		});

		test('board 7: cells near the splat are knocked out of line and smeared', () => {
			const { pose } = boards[7];
			const knocked = pose.cells.filter((c) => c.dx !== 0 || c.dy !== 0 || c.rot !== 0);
			expect(knocked.length).toBeGreaterThanOrEqual(3);
			expect(pose.cells.filter((c) => c.rot === 0 && c.dx === 0 && c.dy === 0).length).toBeGreaterThan(0);
			const { getAllByTestId, getByTestId } = renderBoard(7);
			expect(getAllByTestId('cell-smear').length).toBeGreaterThanOrEqual(2);
			expect(getByTestId('wobble-marks')).toBeInTheDocument();
		});
	});

	describe('boards 8–11: assimilated, then the story goes to history', () => {
		const backlogIds = (container: HTMLElement) =>
			Array.from(container.querySelectorAll('[data-testid="backlog-ball"]')).map((b) => b.getAttribute('data-id'));

		test('board 8: cells slide back toward alignment while little paint is left', () => {
			const messy = boards[7].pose.cells;
			const { cells } = boards[8].pose;
			const tilt = (cs: typeof cells) => cs.reduce((sum, c) => sum + Math.abs(c.rot), 0);
			expect(tilt(cells)).toBeLessThan(tilt(messy));
			expect(cells.some((c) => c.rot !== 0)).toBe(true);
			expect(boards[8].pose.splat!.radius).toBeLessThan(boards[7].pose.splat!.radius);
			const { getByTestId, queryByTestId } = renderBoard(8);
			expect(getByTestId('tidy-marks')).toHaveAttribute('data-stage', 'underway');
			expect(queryByTestId('wobble-marks')).toBeNull();
		});

		test('board 9: aligned again, changed where it matters, no scars', () => {
			const first = boards[0].pose.cells;
			const { cells, splat } = boards[9].pose;
			expect(cells).toHaveLength(first.length);
			expect(cells.every((c) => c.dx === 0 && c.dy === 0 && c.rot === 0 && !c.smear)).toBe(true);
			expect(splat).toBeUndefined();
			expect(cells.filter((c) => c.color === ballColors.pink).length).toBeGreaterThanOrEqual(2);
			expect(cells.filter((c) => c.split)).toHaveLength(1);
			const { queryByTestId, queryAllByTestId, getAllByTestId } = renderBoard(9);
			expect(queryByTestId('splat')).toBeNull();
			expect(queryAllByTestId('cell-smear')).toHaveLength(0);
			expect(getAllByTestId('split-cell')).toHaveLength(1);
			expect(getAllByTestId('product-cell')).toHaveLength(cellCount);
		});

		test('board 14: the spent story rests in History, not in the backlog or on the product', () => {
			const { getByTestId, queryByTestId, container } = renderBoard(14);
			expect(backlogIds(container)).not.toContain('pink');
			expect(queryByTestId('story-ball')).toBeNull();
			expect(queryByTestId('splat')).toBeNull();
			expect(getByTestId('history-box')).toContainElement(getByTestId('history-ball'));
			expect(getByTestId('history-ball')).toHaveAttribute('data-id', 'pink');
		});

		test('board 15: a different story waits eagerly at the front of the backlog', () => {
			const { getByTestId, container } = renderBoard(15);
			const [front] = Array.from(container.querySelectorAll('[data-testid="backlog-ball"]'));
			expect(front.getAttribute('data-id')).not.toBe('pink');
			expect(front).toHaveAttribute('data-eager', 'true');
			expect(getByTestId('history-ball')).toHaveAttribute('data-id', 'pink');
		});
	});
});

describe('captionLines', () => {
	test('keeps a short caption on one line', () => {
		expect(captionLines('Short and sweet.')).toEqual(['Short and sweet.']);
	});

	test('breaks after punctuation when both lines fit', () => {
		expect(captionLines('A product is a space: what it does × how it\'s built.')).toEqual([
			'A product is a space:',
			'what it does × how it\'s built.',
		]);
	});

	test('falls back to the most balanced break', () => {
		expect(captionLines('It moves through Time. The backlog holds stories waiting their turn.')).toEqual([
			'It moves through Time. The backlog',
			'holds stories waiting their turn.',
		]);
	});
});
