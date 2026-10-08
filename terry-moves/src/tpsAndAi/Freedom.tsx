import React from 'react';
import { Art, InkPath, palette, serif, Shot, useSeconds } from './Frame';
import { cue, progress, sceneById } from './film';

export const FreedomPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<div style={{ position: 'absolute', left: 85, top: 123, fontFamily: serif, fontSize: 88, lineHeight: 1.1, letterSpacing: -3 }}>Room to think.</div>
	<Art file="jidoka-frees-software-team.png" style={{ left: 30, top: 150, width: 1020, height: 680 }} />
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}>
		<InkPath d="M284 722 C371 796 481 795 546 741 C611 688 664 727 720 712" amount={progress(seconds, sceneById('freedom').start + 0.5, 2.8)} width={4} opacity={0.75} />
		<InkPath d="M173 490 L161 474 L148 484 M179 511 L168 496 L155 506" color={palette.ink} amount={progress(seconds, sceneById('freedom').start, 0.8)} width={3} />
		<InkPath d="M601 346 C724 327 866 335 925 388" amount={progress(seconds, cue('freedom', 1), 2.1)} color={palette.gray} width={2} opacity={0.5} />
		<InkPath d="M684 689 Q708 680 731 686" amount={progress(seconds, cue('freedom', 2), 0.9)} width={5} />
	</svg>
</>;
export const Freedom: React.FC = () => { const seconds = useSeconds('freedom'); return <Shot seconds={seconds} id="freedom"><FreedomPicture seconds={seconds} /></Shot>; };
