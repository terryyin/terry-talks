import React from 'react';
import { Art, InkPath, palette, sans, serif, Shot, useSeconds } from './Frame';
import { progress, sceneById } from './film';

export const ClosingPicture: React.FC<{ seconds: number }> = ({ seconds }) => {
	const closing = sceneById('closing');
	const credits = seconds >= closing.creditStart!;
	return <>
		<Art file="closing-crane-aloft.png" style={{ left: 0, top: 207, width: 1080, height: 608, opacity: progress(seconds, closing.start, 1.4), clipPath: `inset(0 ${100 * (1 - progress(seconds, closing.start, 1.5))}% 0 0)` }} />
		<div style={{ position: 'absolute', left: 86, top: 125, fontFamily: serif, fontSize: 88, lineHeight: 1.1, letterSpacing: -3, opacity: progress(seconds, closing.start, 1.2) }}>{closing.creditLines![0].split(' and ')[0]}<br />and Trust</div>
		<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}><InkPath d="M96 421 C220 463 379 371 539 339" amount={progress(seconds, closing.start, 2.8)} width={4} opacity={0.55} /></svg>
		{credits && <div data-testid="film-credits" style={{ position: 'absolute', left: 80, right: 80, top: 861, fontFamily: sans, textAlign: 'center', color: palette.gray, opacity: progress(seconds, closing.creditStart!, 0.5) }}><div style={{ fontSize: 54, marginBottom: 10 }}>{closing.creditLines![1]}</div><div style={{ fontSize: 42 }}>{closing.creditLines![2]}</div></div>}
	</>;
};
export const Closing: React.FC = () => { const seconds = useSeconds('closing'); return <Shot seconds={seconds} id="closing"><ClosingPicture seconds={seconds} /></Shot>; };
