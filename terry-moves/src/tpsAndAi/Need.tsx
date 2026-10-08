import React from 'react';
import { Art, InkPath, Shot, useSeconds } from './Frame';
import { cue, progress } from './film';
import { FutureNeeds, TrainResult } from './Customer';

export const NeedPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<Art file="pull-customer-need.png" style={{ left: 58, top: 190, width: 964, height: 570 }} />
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}><InkPath d="M567 494 C597 451 641 382 597 318 C561 267 399 265 306 233" amount={progress(seconds, cue('need', 1) - 1.4, 2.4)} width={4} /></svg>
	<TrainResult seconds={seconds} />
	<FutureNeeds seconds={seconds} />
</>;
export const Need: React.FC = () => { const seconds = useSeconds('need'); return <Shot seconds={seconds} id="need"><NeedPicture seconds={seconds} /></Shot>; };
