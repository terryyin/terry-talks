import { render, within } from '@testing-library/react';
import { fullFilm } from '@/storyImpact/fullFilm';
import { StoryImpactScene } from '@/storyImpact/StoryImpactScene';
import { HISTORY_LIP_TOP, historySpot, spentShape } from '@/storyImpact/layout';
import { palette } from '@/storyImpact/scene';

const lastFrame = (name: string) => {
	const range = fullFilm.beatRange(name);
	return range.from + range.durationInFrames - 1;
};

describe('spent stories become ghosts', () => {
	test.each(['history', 'sun-history', 'idea-history'])('%s grows upright and rises before drifting to History', (name) => {
		const range = fullFilm.beatRange(name);
		const ghosts = Array.from({ length: range.durationInFrames }, (_, i) => fullFilm.poseAt(range.from + i).spent).filter((ghost) => ghost !== undefined);
		const start = ghosts[0]!;
		const risen = ghosts.find((ghost) => (ghost!.peel ?? 1) >= 1)!;
		expect(start.peel).toBe(0);
		expect(risen.at.x).toBe(start.at.x);
		expect(risen.at.y).toBeLessThan(start.at.y - 60);
		const floating = ghosts[ghosts.length - 1]!;
		const arrived = fullFilm.poseAt(lastFrame(name)).history!;
		const rest = historySpot(arrived.length, arrived.length - 1, floating.ball.size);
		expect(floating.at.x).toBeCloseTo(rest.x, 0);
		expect(floating.at.y).toBeLessThan(rest.y);
		expect(fullFilm.poseAt(lastFrame(name)).spent).toBeUndefined();
		const { getByTestId, unmount } = render(<StoryImpactScene pose={fullFilm.poseAt(range.from + ghosts.indexOf(risen))} caption="" />);
		const ghost = within(getByTestId('spent-story'));
		expect(ghost.getByTestId('ghost-sheet')).toHaveAttribute('fill', palette.white);
		expect(ghost.getAllByTestId('ghost-eye')).toHaveLength(2);
		ghost.getAllByTestId('ghost-eye').forEach((eye) => expect(eye).toHaveAttribute('fill', palette.ink));
		unmount();
	});

	test('all three spent stories keep their ghost shape and color identity above the History lip', () => {
		const pose = fullFilm.poseAt(lastFrame('idea-history'));
		const { getAllByTestId } = render(<StoryImpactScene pose={pose} caption="" />);
		const historyGhosts = getAllByTestId('history-ball');
		expect(historyGhosts.map((ghost) => ghost.getAttribute('data-id'))).toEqual(['pink', 'sun', 'idea']);
		historyGhosts.forEach((ghost, i) => {
			const ball = pose.history![i];
			expect(within(ghost).getByTestId('story-ghost')).toHaveAttribute('data-color', ball.color);
			expect(Number(within(ghost).getByTestId('story-ghost').getAttribute('opacity'))).toBeLessThan(1);
			expect(within(ghost).getAllByTestId('ghost-eye')).toHaveLength(2);
			// The rounded head and scalloped bottom are both visible above the box front.
			expect(within(ghost).getByTestId('ghost-sheet').getAttribute('d')).toMatch(/C.*L.*Q.*Q.*Q.*Q/s);
			const center = historySpot(pose.history!.length, i, ball.size);
			expect(center.y + spentShape(ball.size).ry + 2.5).toBeLessThan(HISTORY_LIP_TOP);
		});
	});
});
