import React from 'react';
import { bodyFont, headlineFont, palette } from './design';
import { cue, DinnerWorld, Headline, Label, SceneProps, wordCue } from './elements';
import { DINNER_RELIEF, mix, reveal } from './film';

export const Health: React.FC<SceneProps> = ({ time, scene }) => {
	const potential = reveal(time, cue(scene, 1), 1.1);
	const unused = reveal(time, cue(scene, 2), 0.9);
	return (
		<>
			<Headline>A coherent product.<br /><em style={{ color: palette.cobalt }}>Affordable possibilities.</em></Headline>
			<svg width="1080" height="610" style={{ position: 'absolute', top: 259 }}>
				<rect x="66" y="38" width="520" height="512" fill={palette.paperLight} stroke={palette.rule} strokeWidth="1.5" />
				<path d="M198 183 H451 M451 183 325 381 M325 381 198 183" fill="none" stroke={palette.cobalt} strokeWidth="4" />
				<g opacity={potential}>
					<path d="M451 183 C637 183 591 112 780 112 M451 183 C690 217 654 408 790 408 M325 381 C678 592 659 408 790 408" fill="none" stroke={palette.cobalt} strokeWidth="3" strokeDasharray="6 10" opacity={mix(0.5, 0.13, unused)} />
					<circle cx="788" cy="112" r="9" fill={palette.gold} opacity={1 - unused * 0.8} />
					<circle cx="798" cy="408" r="9" fill={palette.gold} opacity={1 - unused * 0.8} />
				</g>
				{[{ x: 198, y: 183, text: 'Bill' }, { x: 451, y: 183, text: 'Person' }, { x: 325, y: 381, text: 'Share' }].map((node) => (
					<g key={node.text}>
						<circle cx={node.x} cy={node.y} r="63" fill={palette.cobalt} />
						<text x={node.x} y={node.y + 12} textAnchor="middle" fontFamily={headlineFont} fontSize="34" fill={palette.paperLight}>{node.text}</text>
					</g>
				))}
				<g opacity={unused}>
					<path d="M610 240c84-98 91 155 198 28s71 211 172 60 M593 186C731 96 761 322 926 187" fill="none" stroke={palette.terracotta} strokeWidth="4" />
					<path d="m776 100 24 24 m0-24-24 24 M786 396l24 24m0-24-24 24" stroke={palette.terracotta} strokeWidth="4" />
				</g>
			</svg>
			<Label left={93} top={326} color={palette.cobalt} size={20}>Current business · one shared design</Label>
			<Label left={112} top={766} size={22}>Care for the whole product.</Label>
			<div style={{ position: 'absolute', left: 629, top: 283, width: 370, color: palette.cobalt, fontFamily: bodyFont, fontSize: 22, letterSpacing: 1, opacity: potential }}>FUTURE POSSIBILITIES</div>
			{[{ text: 'Unequal shares?', y: 334 }, { text: 'Track payments?', y: 684 }].map((item) => (
				<div key={item.text} style={{ position: 'absolute', left: 667, top: item.y, width: 319, height: 77, border: `1px dashed ${palette.rule}`, background: palette.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: headlineFont, fontSize: 32, color: palette.muted, opacity: potential * mix(1, 0.25, unused) }}>{item.text}</div>
			))}
			<div style={{ position: 'absolute', left: 646, top: 462, width: 354, height: 122, background: palette.terracotta, padding: '24px 25px', boxSizing: 'border-box', color: palette.paperLight, fontFamily: headlineFont, fontSize: 31, lineHeight: 1.1, transform: `rotate(${mix(-6, 2, unused)}deg)`, opacity: unused }}>Unused feature.<br /><em>Extra complexity.</em></div>
			<div style={{ position: 'absolute', left: 629, top: 806, width: 374, fontFamily: bodyFont, fontSize: 23, lineHeight: 1.15, color: palette.muted, opacity: potential }}>Potential future value at a cost.<br />Speculative, across possible needs.</div>
		</>
	);
};

export const Ending: React.FC<SceneProps> = ({ time, scene }) => {
	const deliver = reveal(time, wordCue(scene, 0, 'deliver'), 0.6);
	const learn = reveal(time, wordCue(scene, 0, 'learn'), 0.6);
	const choose = reveal(time, wordCue(scene, 0, 'choose'), 0.6);
	return (
		<>
			<DinnerWorld asset={DINNER_RELIEF} y={170} zoom={mix(1.016, 1, Math.min(time / 5.5, 1))} />
			<Headline size={75}><span style={{ opacity: deliver }}>Deliver.</span> <em style={{ color: palette.cobalt, opacity: learn }}>Learn.</em><br /><span style={{ opacity: choose }}>Choose again.</span></Headline>
			<div style={{ position: 'absolute', left: 66, top: 812, padding: '13px 20px', background: palette.paperLight, color: palette.ink, fontFamily: bodyFont, fontSize: 23, opacity: choose, boxShadow: '4px 5px 0 #172c4220' }}>An idea by Terry Yin</div>
		</>
	);
};
