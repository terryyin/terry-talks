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
type SequenceCue = { from: number; durationInFrames: number; name?: string; components: unknown[] };
type Transport = {
	frame: number;
	config: Omit<Registration, 'component' | 'defaultProps'>;
	registrations: Registration[];
	sequences: SequenceCue[];
};

// Replace Remotion's registration/player/media boundaries. The Root, selected
// film components, language provider, scene components and caption wiring run.
// Sequence children receive their local frame, as they do in the real player.
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
		__editionTestTransport: transport,
		Composition: (registration: Registration) => { transport.registrations.push(registration); return null; },
		Folder: ({ children }: React.PropsWithChildren) => <>{children}</>,
		Sequence: ({ from = 0, durationInFrames = Infinity, name, children }: React.PropsWithChildren<{ from?: number; durationInFrames?: number; name?: string }>) => {
			const absoluteFrom = React.useContext(offset) + from;
			transport.sequences.push({
				from: absoluteFrom,
				durationInFrames,
				name,
				components: React.Children.toArray(children).map((child) => React.isValidElement(child) ? child.type : typeof child),
			});
			if (transport.frame < absoluteFrom || transport.frame >= absoluteFrom + durationInFrames) return null;
			return <offset.Provider value={absoluteFrom}>{children}</offset.Provider>;
		},
		useCurrentFrame: () => transport.frame - React.useContext(offset),
		useVideoConfig: () => transport.config,
		Img: (props: React.ComponentProps<'img'>) => React.createElement('img', props),
		Audio: ({ src, volume = 1 }: { src: string; volume?: number | ((frame: number) => number) }) => React.createElement('audio', { src, 'data-volume': typeof volume === 'function' ? volume(transport.frame) : volume }),
		OffthreadVideo: (props: React.ComponentProps<'video'>) => React.createElement('video', props),
		Freeze: ({ frame, children }: React.PropsWithChildren<{ frame: number }>) => <div data-freeze-frame={frame}>{children}</div>,
	};
});

const transport = (jest.requireMock('remotion') as { __editionTestTransport: Transport }).__editionTestTransport;
export const registration = (id: string): Registration => {
	const matching = transport.registrations.filter((entry) => entry.id === id);
	expect(matching).toHaveLength(1);
	return matching[0];
};
export const editionAt = (id: string, seconds: number) => {
	const selected = registration(id);
	const { component: Component, defaultProps, ...config } = selected;
	transport.config = config;
	transport.frame = Math.round(seconds * config.fps);
	transport.sequences = [];
	const picture = document.createElement('div');
	picture.innerHTML = renderToStaticMarkup(<Component {...defaultProps} />);
	return { picture, sequences: [...transport.sequences] };
};
export const englishAt = (seconds: number) => editionAt('TPSAndAIFilm', seconds);
export const japaneseAt = (seconds: number) => editionAt('TPSAndAIFilmJa', seconds);
export const chineseAt = (seconds: number) => editionAt('TPSAndAIFilmZhHant', seconds);
export const registerEditions = () => { renderToStaticMarkup(<RemotionRoot />); };
