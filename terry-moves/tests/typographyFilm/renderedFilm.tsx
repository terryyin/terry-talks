import { renderToStaticMarkup } from 'react-dom/server';
import { TypeDirection } from '../../src/typographyFilm/direction';
import { TypographyFilm } from '../../src/typographyFilm/TypographyFilm';

type Registration = {
	id: string;
	component: typeof TypographyFilm;
	defaultProps: { direction: TypeDirection };
	durationInFrames: number;
	fps: number;
	width: number;
	height: number;
};
type Transport = { frame: number; fps: number; registrations: Registration[] };

// Replace only Remotion's clock and registration. The authored script,
// shared beat clock, registered film and picture renderer all execute.
jest.mock('remotion', () => {
	const transport: Transport = { frame: 0, fps: 30, registrations: [] };
	return {
		...jest.requireActual('remotion'),
		__typeTransport: transport,
		Composition: (entry: Registration) => { transport.registrations.push(entry); return null; },
		useCurrentFrame: () => transport.frame,
		useVideoConfig: () => ({ fps: transport.fps }),
	};
});

export const transport = (jest.requireMock('remotion') as { __typeTransport: Transport }).__typeTransport;
export const picture = (direction: TypeDirection, frame: number, fps = 30) => {
	transport.frame = frame;
	transport.fps = fps;
	const page = document.createElement('div');
	page.innerHTML = renderToStaticMarkup(<TypographyFilm direction={direction} />);
	return page;
};
export const group = (page: HTMLElement, id: string) => page.querySelector<HTMLElement>(`[data-type-group="${id}"]`)!;
export const passage = (page: HTMLElement) => page.querySelector('[data-passage]')!.getAttribute('data-passage');
