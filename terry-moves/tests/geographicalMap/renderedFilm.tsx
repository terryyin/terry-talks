import { renderToStaticMarkup } from 'react-dom/server';
import { MapDirection } from '../../src/geographicalMap/direction';
import { GeographicalMapFilm, GeographicalMapOpeningComposition } from '../../src/geographicalMap/GeographicalMapFilm';

type Registration = {
	id: string;
	component: typeof GeographicalMapFilm;
	defaultProps: { direction: MapDirection };
	durationInFrames: number;
	fps: number;
	width: number;
	height: number;
};
type Transport = { frame: number; fps: number; registrations: Registration[] };

// Only the clock and registration are substituted. The registered script,
// shared timeline, camera projection, route geometry and SVG all execute.
jest.mock('remotion', () => {
	const transport: Transport = { frame: 0, fps: 30, registrations: [] };
	return {
		...jest.requireActual('remotion'),
		__mapTransport: transport,
		Composition: (entry: Registration) => { transport.registrations.push(entry); return null; },
		useCurrentFrame: () => transport.frame,
		useVideoConfig: () => ({ fps: transport.fps }),
	};
});

export const transport = (jest.requireMock('remotion') as { __mapTransport: Transport }).__mapTransport;
export const registration = () => {
	transport.registrations = [];
	renderToStaticMarkup(<GeographicalMapOpeningComposition />);
	return transport.registrations[0];
};
export const picture = (frame: number, direction = registration().defaultProps.direction, fps = 30) => {
	const { component: Film } = registration();
	transport.frame = frame;
	transport.fps = fps;
	const page = document.createElement('div');
	page.innerHTML = renderToStaticMarkup(<Film direction={direction} />);
	return page;
};
