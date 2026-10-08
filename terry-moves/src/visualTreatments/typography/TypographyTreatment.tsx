import React from 'react';
import { Card, Paper, Small, Strong } from '../../problemDecompositionRemake/Frame';
import { C, HEAD } from '../../problemDecompositionRemake/film';
import { brief, OutcomeId, outcomeText, OutcomeStatus, statusLabel } from '../brief';
import { OutcomePose, TypographyPose } from './script';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Box = { x: number; y: number; w: number; h: number };
const BOXES: Record<OutcomeId, Box> = {
	stock: { x: 450, y: 240, w: 550, h: 200 },
	hours: { x: 450, y: 580, w: 550, h: 140 },
	reservation: { x: 450, y: 735, w: 550, h: 135 },
};

const TONE: Record<OutcomeStatus, { color: string; card: 'question' | 'done' | 'later' }> = {
	open: { color: C.muted, card: 'later' },
	later: { color: C.muted, card: 'later' },
	question: { color: C.red, card: 'question' },
	done: { color: C.teal, card: 'done' },
	next: { color: C.red, card: 'question' },
	unstarted: { color: C.muted, card: 'later' },
};

const OutcomeCard: React.FC<{ id: OutcomeId; status: OutcomeStatus }> = ({ id, status }) => {
	const box = BOXES[id];
	const outcome = brief.outcomes[id];
	const tone = TONE[status];
	const large = id === 'stock';
	return <Card {...box} tone={tone.card}>
		<Small color={tone.color}>{statusLabel[status]}</Small>
		<Strong size={large ? 50 : 36} color={status === 'done' ? C.teal : status === 'unstarted' ? C.muted : C.ink}>{outcomeText(id, status)}</Strong>
		{large && 'scope' in outcome && <div style={{ fontSize: 27, marginTop: 12, color: C.muted }}>{outcome.scope}</div>}
	</Card>;
};

// A card turns over, from the status it is leaving to its new status.
const Outcome: React.FC<{ id: OutcomeId; pose: OutcomePose }> = ({ id, pose }) => {
	const box = BOXES[id];
	const turned = pose.change >= 0.5;
	return <div data-outcome={id} data-status={pose.status} style={{ position: 'absolute', inset: 0, opacity: pose.shown, transform: `scaleY(${Math.abs(2 * pose.change - 1)})`, transformOrigin: `${box.x + box.w / 2}px ${box.y + box.h / 2}px` }}>
		<OutcomeCard id={id} status={turned ? pose.status : pose.from}/>
	</div>;
};

export const TypographyTreatment: React.FC<{ pose: TypographyPose; caption: string }> = ({ pose, caption }) => {
	const { cover, solution } = pose;
	return <Paper>
		<div data-beat={pose.beat} style={{ position: 'absolute', inset: 0 }}>
			<div data-testid="title" style={{ position: 'absolute', left: 80, top: lerp(62, 330, cover), fontFamily: HEAD, fontSize: lerp(50, 104, cover), lineHeight: 1.08, letterSpacing: lerp(-1, -4, cover), color: C.ink }}>{brief.title}</div>
			<div data-testid="attribution" style={{ position: 'absolute', right: 80, top: lerp(80, 600, cover), fontSize: lerp(22, 30, cover), letterSpacing: 2, color: C.muted, textTransform: 'uppercase' }}>{brief.attribution}</div>
			<div style={{ position: 'absolute', left: 80, top: 600, width: 83, height: 8, background: C.red, opacity: cover }}/>
			<div style={{ position: 'absolute', left: 80, top: 136, width: 920, height: 2, background: C.line, opacity: 1 - cover }}/>

			<div data-region="imagined-solution" style={{ position: 'absolute', left: 80, top: 190, width: 300, opacity: solution.shown * lerp(1, 0.45, solution.muted) }}>
				<Small>IMAGINED SOLUTION</Small>
				<div style={{ marginTop: 18, paddingLeft: 16, borderLeft: `3px solid ${C.line}` }}>
					{brief.solutionParts.map((part, index) => <div key={part} data-part={part} style={{ marginBottom: 14, padding: '20px 24px', border: `2px solid ${C.line}`, background: C.white, borderRadius: 9, fontSize: 34, transform: `translateX(${(1 - solution.shown) * (index + 1) * -14}px)` }}>{part}</div>)}
				</div>
				<div style={{ marginTop: 10, fontSize: 25, lineHeight: 1.3, color: C.muted }}>Parts of one imagined answer</div>
			</div>

			<div style={{ position: 'absolute', left: 394, top: 400, fontSize: 52, color: C.muted, opacity: pose.divider }}>≠</div>

			<div data-region="customer-outcomes">
				<div style={{ position: 'absolute', left: 450, top: 190, opacity: pose.outcomes.stock.shown }}><Small color={C.red}>SMALLER CUSTOMER PROBLEMS</Small></div>
				<Outcome id="stock" pose={pose.outcomes.stock}/>
				<div data-testid="feedback" style={{ position: 'absolute', left: 450, top: 462, width: 550, opacity: pose.feedback }}>
					<Small color={C.red}>FEEDBACK</Small>
					<div style={{ fontFamily: HEAD, fontSize: 32, color: C.red, marginTop: 6, transform: `translateY(${(1 - pose.feedback) * 12}px)` }}>“{brief.feedback}”</div>
				</div>
				<Outcome id="hours" pose={pose.outcomes.hours}/>
				<Outcome id="reservation" pose={pose.outcomes.reservation}/>
			</div>

			{caption && <div data-testid="caption" style={{ position: 'absolute', left: 82, right: 82, top: 900, height: 113, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 34, lineHeight: 1.26, color: C.ink }}>{caption}</div>}
		</div>
	</Paper>;
};
