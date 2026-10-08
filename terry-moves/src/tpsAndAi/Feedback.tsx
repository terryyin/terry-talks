import React from 'react';
import { Art, InkPath, Shot, useSeconds } from './Frame';
import { cue, progress, sceneById } from './film';
import { FutureNeeds, TrainResult } from './Customer';

export const FeedbackPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<Art file="pull-customer-feedback.png" style={{ left: 58, top: 190, width: 964, height: 570 }} />
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}><InkPath d="M661 245 C682 211 835 207 886 247 C916 283 887 330 826 337" amount={progress(seconds, sceneById('feedback').start + 0.3, 2.1)} width={4} /><InkPath d="M897 297 C969 312 1028 395 1015 575 C1008 638 916 684 782 679 C603 670 426 682 283 708" amount={progress(seconds, cue('feedback', 1), 2)} width={4} /></svg>
	<TrainResult seconds={seconds} />
	<FutureNeeds seconds={seconds} />
</>;
export const Feedback: React.FC = () => { const seconds = useSeconds('feedback'); return <Shot seconds={seconds} id="feedback"><FeedbackPicture seconds={seconds} /></Shot>; };
