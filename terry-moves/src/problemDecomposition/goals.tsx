import React from 'react';
import { Img, staticFile } from 'remotion';
import { bodyFont, headlineFont, palette } from './design';
import { DINNER, DINNER_RELIEF, ENGINEERS, reveal, sceneAt } from './film';
import { coherentAt, feedbackCue, spokenCue, verticalImpactAt } from './series';

/** Glimpses of the customer world share the stage with the product. */
export const CustomerWorld: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	const completed = seconds >= coherentAt();
	const engineers = scene.id === 'vertical' && seconds >= spokenCue('vertical', 1);
	const asset = engineers ? ENGINEERS : completed ? DINNER_RELIEF : DINNER;
	const show = scene.id === 'hook' ? reveal(seconds, spokenCue('hook', 1), 0.65) : 1;
	return <div style={{ position: 'absolute', left: 570, top: 724, width: 270, height: 174, opacity: show, overflow: 'hidden', borderRadius: '38% 38% 0 0' }}>
		<Img src={staticFile(asset)} style={{ width: 270, height: 180 }} />
	</div>;
};

export const WorkingReceipt: React.FC<{ seconds: number }> = ({ seconds }) => {
	const completed = seconds >= coherentAt();
	const stepFree = seconds >= verticalImpactAt();
	const show = reveal(seconds, completed ? coherentAt() : spokenCue('hook', 1), 0.55);
	return <div data-testid="working-receipt" data-completed={completed} aria-label={completed ? 'Next train leaves at 22:45, ten minutes away on foot' : 'Three friends need a way home after dinner'} style={{ position: 'absolute', left: 853, top: 746, width: 184, height: 136, padding: '13px 12px', boxSizing: 'border-box', background: palette.paperLight, color: palette.ink, border: `1px solid ${palette.rule}`, boxShadow: '4px 7px 0 #172c4214', transform: `rotate(${completed ? -2 : 3}deg)`, opacity: show }}>
		<div style={{ fontFamily: bodyFont, fontSize: 17, color: palette.muted }}>{completed ? 'Next train' : 'Getting home'}</div>
		<div style={{ fontFamily: headlineFont, fontSize: completed ? 37 : 26, marginTop: 7 }}>{completed ? '22:45' : 'Next train?'}</div>
		<div style={{ fontFamily: bodyFont, fontSize: completed ? 21 : 19, color: stepFree ? palette.cobalt : palette.terracotta }}>{completed ? stepFree ? 'Step-free ✓' : '10-minute walk' : 'Not known yet'}</div>
	</div>;
};

export const GoalDetail: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	if (scene.id !== 'value' && scene.id !== 'stop') return null;
	const feedback = scene.id === 'value' ? reveal(seconds, feedbackCue(), 0.45) : 0;
	const justInTime = scene.id === 'value' ? reveal(seconds, spokenCue('value', 3), 0.5) : 0;
	return <>
		<div style={{ position: 'absolute', left: 554, top: 231, width: 470, opacity: feedback * (1 - justInTime), background: palette.paperLight, border: `1.5px solid ${palette.ink}`, padding: '14px 16px', fontFamily: headlineFont, fontSize: 32, transform: `translateY(${12 * (1 - feedback)}px)`, boxShadow: '4px 6px 0 #172c4218' }}>“Does that route have stairs?”</div>
		{justInTime > 0 && <div style={{ position: 'absolute', left: 584, top: 277, width: 420, opacity: justInTime, fontFamily: headlineFont, fontSize: 44, color: palette.cobalt, lineHeight: 1.15 }}>Just enough.<br /><em>Just in time to learn.</em></div>}
		{scene.id === 'stop' && <>
			<div style={{ position: 'absolute', left: 585, top: 295, fontFamily: headlineFont, fontSize: 47, color: palette.cobalt }}>No waste.<br />No damage.</div>
			<div style={{ position: 'absolute', left: 585, top: 420, fontFamily: bodyFont, fontSize: 24, color: palette.muted }}>Keep what works.<br />Later stories: unstarted, movable.</div>
		</>}
	</>;
};
