import React from 'react';
import { Art, InkPath, palette, Shot, useSeconds } from './Frame';
import { cue, progress, sceneById } from './film';

export const BurdenPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<Art file="constrained-by-what-they-built.png" style={{ left: 43, top: 35, width: 994, height: 746, maskImage: 'linear-gradient(to bottom, transparent, black 7%, black 90%, transparent)' }} />
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}>
		{Array.from({ length: 9 }, (_, i) => <g key={i} opacity={0.55 * progress(seconds, sceneById('burden').start + 0.5 + i * 0.78)} transform={`translate(${120 + i % 3 * 55} ${140 + Math.floor(i / 3) * 74 - progress(seconds, sceneById('burden').start + 1 + i * 0.7, 1) * 18}) rotate(${i % 2 === 0 ? -12 : 8})`} fill={palette.paper} stroke={palette.gray} strokeWidth="3"><path d="M0 0 L66 1 L68 75 L-2 74 Z" /><path d="M11 22 L50 23 M11 38 L48 39 M11 54 L38 55" fill="none" /></g>)}
		<InkPath d="M333 426 C424 456 423 566 586 642 C709 702 822 636 953 555" amount={progress(seconds, cue('burden', 2), 2.2)} opacity={0.72} width={5} />
		<InkPath d="M930 563 L955 554 L946 577" amount={progress(seconds, cue('burden', 3), 0.8)} width={5} />
	</svg>
</>;
export const Burden: React.FC = () => { const seconds = useSeconds('burden'); return <Shot seconds={seconds} id="burden"><BurdenPicture seconds={seconds} /></Shot>; };
