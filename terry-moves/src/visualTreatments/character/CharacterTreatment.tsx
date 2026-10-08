import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Engineer } from '../../aiTestAutomation/actors';
import { BODY, HEAD, palette } from '../../aiTestAutomation/design';
import { lerpPoint, mix, reach } from '../../aiTestAutomation/motion';
import { brief, OutcomeId, outcomeText, OutcomeStatus, statusLabel } from '../brief';
import { CharacterPose, ShopperPose, stage } from './script';

const REST_HAND = { x: 65, y: -164 };

// One shopper, the same person in every frame: the AI workshop's adult
// drawing at a fixed scale, standing on the street's ground line.
const Shopper: React.FC<{ pose: ShopperPose }> = ({ pose }) => {
	const y = stage.ground - pose.lift;
	const hand = lerpPoint(REST_HAND, reach(pose.x, y, pose.reach.to.x, pose.reach.to.y, stage.scale), pose.reach.amount);
	return <g data-role="shopper">
		<Engineer x={pose.x} y={y} scale={stage.scale} mood={pose.mood} gaze={pose.gaze} headTilt={pose.headTilt} blink={pose.blink} rightHand={hand}/>
	</g>;
};

const TONE: Record<OutcomeStatus, { color: string; fill: string; border: string; dashed: boolean }> = {
	open: { color: palette.muted, fill: palette.cream, border: palette.muted, dashed: true },
	later: { color: palette.muted, fill: palette.cream, border: palette.muted, dashed: true },
	question: { color: palette.red, fill: '#FCE6DD', border: palette.red, dashed: false },
	done: { color: '#2F7F52', fill: '#E2F2E3', border: palette.green, dashed: false },
	next: { color: palette.red, fill: '#FCE6DD', border: palette.red, dashed: false },
	unstarted: { color: palette.muted, fill: palette.cream, border: '#B9C2C6', dashed: true },
};

type Box = { x: number; y: number; w: number; h: number };
// The stock question is spoken; the other questions are posted on the shop
// itself: hours on its door, reservation in its window.
const SPEECH: Box = { x: 315, y: 175, w: 430, h: 190 };
const SPEECH_TAIL = `M390 362L${stage.home + 50} 500L460 362Z`;
const BOXES: Record<OutcomeId, Box> = {
	stock: SPEECH,
	hours: { x: 612, y: 645, w: 216, h: 150 },
	reservation: { x: 858, y: 600, w: 190, h: 160 },
};

const Outcome: React.FC<{ id: OutcomeId; status: OutcomeStatus; shown: number }> = ({ id, status, shown }) => {
	const box = BOXES[id];
	const tone = TONE[status];
	const outcome = brief.outcomes[id];
	const large = id === 'stock';
	return <div data-outcome={id} data-status={status} style={{ position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, boxSizing: 'border-box', padding: large ? '22px 26px' : '14px 18px', borderRadius: large ? 28 : 12, border: `${large ? 4 : 3}px ${tone.dashed ? 'dashed' : 'solid'} ${tone.border}`, background: tone.fill, opacity: shown, boxShadow: status === 'next' || status === 'question' ? '0 8px 0 rgba(36,52,75,0.10)' : 'none' }}>
		<div style={{ fontSize: large ? 22 : 19, fontWeight: 700, letterSpacing: 1, color: tone.color }}>{statusLabel[status]}</div>
		<div style={{ fontFamily: HEAD, fontSize: large ? (status === 'done' ? 36 : 42) : 26, fontWeight: 700, lineHeight: 1.12, marginTop: large ? 12 : 6, color: status === 'done' ? '#2F7F52' : status === 'unstarted' || status === 'later' || status === 'open' ? palette.muted : palette.ink }}>{outcomeText(id, status)}</div>
		{large && 'scope' in outcome && <div style={{ fontSize: 23, marginTop: 10, color: palette.muted }}>{outcome.scope}</div>}
	</div>;
};

// The street: a dotted way from home to a small shop.
const Street: React.FC<{ pose: CharacterPose }> = ({ pose }) => <g stroke={palette.ink} strokeWidth="5" strokeLinejoin="round">
	<path d={`M0 ${stage.ground}H1080`} strokeWidth="4" opacity="0.5"/>
	<path d={`M${stage.home + 90} ${stage.ground + 14}H${stage.door - 20}`} strokeWidth="5" strokeDasharray="4 22" strokeLinecap="round" opacity={0.25 + 0.45 * pose.need} fill="none"/>
	<g data-testid="shop">
		<rect x="580" y="525" width="480" height={stage.ground - 525} fill="#F3E3CB"/>
		<path d="M565 470H1075L1060 525H580Z" fill={palette.coral}/>
		<path d="M630 470L622 525M700 470L695 525M770 470L770 525M840 470L845 525M910 470L918 525M980 470L992 525" stroke={palette.cream} strokeWidth="9" opacity="0.8"/>
		<rect x="600" y="575" width="240" height={stage.ground - 575} fill={pose.closedSign > 0.5 ? '#8C9AA3' : palette.sky}/>
		<circle cx="826" cy="810" r="6" fill={palette.gold}/>
		<rect x="852" y="592" width="202" height="176" fill={palette.sky} opacity="0.5"/>
	</g>
	<g data-testid="closed-sign" data-shown={pose.closedSign > 0.5} opacity={pose.closedSign} transform={`rotate(${(1 - pose.closedSign) * -25} 720 590)`}>
		<path d="M695 597L720 582L745 597" fill="none" strokeWidth="3"/>
		<rect x="660" y="597" width="120" height="42" rx="6" fill={palette.cream} stroke={palette.red}/>
		<text x="720" y="627" textAnchor="middle" fill={palette.red} stroke="none" fontFamily={BODY} fontWeight="700" fontSize="24" letterSpacing="1">CLOSED</text>
	</g>
</g>;

export const CharacterTreatment: React.FC<{ pose: CharacterPose; caption: string }> = ({ pose, caption }) => {
	const { cover, solution, shopper } = pose;
	const speaking = pose.outcomes.stock.status !== 'done';
	return <AbsoluteFill style={{ background: palette.paper, color: palette.ink, fontFamily: BODY }}>
		<div data-beat={pose.beat} data-attention={pose.attention} style={{ position: 'absolute', inset: 0 }}>
			<div data-testid="title" style={{ position: 'absolute', left: 60, top: mix(52, 60, cover), fontFamily: HEAD, fontSize: mix(48, 74, cover), lineHeight: 1.08, letterSpacing: mix(-1, -2.5, cover), color: palette.ink }}>{brief.title}</div>
			<div data-testid="attribution" style={{ position: 'absolute', right: 60, top: mix(70, 84, cover), fontSize: mix(22, 26, cover), fontWeight: 700, letterSpacing: 2, color: palette.muted, textTransform: 'uppercase' }}>{brief.attribution}</div>
			<div style={{ position: 'absolute', left: 60, right: 60, top: 134, height: 3, background: '#E7D7C0' }}/>

			<svg viewBox="0 0 1080 1080" width="1080" height="1080" style={{ position: 'absolute', inset: 0 }}>
				<Street pose={pose}/>
				{/* Speech tails tie the spoken words to the shopper. */}
				<path data-testid="stock-tail" d={SPEECH_TAIL} fill={TONE[pose.outcomes.stock.status].fill} stroke={TONE[pose.outcomes.stock.status].border} strokeWidth="4" opacity={speaking ? pose.outcomes.stock.shown : 0}/>
				<path d={`M800 398L${stage.door + 30} 490L860 398Z`} fill={palette.cream} stroke={palette.red} strokeWidth="4" opacity={pose.feedback}/>
				<path d={SPEECH_TAIL} fill={palette.cream} stroke={palette.muted} strokeWidth="4" opacity={pose.need}/>
				<Shopper pose={shopper}/>
			</svg>

			<div data-testid="need" style={{ position: 'absolute', left: SPEECH.x, top: SPEECH.y, width: SPEECH.w, height: SPEECH.h, boxSizing: 'border-box', padding: '26px 28px', borderRadius: 28, border: `4px solid ${palette.muted}`, background: palette.cream, opacity: pose.need }}>
				<div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: palette.muted }}>THE SHOPPER WANTS TO</div>
				<div style={{ fontFamily: HEAD, fontSize: 42, fontWeight: 700, lineHeight: 1.12, marginTop: 12 }}>{brief.need}</div>
			</div>

			<div data-region="imagined-solution" style={{ position: 'absolute', left: 40, top: 175, width: 240, boxSizing: 'border-box', padding: '12px 16px', border: `3px dashed ${palette.sky}`, borderRadius: 12, background: '#EEF6F6', opacity: solution.shown * mix(1, 0.4, solution.muted) }}>
				<div style={{ fontSize: 19, fontWeight: 700, letterSpacing: 1, color: '#4B7F8C' }}>IMAGINED SOLUTION</div>
				{brief.solutionParts.map((part, index) => <div key={part} data-part={part} style={{ marginTop: 8, padding: '6px 14px', border: `2px solid ${palette.sky}`, background: palette.cream, borderRadius: 8, fontSize: 27, fontWeight: 700, color: '#3E6670', transform: `translateY(${(1 - solution.shown) * (index + 1) * -12}px)` }}>{part}</div>)}
				<div style={{ marginTop: 8, fontSize: 18, lineHeight: 1.2, color: palette.muted }}>Parts of one imagined answer</div>
			</div>
			<div style={{ position: 'absolute', left: 282, top: 238, width: 30, textAlign: 'center', fontSize: 44, color: palette.muted, opacity: pose.divider }}>≠</div>

			<div data-region="customer-outcomes">
				<Outcome id="stock" {...pose.outcomes.stock}/>
				<Outcome id="hours" {...pose.outcomes.hours}/>
				<Outcome id="reservation" {...pose.outcomes.reservation}/>
				<div data-testid="feedback" style={{ position: 'absolute', left: 762, top: 175, width: 283, height: 225, boxSizing: 'border-box', padding: '18px 22px', borderRadius: 28, border: `4px solid ${palette.red}`, background: palette.cream, opacity: pose.feedback, transform: `translateY(${(1 - pose.feedback) * 12}px)` }}>
					<div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1, color: palette.red }}>FEEDBACK</div>
					<div style={{ fontFamily: HEAD, fontSize: 29, lineHeight: 1.2, marginTop: 8, color: palette.ink }}>“{brief.feedback}”</div>
				</div>
			</div>

			{caption && <div data-testid="caption" style={{ position: 'absolute', left: 82, right: 82, top: 900, height: 113, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 34, lineHeight: 1.26, color: palette.ink }}>{caption}</div>}
		</div>
	</AbsoluteFill>;
};
