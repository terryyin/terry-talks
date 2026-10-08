import React from 'react';
import { InkPath, palette, serif } from './Frame';
import { cue, customerStateAt, progress, sceneById } from './film';

export const TrainResult: React.FC<{ seconds: number }> = ({ seconds }) => {
	const state = customerStateAt(seconds);
	return <div data-testid="train-result" data-complete={state.trainComplete} style={{ position: 'absolute', top: 92, left: 90, right: 90 }}>
		<div style={{ fontFamily: serif, fontSize: state.trainComplete ? 70 : 76, letterSpacing: -2 }}>{state.trainComplete ? 'Next train' : 'Find the next train'}</div>
		{state.trainComplete && <div style={{ position: 'absolute', top: -20, right: 0, fontFamily: serif, fontSize: 104, letterSpacing: -3, color: palette.red }}>22:45</div>}
		<svg viewBox="0 0 900 70" style={{ width: 900, height: 70 }}><InkPath d="M2 37 C225 31 555 40 897 34" amount={progress(seconds, state.trainComplete ? cue('need', 1) : sceneById('need').start, 1.1)} width={4} color={state.trainComplete ? palette.red : palette.gray} /></svg>
	</div>;
};

export const FutureNeeds: React.FC<{ seconds: number }> = ({ seconds }) => {
	const state = customerStateAt(seconds);
	return <>
		<div data-testid="future-route" data-started={state.route.started} data-next={state.next === 'Step-free route'} style={{ position: 'absolute', left: state.route.x, top: state.route.y, width: 380, fontFamily: serif, fontSize: 52, lineHeight: 1.03, color: state.next === 'Step-free route' ? palette.red : palette.gray }}>Step-free route</div>
		<div data-testid="future-fare" data-started={state.fare.started} data-next={state.next === 'Check the fare'} style={{ position: 'absolute', left: state.fare.x, top: state.fare.y, width: 350, fontFamily: serif, fontSize: 52, lineHeight: 1.03, color: palette.gray }}>Check the fare</div>
		<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}><InkPath d="M89 802 Q221 812 471 800" amount={progress(seconds, state.reorderEndsAt, 1)} width={4} /></svg>
	</>;
};
