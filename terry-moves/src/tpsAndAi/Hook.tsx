import React from 'react';
import { Art, InkPath, palette, serif, Shot, useSeconds } from './Frame';
import { cue, progress, sceneById } from './film';

export const HookPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<Art file="cover-crane-released.png" style={{ left: 0, top: 204, width: 1080, height: 608, opacity: progress(seconds, sceneById('hook').start, 1.5), clipPath: `inset(0 ${100 * (1 - progress(seconds, sceneById('hook').start, 1.4))}% 0 0)` }} />
	<div style={{ position: 'absolute', left: 86, top: 114, fontFamily: serif, fontSize: 88, lineHeight: 1.05, letterSpacing: -3, opacity: progress(seconds, sceneById('hook').start + 0.1, 1) }}>
		{seconds < cue('hook', 1) ? <>Freedom<br />and Trust</> : <>More free?</>}
	</div>
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}>
		{[0, 1, 2, 3].map((i) => <g key={i} opacity={0.28 * progress(seconds, sceneById('hook').start + 1.1 + i * 0.8, 0.8)} transform={`translate(${105 + i * 54} ${590 - i * 16}) rotate(${-9 + i * 4})`} stroke={palette.gray} strokeWidth="3" fill="none"><path d="M0 0 L77 2 L79 88 L-2 86 Z M14 24 L57 23 M14 40 L57 39 M14 56 L48 56" /></g>)}
		<InkPath d="M88 407 C173 416 270 405 346 399" amount={progress(seconds, cue('hook', 1), 1.1)} width={6} />
	</svg>
</>;
export const Hook: React.FC = () => { const seconds = useSeconds('hook'); return <Shot seconds={seconds} id="hook"><HookPicture seconds={seconds} /></Shot>; };
