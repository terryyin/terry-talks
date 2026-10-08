import React from 'react';
import { Art, InkPath, Shot, useSeconds } from './Frame';
import { cue, progress, sceneById } from './film';
import { FutureNeeds, TrainResult } from './Customer';

export const FeedbackPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<Art file="pull-customer-feedback.png" style={{ left: 58, top: 190, width: 964, height: 570 }} />
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}><InkPath d="M716 337 Q812 320 863 365 Q846 421 782 428" amount={progress(seconds, sceneById('feedback').start + 0.3, 2.1)} width={4} /><InkPath d="M738 431 C803 566 711 616 522 647 C439 661 373 690 283 708" amount={progress(seconds, cue('feedback', 1), 2)} width={4} /></svg>
	<TrainResult seconds={seconds} />
	<FutureNeeds seconds={seconds} />
</>;
export const Feedback: React.FC = () => { const seconds = useSeconds('feedback'); return <Shot seconds={seconds} id="feedback"><FeedbackPicture seconds={seconds} /></Shot>; };
