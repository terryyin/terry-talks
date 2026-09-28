import { render } from '@testing-library/react';
import { boardAt, boards } from '@/storyImpact/boards';
import { GRID } from '@/storyImpact/scene';
import { StoryImpactScene } from '@/storyImpact/StoryImpactScene';
import { captionLines } from '@/storyImpact/caption';

describe('StoryImpactStoryboard', () => {
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
		]);
	});

	test('each frame picks its own board', () => {
		expect(boardAt(0)).toBe(boards[0]);
		expect(boardAt(1)).toBe(boards[1]);
	});

	describe('board 1: the product space', () => {
		test('shows the tidy product grid on Behavior and Structure', () => {
			const { getAllByTestId, getByTestId, getByText } = renderBoard(0);
			expect(getAllByTestId('product-cell')).toHaveLength(GRID.columns * GRID.rows);
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
			expect(getAllByTestId('product-cell')).toHaveLength(GRID.columns * GRID.rows);
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
