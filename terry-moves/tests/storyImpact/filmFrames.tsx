import { render } from '@testing-library/react';
import { fullFilm } from '@/storyImpact/fullFilm';
import { StoryImpactScene } from '@/storyImpact/StoryImpactScene';

const { beatRange, captionAt, poseAt } = fullFilm;

export const framesOf = (name: string) => {
	const { from, durationInFrames: frames } = beatRange(name);
	return Array.from({ length: frames }, (_, i) => from + i);
};
export const lastFrame = (name: string) => {
	const { from, durationInFrames: frames } = beatRange(name);
	return from + frames - 1;
};

export const renderFrame = (f: number) => render(<StoryImpactScene pose={poseAt(f)} caption={captionAt(f)} />);
