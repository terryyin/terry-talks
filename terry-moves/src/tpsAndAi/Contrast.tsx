import React from 'react';
import { Art, Heading, palette, Shot, useSeconds } from './Frame';
import { cue, film, progress } from './film';
type PaintingState = 'watching' | 'stopped';
/** Native painting geometry; cover only the screen plane, retaining its frame. */
export const PairedPainting: React.FC<{ state: PaintingState; style?: React.CSSProperties }> = ({ state, style }) => <div data-testid={`paired-${state}`} style={{ position: 'absolute', left: 60, top: 285, width: 960, height: 540, ...style }}>
	<Art file={state === 'watching' ? 'watching-the-loom-watching-the-ai.png' : 'called-by-the-stop.png'} style={{ inset: 0, width: '100%', height: '100%' }} />
	<svg viewBox="0 0 1536 864" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
		<polygon points={state === 'watching' ? '889,545 1252,483 1249,725 889,711' : '889,529 1242,488 1225,752 895,731'} fill="#242420" />
		<g fill={state === 'watching' ? '#d8d2c8' : '#e58b72'} textAnchor="middle" fontFamily="Arial, sans-serif" transform={state === 'watching' ? 'translate(1070 595) skewY(-6)' : 'translate(1063 578) skewY(-4)'}>
			<text y="50" fontSize={state === 'watching' ? 44 : 76} fontWeight="600">{state === 'watching' ? 'CHECKING' : 'STOP'}</text>
		</g>
	</svg>
</div>;
export const ContrastPicture: React.FC<{ seconds: number }> = ({ seconds }) => {
	const dissolve = progress(seconds, cue('contrast', 1) - film.choreography.contrastDissolve / 2, film.choreography.contrastDissolve);
	return <><Heading style={{ color: dissolve < 0.5 ? palette.ink : palette.red }}>{dissolve < 0.5 ? 'Watching…' : 'Called by the stop.'}</Heading><PairedPainting state="watching" style={{ opacity: 1 - dissolve }} /><PairedPainting state="stopped" style={{ opacity: dissolve }} /></>;
};
export const Contrast: React.FC = () => { const seconds = useSeconds('contrast'); return <Shot seconds={seconds} id="contrast"><ContrastPicture seconds={seconds} /></Shot>; };
