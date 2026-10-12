import { renderToStaticMarkup } from 'react-dom/server';
import { MapDirection } from '../../src/geographicalMap/direction';
import { GeographicalMapBaselineComposition, GeographicalMapFilm, GeographicalMapOpeningComposition, GeographicalMapWideComparisonComposition } from '../../src/geographicalMap/GeographicalMapFilm';

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
export const registration = (Composition = GeographicalMapOpeningComposition) => {
	transport.registrations = [];
	renderToStaticMarkup(<Composition />);
	return transport.registrations[0];
};
export const baselineRegistration = () => registration(GeographicalMapBaselineComposition);
export const revisionRegistration = () => registration(GeographicalMapWideComparisonComposition);
const registeredPicture = (frame: number, direction: MapDirection, fps: number, entry: Registration) => {
	const { component: Film } = entry;
	transport.frame = frame;
	transport.fps = fps;
	const page = document.createElement('div');
	page.innerHTML = renderToStaticMarkup(<Film direction={direction} />);
	return page;
};
export const picture = (frame: number, direction = registration().defaultProps.direction, fps = 30) => registeredPicture(frame, direction, fps, registration());
export const baselinePicture = (frame: number, direction = baselineRegistration().defaultProps.direction, fps = 30) => registeredPicture(frame, direction, fps, baselineRegistration());
export const revisionPicture = (frame: number, direction = revisionRegistration().defaultProps.direction, fps = 30) => registeredPicture(frame, direction, fps, revisionRegistration());
