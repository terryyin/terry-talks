import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RemotionRoot } from '../../src/Root';

type Registration = {
	id: string;
	component: React.ComponentType;
	defaultProps?: Record<string, unknown>;
	durationInFrames: number;
	fps: number;
	width: number;
	height: number;
};
type SequenceCue = { from: number; durationInFrames: number; name?: string };
type Transport = {
	frame: number;
	config: Omit<Registration, 'component' | 'defaultProps'>;
	registrations: Registration[];
	sequences: SequenceCue[];
};

// Only Remotion's registration, clock and media boundaries are replaced.
// Root, the chosen composition, scenes, house and caption consumers all run.
jest.mock('remotion', () => {
	const React = jest.requireActual<typeof import('react')>('react');
	const offset = React.createContext(0);
	const transport: Transport = {
		frame: 0,
		config: { id: '', durationInFrames: 2580, fps: 30, width: 1080, height: 1080 },
		registrations: [],
		sequences: [],
	};
	return {
		...jest.requireActual('remotion'),
		__jitTestTransport: transport,
		Composition: (entry: Registration) => { transport.registrations.push(entry); return null; },
		Folder: ({ children }: React.PropsWithChildren) => <>{children}</>,
		Sequence: ({ from = 0, durationInFrames = Infinity, name, children }: React.PropsWithChildren<{ from?: number; durationInFrames?: number; name?: string }>) => {
			const absoluteFrom = React.useContext(offset) + from;
			transport.sequences.push({ from: absoluteFrom, durationInFrames, name });
			if (transport.frame < absoluteFrom || transport.frame >= absoluteFrom + durationInFrames) return null;
			return <offset.Provider value={absoluteFrom}>{children}</offset.Provider>;
		},
		useCurrentFrame: () => transport.frame - React.useContext(offset),
		useVideoConfig: () => transport.config,
		Img: (props: React.ComponentProps<'img'>) => React.createElement('img', props),
		Audio: ({ src }: { src: string }) => React.createElement('audio', { src }),
		OffthreadVideo: (props: React.ComponentProps<'video'>) => React.createElement('video', props),
		Freeze: ({ frame, children }: React.PropsWithChildren<{ frame: number }>) => <div data-freeze-frame={frame}>{children}</div>,
	};
});

const transport = (jest.requireMock('remotion') as { __jitTestTransport: Transport }).__jitTestTransport;
export const registerFilms = () => {
	transport.registrations = [];
	renderToStaticMarkup(<RemotionRoot />);
};
export const registration = (id: string): Registration => {
	const matching = transport.registrations.filter((entry) => entry.id === id);
	expect(matching).toHaveLength(1);
	return matching[0];
};
export const filmAt = (id: string, seconds: number) => {
	const { component: Component, defaultProps, ...config } = registration(id);
	transport.config = config;
	transport.frame = Math.round(seconds * config.fps);
	transport.sequences = [];
	const picture = document.createElement('div');
	picture.innerHTML = renderToStaticMarkup(<Component {...defaultProps} />);
	return { picture, sequences: [...transport.sequences] };
};
export const jitAt = (seconds: number) => filmAt('TPSAndAIJITFilm', seconds);
export const normalized = (text: string | null) => text?.replace(/\s+/g, ' ').trim();
