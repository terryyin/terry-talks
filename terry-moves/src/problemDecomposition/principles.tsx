import React from 'react';
import { Img, staticFile } from 'remotion';
import { bodyFont, headlineFont, palette } from './design';
import { Check, cue, Headline, Label, SceneProps, wordCue } from './elements';
import { ENGINEERS, mix, reveal } from './film';
import { SplitPhone } from './objects';

export const requiredParts = ['Screen', 'Service', 'Data'] as const;

export const Vertical: React.FC<SceneProps> = ({ time, scene }) => {
	const endToEnd = reveal(time, cue(scene, 1), 1.8);
	const flow = reveal(time, cue(scene, 2), 0.75);
	const vs = ['Valuable', 'Visible', 'Vertical'];
	return (
		<>
			<Headline opacity={1 - flow}>One useful outcome.<br /><em style={{ color: palette.cobalt }}>Three ways to check it.</em></Headline>
			<Headline opacity={flow}>Finish one outcome.<br /><em style={{ color: palette.cobalt }}>Together.</em></Headline>
			<div style={{ opacity: 1 - flow }}>
				{vs.map((word, index) => (
					<div key={word} style={{ position: 'absolute', left: 66 + index * 325, top: 286, width: 298, color: palette.cobalt, opacity: reveal(time, wordCue(scene, index === 2 ? 1 : 0, word.toLowerCase()), 0.5) }}>
						<div style={{ fontFamily: headlineFont, fontSize: 103, fontStyle: 'italic', lineHeight: 0.8, color: index === 2 ? palette.terracotta : palette.cobalt }}>V</div>
						<div style={{ fontFamily: headlineFont, fontSize: 43, marginTop: 17 }}>{word}</div>
						<div style={{ fontFamily: bodyFont, fontSize: 24, color: palette.muted, marginTop: 9 }}>{['A useful result', 'The customer can judge', 'Working end to end'][index]}</div>
					</div>
				))}
			</div>
			<svg width="1080" height="580" style={{ position: 'absolute', top: 263, opacity: 1 - flow }}>
				{requiredParts.map((part, index) => (
					<g key={part}>
						<rect x="226" y={255 + index * 85} width="630" height="66" fill={palette.cobalt} />
						<text x="260" y={298 + index * 85} fill={palette.paperLight} fontFamily={bodyFont} fontSize="28">{part}</text>
					</g>
				))}
				<path d="M620 230 V486" fill="none" stroke={palette.gold} strokeWidth="10" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - endToEnd} />
				<path d="m606 473 14 15 14-15" fill="none" stroke={palette.gold} strokeWidth="5" opacity={endToEnd} />
				<circle cx="620" cy="225" r="10" fill={palette.gold} />
			</svg>
			<Label left={226} top={801} size={20} opacity={1 - flow}>The path crosses the parts this outcome needs.</Label>
			<div style={{ position: 'absolute', left: 30, top: 259, width: 1020, height: 613, opacity: flow, transform: `translateY(${mix(25, 0, flow)}px)` }}>
				<Img src={staticFile(ENGINEERS)} style={{ width: 1020, height: 680 }} />
				<div style={{ position: 'absolute', left: 374, top: 408, width: 273, height: 92, background: palette.cobalt, border: `3px solid ${palette.gold}`, transform: 'rotate(-1deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: headlineFont, fontSize: 41, color: palette.paperLight, boxShadow: '0 0 35px #e1ae5d55' }}>$30 each</div>
			</div>
			<div style={{ position: 'absolute', left: 0, top: 817, width: 1080, height: 83, background: palette.paper, opacity: flow }}><Label left={66} top={23} size={23} color={palette.cobalt}>One-piece flow · one shared customer outcome</Label></div>
		</>
	);
};

export const Fractal: React.FC<SceneProps> = ({ time, scene }) => {
	const focus = reveal(time, cue(scene, 0) + 1.2, 3.3);
	return (
		<>
			<Headline>The same reasoning.<br /><em style={{ color: palette.cobalt }}>At every scale.</em></Headline>
			<div style={{ position: 'absolute', left: mix(66, 48, focus), top: mix(284, 268, focus), width: mix(948, 984, focus), height: 573, background: palette.cobalt, border: `1px solid ${palette.ink}` }}>
				<Label left={27} top={25} color={palette.paperLight} size={20}>Story</Label>
				<div style={{ position: 'absolute', left: 27, top: 61, fontFamily: headlineFont, fontSize: 41, color: palette.paperLight }}>Know what to pay</div>
				<div style={{ position: 'absolute', left: mix(192, 147, focus), top: 153, right: 31, height: 376, background: palette.paperLight, border: `1px solid ${palette.ink}`, transform: `translateY(${mix(30, 0, reveal(time, cue(scene, 0) + 1.5, 1))}px)` }}>
					<Label left={27} top={25} color={palette.cobalt} size={20}>Scenario</Label>
					<div style={{ position: 'absolute', left: 27, top: 63, fontFamily: headlineFont, fontSize: 38, color: palette.ink }}>This $90 bill. Three friends.</div>
					<div style={{ position: 'absolute', left: mix(189, 134, focus), top: 152, right: 26, height: 181, background: palette.gold, border: `1px solid ${palette.ink}`, opacity: reveal(time, cue(scene, 0) + 2.8, 0.8) }}>
						<Label left={26} top={24} color={palette.ink} size={20}>Implementation slice</Label>
						<div style={{ position: 'absolute', left: 26, top: 65, fontFamily: headlineFont, fontSize: 40 }}>A working $30 share</div>
						<Check x={26} y={123} /><div style={{ position: 'absolute', left: 70, top: 127, fontFamily: bodyFont, fontSize: 23 }}>Useful. Complete. Can stop.</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const Commit: React.FC<SceneProps> = ({ time, scene }) => {
	const purpose = reveal(time, cue(scene, 1), 0.6);
	const pull = reveal(time, cue(scene, 2), 0.7);
	const health = reveal(time, cue(scene, 3), 0.7);
	return (
		<>
			<Headline size={73}>Every commit is<br /><em style={{ color: palette.cobalt }}>your last commit.</em></Headline>
			<div style={{ position: 'absolute', left: 66, top: 285, width: 417, height: 543, background: palette.cobalt, boxShadow: '8px 11px 0 #172c4226', transform: `rotate(${mix(-2, 0, purpose)}deg)` }}>
				<Label left={27} top={28} color={palette.paperLight} size={22}>Current purpose</Label>
				<div style={{ position: 'absolute', left: 82, top: 104 }}><SplitPhone width={247} /></div>
				<div style={{ position: 'absolute', left: 26, right: 26, top: 480, color: palette.paperLight, textAlign: 'center', fontFamily: bodyFont, fontSize: 25, opacity: purpose }}>Strive for useful value now.</div>
			</div>
			<div style={{ position: 'absolute', left: 548, top: mix(481, 357, pull), width: 460, height: 334, background: palette.paperLight, border: `1px solid ${palette.rule}`, boxShadow: '7px 9px 0 #172c4220', padding: '34px 31px', boxSizing: 'border-box', opacity: pull, transform: `rotate(${mix(4, -1, pull)}deg)` }}>
				<div style={{ fontFamily: headlineFont, fontSize: 41, color: palette.cobalt }}>Documented pull</div>
				<div style={{ marginTop: 21, height: 1, background: palette.rule }} />
				<div style={{ fontFamily: bodyFont, fontSize: 31, lineHeight: 1.25, marginTop: 23, color: palette.ink }}>An existing need calls<br />for this change.</div>
				<div style={{ fontFamily: headlineFont, fontSize: 31, marginTop: 21, color: palette.terracotta, opacity: health }}><em>Product health counts.</em></div>
			</div>
			<Label left={549} top={772} color={palette.cobalt} size={23} opacity={health}>This result stands on its own.</Label>
		</>
	);
};
