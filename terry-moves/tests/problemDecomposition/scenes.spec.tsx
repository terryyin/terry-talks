import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProblemDecompositionScene } from '../../src/problemDecomposition/Scene';
import { feedbackCue, queueLayout } from '../../src/problemDecomposition/goals';

// Image loading belongs to the real render proof; this test observes scene content.
jest.mock('remotion', () => ({
	...jest.requireActual('remotion'),
	Img: (props: React.ComponentProps<'img'>) => React.createElement('img', props),
}));

describe('the customer outcome survives feedback and changes of direction', () => {
	const frame = (seconds: number) => renderToStaticMarkup(<ProblemDecompositionScene seconds={seconds} />);

	it('moves payment tracking ahead only when the customer reaction is spoken', () => {
		expect(queueLayout('Unequal shares', feedbackCue - 0.01).left).toBeLessThan(queueLayout('Track payments', feedbackCue - 0.01).left);
		expect(queueLayout('Track payments', feedbackCue + 1.6).left).toBeLessThan(queueLayout('Unequal shares', feedbackCue + 1.6).left);
		expect(frame(feedbackCue + 1.6)).toContain('Who has already paid?');
		for (let elapsed = 0; elapsed <= 1.6; elapsed += 0.025) {
			const first = queueLayout('Unequal shares', feedbackCue + elapsed);
			const second = queueLayout('Track payments', feedbackCue + elapsed);
			// The actual cards are 292 × 128: the moving queue keeps both readable.
			expect(Math.abs(first.left - second.left) >= 292 || Math.abs(first.top - second.top) >= 128).toBe(true);
		}
	});

	it('keeps a working equal split when future work is left unstarted', () => {
		const stopped = frame(59);
		expect(stopped).toContain('Completed · still useful');
		expect(stopped).toContain('Unstarted');
		expect(stopped).toContain('three friends each owe thirty dollars');
	});

	it('shows end-to-end work and the shared customer outcome before returning to the diners', () => {
		const vertical = frame(66.5);
		['Valuable', 'Visible', 'Vertical', 'Screen', 'Service', 'Data'].forEach((word) => expect(vertical).toContain(word));
		expect(frame(70)).toContain('One-piece flow · one shared customer outcome');
		expect(frame(111)).toContain('Choose again.');
		expect(frame(111)).toContain('An idea by Terry Yin');
	});
});
