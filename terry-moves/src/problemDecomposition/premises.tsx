import React from 'react';
import { bodyFont, headlineFont, palette } from './design';
import { cue, Headline, Label, SceneProps } from './elements';
import { mix, reveal } from './film';

export const Premises: React.FC<SceneProps> = ({ time, scene }) => {
	const narrow = reveal(time, cue(scene, 0) + 0.55, 2.3);
	const uncertain = reveal(time, cue(scene, 1), 0.65);
	const path = reveal(time, cue(scene, 1) + 0.6, 2.5);
	return (
		<>
			<Headline opacity={1 - uncertain}>Smaller problems.<br /><em style={{ color: palette.cobalt }}>The same outside view.</em></Headline>
			<Headline opacity={uncertain}>A plan is an attempt.<br /><em style={{ color: palette.cobalt }}>Keep room to discover.</em></Headline>
			<div style={{ opacity: 1 - uncertain, transform: `translateY(${mix(20, 0, narrow)}px)` }}>
				{[
					{ left: 66, top: 268, width: 690, height: 332, text: 'Share the cost of dinner', fill: palette.cobalt, color: palette.paperLight },
					{ left: 160, top: 350, width: 536, height: 203, text: 'Split equally', fill: palette.paperLight, color: palette.ink },
					{ left: 280, top: 433, width: 359, height: 83, text: 'This bill. Three friends.', fill: palette.gold, color: palette.ink },
				].map((box, index) => (
					<div key={box.text} style={{ position: 'absolute', left: box.left, top: box.top, width: box.width, height: box.height, color: box.color, background: box.fill, border: `1px solid ${palette.ink}`, boxSizing: 'border-box', padding: '22px 24px', fontFamily: headlineFont, fontSize: index === 2 ? 29 : 37, opacity: index === 0 ? 1 : reveal(time, cue(scene, 0) + index * 0.5, 1.3), boxShadow: '6px 8px 0 #172c4216' }}>{box.text}</div>
				))}
				<svg width="240" height="206" viewBox="0 0 240 206" style={{ position: 'absolute', left: 788, top: 430 }}>
					<path d="M22 58 110 15 220 60 131 107Z M22 58v97l109 43V107 M131 107l89-47v97l-89 41" fill={palette.paperLight} stroke={palette.ink} strokeWidth="2" />
					<path d="m76 33 107 47v38" fill="none" stroke={palette.gold} strokeWidth="13" />
				</svg>
				<Label left={801} top={674} size={17}>Solution stays closed</Label>
				<Label left={66} top={746} size={23}>Narrow the need before choosing the internals.</Label>
			</div>
			<div style={{ opacity: uncertain }}>
				<svg width="1080" height="600" viewBox="0 0 1080 600" style={{ position: 'absolute', top: 270 }}>
					<path d="M103 445 C230 441 200 278 354 304 S537 451 671 253 S852 183 970 81" fill="none" stroke={palette.rule} strokeWidth="3" strokeDasharray="7 9" />
					<path d="M103 445 C230 441 200 278 354 304 S537 451 671 253 S852 183 970 81" pathLength="1" fill="none" stroke={palette.cobalt} strokeWidth="7" strokeDasharray="1" strokeDashoffset={1 - path} strokeLinecap="round" />
					<circle cx="103" cy="445" r="13" fill={palette.terracotta} />
					<circle cx="970" cy="81" r="31" fill={palette.paperLight} stroke={palette.rule} strokeWidth="2" />
					<text x="970" y="96" textAnchor="middle" fontFamily={headlineFont} fontSize="47" fill={palette.cobalt}>?</text>
				</svg>
				<Label left={66} top={795} size={23}>Evidence can redraw the route.</Label>
				<div style={{ position: 'absolute', left: 76, top: 312, fontFamily: bodyFont, fontSize: 25, color: palette.muted }}>An uncertain problem</div>
			</div>
		</>
	);
};
