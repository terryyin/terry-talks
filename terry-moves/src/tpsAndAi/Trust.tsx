import React from 'react';
import { Art, InkPath, serif, Shot, useSeconds } from './Frame';
import { cue, progress, sceneById } from './film';

export const TrustPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<div style={{ position: 'absolute', left: 90, top: 136, fontFamily: serif, fontSize: 88, lineHeight: 1.12, letterSpacing: -3 }}>Learn<br />together.</div>
	<Art file="takeaways-useful-software.png" style={{ left: 384, top: 24, width: 643, height: 812 }} />
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}><InkPath d="M142 674 C193 742 249 626 357 641 C434 652 463 605 525 559 C587 517 591 444 679 409" amount={progress(seconds, sceneById('trust').start, 2.7)} width={4} /><InkPath d="M704 405 C832 326 928 286 993 178" amount={progress(seconds, cue('trust', 1), 2.2)} width={4} /></svg>
</>;
export const Trust: React.FC = () => { const seconds = useSeconds('trust'); return <Shot seconds={seconds} id="trust"><TrustPicture seconds={seconds} /></Shot>; };
