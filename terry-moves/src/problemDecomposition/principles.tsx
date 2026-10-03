import React from 'react';
import { bodyFont, headlineFont, palette } from './design';
import { mix, reveal, sceneAt } from './film';
import { spokenCue } from './series';
import { StageText, WishBall } from './stage';

const PrincipleName: React.FC<{ number: number; children: React.ReactNode; top?: number }> = ({ number, children, top = 280 }) => (
	<div style={{ position: 'absolute', left: 571, top, width: 453, fontFamily: headlineFont, fontSize: 36, color: palette.ink, lineHeight: 1.12 }}><span style={{ color: palette.cobalt }}>{number} · </span>{children}</div>
);

export const Principles: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	if (scene.id === 'vertical') {
		const flow = reveal(seconds, spokenCue('vertical', 1), 0.6);
		return <>
			<div style={{ opacity: 1 - flow }}>
				<PrincipleName number={1}>Three Vs</PrincipleName>
				<div style={{ position: 'absolute', left: 579, top: 344, width: 450, fontFamily: bodyFont, fontSize: 29, lineHeight: 1.5 }}>
					<div style={{ opacity: mix(0.3, 1, reveal(seconds, spokenCue('vertical', 0, 'valuable'), 0.4)) }}><strong>Valuable</strong> · a customer need</div>
					<div style={{ opacity: mix(0.3, 1, reveal(seconds, spokenCue('vertical', 0, 'visible'), 0.4)) }}><strong>Visible</strong> · a useful result</div>
					<div style={{ opacity: mix(0.3, 1, reveal(seconds, spokenCue('vertical', 0, 'vertical'), 0.4)) }}><strong>Vertical</strong> · cross what’s needed</div>
				</div>
			</div>
			<div style={{ opacity: flow }}><PrincipleName number={2}>One-piece flow</PrincipleName><div style={{ position: 'absolute', left: 582, top: 362, width: 420, fontFamily: bodyFont, fontSize: 31, lineHeight: 1.4, color: palette.cobalt }}>Finish one customer<br />outcome together.<br /><span style={{ fontSize: 25, color: palette.muted }}>The next story waits.</span></div></div>
		</>;
	}
	if (scene.id === 'fractal' || scene.id === 'commit') {
		const commit = scene.id === 'commit';
		const scenario = commit ? 1 : reveal(seconds, spokenCue('fractal', 0, 'scenarios'), 0.55);
		const slice = commit ? 1 : reveal(seconds, spokenCue('fractal', 0, 'slices'), 0.5);
		return <>
			<PrincipleName number={3}>{commit ? 'Every commit is your last.' : 'Repeat at smaller scales'}</PrincipleName>
			<svg width="470" height="200" style={{ position: 'absolute', left: 568, top: 344 }}>
				<path d="M50 95 H194 M240 95 H370" fill="none" stroke={palette.rule} strokeWidth={2} />
				{['Story', 'Scenario', 'Slice'].map((label, index) => {
					const progress = index === 0 ? 1 : index === 1 ? scenario : slice;
					const x = index === 0 ? 51 : index === 1 ? mix(51, 206, progress) : mix(206, 361, progress);
					return <g key={label} opacity={progress}>
						<WishBall at={{ x, y: 91 }} radius={45 - index * 13} color={[palette.terracotta, palette.gold, palette.cobalt][index]} squash={1 + Math.sin(progress * Math.PI) * 0.15} />
						<StageText x={51 + index * 155} y={170} size={29} opacity={progress}>{label}</StageText>
					</g>;
				})}
			</svg>
			{commit && <div style={{ position: 'absolute', left: 585, top: 551, width: 430, fontFamily: bodyFont, fontSize: 28, lineHeight: 1.4, color: palette.cobalt }}>Current purpose.<br />An existing documented need.<br /><span style={{ color: palette.muted, fontSize: 24 }}>Including the product’s health.</span></div>}
		</>;
	}
	return null;
};
