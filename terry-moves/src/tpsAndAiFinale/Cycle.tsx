import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { palette, serif } from '../tpsAndAi/Frame';
import { DirectedHeading } from '../tpsAndAiJit/DirectedHeading';
import { CycleNode, cycleTimeline, headingDirections } from './direction';
import { Shot, useSeconds } from './Frame';
import { sceneById } from './film';

const Node: React.FC<React.PropsWithChildren<{ id: CycleNode; focus: CycleNode; left: number; top: number; title: string }>> = ({ id, focus, left, top, title, children }) => <div data-cycle-node={id} data-current={focus === id} style={{ position: 'absolute', left, top, width: 398, height: 158, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: focus === id ? palette.red : palette.ink }}>
	<div style={{ fontFamily: serif, fontSize: 56, lineHeight: 1.15, letterSpacing: -1.5 }}>{title}</div>
	<div style={{ marginTop: 12, fontSize: 32, lineHeight: 1.2, color: palette.gray }}>{children}</div>
</div>;

export const Cycle: React.FC = () => {
	const seconds = useSeconds('cycle');
	const scene = sceneById('cycle');
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const performance = useMemo(() => cycleTimeline(fps), [fps]);
	const focus = performance.poseAt(frame);
	return <Shot id="cycle" seconds={seconds}>
		<DirectedHeading direction={headingDirections.cycle} seconds={seconds - scene.start} />
		<svg data-testid="reinforcing-cycle" width={1080} height={1080} style={{ position: 'absolute', inset: 0 }} fill="none" stroke={palette.gray} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
			<defs><marker id="finale-arrow" viewBox="0 0 12 12" refX={10} refY={6} markerWidth={12} markerHeight={12} orient="auto-start-reverse"><path d="M2 2 L10 6 L2 10" /></marker></defs>
			<path d="M93 366 L465 364 L468 503 L91 507 Z" />
			<path d="M612 365 L989 367 L987 507 L615 504 Z" />
			<path d="M614 659 L988 661 L990 799 L613 802 Z" />
			<path d="M92 660 L467 657 L470 802 L91 801 Z" />
			<path data-cycle-arrow="safeguards-freedom" d="M488 435 Q541 429 589 435" markerEnd="url(#finale-arrow)" stroke={focus === 'freedom' ? palette.red : palette.gray} />
			<path data-cycle-arrow="freedom-capability" d="M802 529 Q808 579 802 628" markerEnd="url(#finale-arrow)" stroke={focus === 'capability' ? palette.red : palette.gray} />
			<path data-cycle-arrow="capability-trust" d="M590 728 Q543 735 490 728" markerEnd="url(#finale-arrow)" stroke={focus === 'trust' ? palette.red : palette.gray} />
			<path data-cycle-arrow="trust-safeguards" d="M278 634 Q272 580 278 532" markerEnd="url(#finale-arrow)" stroke={focus === 'safeguards' ? palette.red : palette.gray} />
			<path d="M426 580 Q538 558 654 579" stroke={palette.gray} opacity={0.35} />
		</svg>
		<Node id="safeguards" focus={focus} left={80} top={354} title="Safeguards">preserve learning</Node>
		<Node id="freedom" focus={focus} left={604} top={354} title="Freedom">attention to think</Node>
		<Node id="capability" focus={focus} left={604} top={648} title="Capability">judgment to act</Node>
		<Node id="trust" focus={focus} left={80} top={648} title="Trust">respond to real needs</Node>
		<div style={{ position: 'absolute', left: 366, right: 366, top: 546, fontFamily: serif, fontSize: 36, textAlign: 'center', color: palette.gray }}>Keep learning</div>
	</Shot>;
};
