import React from 'react';
import { bodyFont, headlineFont, palette } from './design';
import { reveal } from './film';
import { spokenCue } from './series';
import { StageText, WishBall } from './stage';

export const Premises: React.FC<{ seconds: number }> = ({ seconds }) => {
	const smaller = reveal(seconds, spokenCue('premises', 0), 0.6);
	const attempt = reveal(seconds, spokenCue('premises', 1), 0.5);
	return <>
		<div style={{ position: 'absolute', left: 584, top: 281, fontFamily: bodyFont, fontSize: 27, color: palette.cobalt, opacity: smaller }}>1 · Smaller customer problems</div>
		<svg width="480" height="115" style={{ position: 'absolute', left: 580, top: 315 }}>
			<path d="M52 55 H152 M206 55 H313" stroke={palette.rule} strokeWidth={2} strokeDasharray="5 6" />
			<WishBall at={{ x: 48, y: 52 }} radius={35} />
			<WishBall at={{ x: 180, y: 52 }} radius={25} color={palette.gold} />
			<WishBall at={{ x: 340, y: 52 }} radius={16} color={palette.cobalt} />
			<StageText x={340} y={100} size={22} opacity={smaller}>$90 / 3 friends</StageText>
		</svg>
		<div style={{ position: 'absolute', left: 586, top: 448, width: 430, opacity: attempt, fontFamily: headlineFont, fontSize: 32, color: palette.ink }}>2 · A plan is an attempt.</div>
	</>;
};
