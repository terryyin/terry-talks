import React from 'react';
import { bodyFont, headlineFont, palette } from './design';
import { Check, cue, DinnerWorld, Headline, Label, SceneProps } from './elements';
import { DINNER_RELIEF, filmScript, mix, reveal } from './film';
import { SplitPhone } from './objects';

const feedbackScene = filmScript.scenes.find((scene) => scene.id === 'value')!;
export const feedbackCue = feedbackScene.captionRanges[2].speechStart;
export const queuedOutcomes = ['Unequal shares', 'Track payments'] as const;

/** Only future, unstarted outcomes reorder; delivered equal splitting survives. */
export const queueLayout = (title: typeof queuedOutcomes[number], seconds: number): { left: number; top: number } => {
	const before = title === 'Unequal shares' ? 0 : 1;
	const crossed = reveal(seconds, feedbackCue + 0.4, 0.75);
	const lifted = reveal(seconds, feedbackCue, 0.4);
	const returned = reveal(seconds, feedbackCue + 1.15, 0.4);
	return {
		left: 66 + mix(before, 1 - before, crossed) * 318,
		top: 725 - (title === 'Track payments' ? 170 * (lifted - returned) : 0),
	};
};

const UnstartedCard: React.FC<{ title: string; x: number; y: number; opacity?: number }> = ({ title, x, y, opacity = 1 }) => (
	<div style={{ position: 'absolute', left: x, top: y, width: 292, height: 128, padding: '19px 22px', boxSizing: 'border-box', background: palette.paperLight, border: `1px dashed ${palette.rule}`, color: palette.ink, opacity, boxShadow: '4px 6px 0 #172c4217' }}>
		<div style={{ fontFamily: bodyFont, fontSize: 16, letterSpacing: 2, color: palette.muted, textTransform: 'uppercase' }}>Unstarted</div>
		<div style={{ fontFamily: headlineFont, fontSize: 32, lineHeight: 1.1, marginTop: 12 }}>{title}</div>
	</div>
);

export const Value: React.FC<SceneProps> = ({ time, scene }) => {
	const useful = reveal(time, cue(scene, 0) + 0.4, 1.1);
	const relief = reveal(time, cue(scene, 1), 0.8);
	const feedback = reveal(time, cue(scene, 2), 0.6);
	const enough = reveal(time, cue(scene, 3), 0.6);
	return (
		<>
			<DinnerWorld zoom={mix(1.012, 1, useful)} />
			<DinnerWorld asset={DINNER_RELIEF} opacity={relief} zoom={mix(1.012, 1, relief)} />
			<Headline opacity={1 - enough}>Deliver something useful.<br /><em style={{ color: palette.cobalt }}>Let the customer answer.</em></Headline>
			<Headline opacity={enough}>Just enough.<br /><em style={{ color: palette.cobalt }}>Just in time to learn.</em></Headline>
			<div style={{ position: 'absolute', left: 746, top: mix(880, 502, useful), transform: `rotate(${mix(8, 2, useful)}deg)`, opacity: useful }}><SplitPhone width={239} shown={useful} /></div>
			<div style={{ position: 'absolute', left: 568, top: 230, width: 449, height: 83, padding: '20px 22px', boxSizing: 'border-box', background: palette.paperLight, border: `1.5px solid ${palette.ink}`, boxShadow: '4px 6px 0 #172c4224', fontFamily: headlineFont, fontSize: 31, opacity: feedback, transform: `translateY(${mix(13, 0, feedback)}px)` }}>
				Who has already paid?
				<svg width="30" height="20" style={{ position: 'absolute', right: 67, bottom: -20 }}><path d="m0 0 17 18 8-18" fill={palette.paperLight} stroke={palette.ink} strokeWidth="1.5" /></svg>
			</div>
			<div style={{ position: 'absolute', left: 66, top: 678, width: 610, height: 34, background: palette.paperLight, color: palette.muted, fontFamily: bodyFont, fontSize: 18, padding: '6px 11px', boxSizing: 'border-box', letterSpacing: 1 }}>A provisional queue. Feedback can change it.</div>
			{queuedOutcomes.map((title) => {
				const position = queueLayout(title, scene.start + time);
				return <UnstartedCard key={title} title={title} x={position.left} y={position.top} />;
			})}
		</>
	);
};

export const Stop: React.FC<SceneProps> = ({ time, scene }) => {
	const leave = reveal(time, cue(scene, 2), 1.2);
	return (
		<>
			<div style={{ position: 'absolute', inset: 0, bottom: 180, background: palette.cobalt }} />
			<Headline><span style={{ color: palette.paperLight }}>Change the next step.<br /><em style={{ color: palette.gold }}>Keep what works.</em></span></Headline>
			<div style={{ position: 'absolute', left: 65, top: 285, width: 460, height: 540, background: palette.paperLight, border: `1px solid ${palette.ink}`, transform: `rotate(${mix(-1.2, 0, reveal(time, 0, 1))}deg)`, boxShadow: '9px 12px 0 #172c4240' }}>
				<Check x={30} y={29} /><Label left={74} top={33} color={palette.cobalt} size={22}>Completed · still useful</Label>
				<div style={{ position: 'absolute', left: 105, top: 115 }}><SplitPhone width={253} /></div>
			</div>
			<Label left={590} top={286} color={palette.paperLight} size={24}>Unstarted</Label>
			{['Track payments', 'Unequal shares'].map((title, index) => (
				<div key={title} style={{ transform: `translateX(${leave * 143}px) rotate(${leave * (index ? 3 : -3)}deg)`, transformOrigin: '730px 540px', opacity: mix(1, 0.3, leave) }}>
					<UnstartedCard title={title} x={590} y={358 + index * 171} />
				</div>
			))}
			<div style={{ position: 'absolute', left: 590, top: 753, width: 400, color: palette.paperLight, fontFamily: headlineFont, fontSize: 35, lineHeight: 1.12, opacity: leave }}>Today stands<br /><em>on its own.</em></div>
		</>
	);
};
