import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RemotionRoot } from '../../src/Root';
import { SharedRhythmFilmProps, SharedRhythmFilm } from '../../src/musicAndSound/SharedRhythmFilm';

type Registration = {
	id: string;
	component: typeof SharedRhythmFilm;
	defaultProps: SharedRhythmFilmProps;
	durationInFrames: number;
	fps: number;
	width: number;
	height: number;
	calculateMetadata: (input: { props: SharedRhythmFilmProps }) => { durationInFrames: number };
};
type Transport = { frame: number; fps: number; registrations: Registration[] };

// Substitute only transport, registration and browser audio playback. The
// registered direction, saved-score selection/guard and actual SVG execute.
jest.mock('remotion', () => {
	const React = jest.requireActual<typeof import('react')>('react');
	const transport: Transport = { frame: 0, fps: 30, registrations: [] };
	return {
		...jest.requireActual('remotion'),
		__rhythmTransport: transport,
		Composition: (entry: Registration) => { transport.registrations.push(entry); return null; },
		Folder: ({ children }: React.PropsWithChildren) => <>{children}</>,
		useCurrentFrame: () => transport.frame,
		useVideoConfig: () => ({ fps: transport.fps }),
		Audio: ({ src }: { src: string }) => React.createElement('audio', { src }),
	};
});

const transport = (jest.requireMock('remotion') as { __rhythmTransport: Transport }).__rhythmTransport;
export const registeredExcerpt = () => {
	transport.registrations = [];
	renderToStaticMarkup(<RemotionRoot />);
	const selected = transport.registrations.filter((entry) => entry.id === 'SharedRhythmExcerpt');
	if (selected.length !== 1) throw new Error(`Expected one registered rhythm excerpt, found ${selected.length}.`);
	return selected[0];
};
export const excerptPicture = (frame: number, props = registeredExcerpt().defaultProps) => {
	const { component: Film, fps } = registeredExcerpt();
	transport.frame = frame;
	transport.fps = fps;
	const page = document.createElement('div');
	page.innerHTML = renderToStaticMarkup(<Film {...props} />);
	return page;
};
