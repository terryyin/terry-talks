import React from 'react';
import { bodyFont, headlineFont, palette } from './design';
import { reveal } from './film';
import { spokenCue } from './series';
import { StageText, WishBall } from './stage';

export const Health: React.FC<{ seconds: number }> = ({ seconds }) => {
	const option = reveal(seconds, spokenCue('health', 1), 0.7);
	const unused = reveal(seconds, spokenCue('health', 2), 0.8);
	return <>
		<div style={{ position: 'absolute', left: 574, top: 280, width: 450, fontFamily: headlineFont, fontSize: 36 }}>4 · Whole-product focus</div>
		<div style={{ position: 'absolute', left: 580, top: 347, width: 436, fontFamily: bodyFont, fontSize: 29, lineHeight: 1.4, color: palette.cobalt, opacity: 1 - option }}>Assimilate every splash.<br />Keep the design coherent.</div>
		<svg width="450" height="255" style={{ position: 'absolute', left: 576, top: 351, opacity: option }} aria-label="Speculative options for future customer value">
			<path d="M30 126 Q135 126 221 38 M30 126 Q135 126 221 126 M30 126 Q135 126 221 216" fill="none" stroke={palette.rule} strokeWidth={3} strokeDasharray="6 7" />
			{[38, 126, 216].map((y, index) => <g key={y} opacity={index === 2 ? 1 - unused * 0.85 : 1}><WishBall at={{ x: 241, y }} radius={23} color={[palette.gold, palette.cobalt, palette.terracotta][index]} /><StageText x={241} y={y + 9} size={28}>?</StageText></g>)}
			<StageText x={395} y={40} size={23} anchor="end">Future value</StageText>
			<StageText x={397} y={73} size={23} anchor="end">at a future cost</StageText>
			<g opacity={unused}><rect x="71" y="104" width="62" height="45" fill={palette.cobalt} /><path d="M86 115 L120 138 M120 115 L86 138" stroke={palette.paperLight} strokeWidth={3} /><StageText x={115} y={182} size={22}>Unused feature</StageText></g>
		</svg>
		<div style={{ position: 'absolute', left: 583, top: 623, fontFamily: bodyFont, fontSize: 26, color: palette.cobalt, opacity: option }}>Option value · speculative potential</div>
	</>;
};

export const Ending: React.FC<{ seconds: number }> = ({ seconds }) => {
	const shown = reveal(seconds, spokenCue('end', 0), 0.65);
	return <>
		<div style={{ position: 'absolute', left: 578, top: 285, width: 440, fontFamily: headlineFont, fontSize: 58, color: palette.cobalt, lineHeight: 1.17, opacity: shown }}>Deliver.<br />Learn.<br /><em>Choose again.</em></div>
		<div style={{ position: 'absolute', left: 570, top: 24, fontFamily: bodyFont, fontSize: 22, color: palette.muted, opacity: shown }}>An idea by Terry Yin · Story Impact / 02</div>
	</>;
};
