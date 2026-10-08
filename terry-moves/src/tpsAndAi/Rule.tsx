import React from 'react';
import { InkPath, InkPerson, palette, serif, Shot, useSeconds } from './Frame';
import { cue, mix, progress, ruleStateAt, sceneById } from './film';

export const RulePicture: React.FC<{ seconds: number }> = ({ seconds }) => {
	const state = ruleStateAt(seconds);
	const learned = progress(seconds, cue('rule', 2), 1.2);
	return <div data-testid="learned-check" data-stopped={state.stopped} data-check-retained={state.check} data-gate={state.gate} data-human-response={state.responding} data-repaired={state.repaired} data-resumed={state.resumed}>
		<div style={{ position: 'absolute', left: 90, top: 123, fontFamily: serif, fontSize: 82, lineHeight: 1.12, letterSpacing: -2, opacity: progress(seconds, sceneById('rule').start, 0.8) }}>{state.resumed ? <>Learning<br />travels with the work.</> : state.check ? <>Empty list<br /><span style={{ color: palette.red }}>→ failure</span></> : <>A lesson<br />becomes a safeguard.</>}</div>
		<div style={{ position: 'absolute', left: 175, top: 420, width: 730, textAlign: 'center', fontFamily: serif, fontSize: 59, opacity: progress(seconds, cue('rule', 1), 0.7) * (1 - learned) }}>“The list must not be empty.”</div>
		<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}>
			<g opacity={1 - learned}><InkPerson x={198} y={650} reach={0.3} /><InkPath d="M320 525 Q555 514 871 525 L863 689 Q557 699 321 689 Z" color={palette.gray} amount={progress(seconds, sceneById('rule').start + 1, 1.4)} width={3} /><InkPath d="M345 632 Q466 621 528 628" amount={progress(seconds, cue('rule', 1), 1.2)} width={4} /></g>
			<g opacity={learned}>
				<InkPath d="M104 568 Q304 559 551 568 M583 569 Q770 564 973 568" color={palette.gray} amount={learned} width={3} opacity={0.5} />
				<path d="M524 432 Q509 567 522 704 M608 430 Q617 568 607 704" fill="none" stroke={palette.ink} strokeWidth="5" strokeLinecap="round" />
				<path d={state.stopped ? 'M550 455 L585 677 M584 455 L548 677' : 'M548 493 L566 514 L591 469'} fill="none" stroke={state.stopped ? palette.red : palette.ink} strokeWidth="7" strokeLinecap="round" />
				<g data-testid="input-token" data-empty={!state.repaired} transform={`translate(${state.inputX} 568)`}>
					<path d="M-40 -47 Q-49 0 -42 45 Q0 54 41 43 Q51 0 43 -46 Z" stroke={state.stopped && !state.repaired ? palette.red : palette.ink} strokeWidth="4" fill={palette.paper} />
					<path d="M-14 -16 L-23 -16 L-23 17 L-14 17 M14 -16 L23 -16 L23 17 L14 17" fill="none" stroke={palette.ink} strokeWidth="3" />
					{state.repaired && <path d="M-6 -3 Q0 -8 7 -1 L3 7 L-4 5 Z" fill={palette.ink} />}
				</g>
				<g data-testid="downstream-work" data-x={state.downstreamX} transform={`translate(${state.downstreamX} 568)`} opacity={0.55} stroke={palette.gray} strokeWidth="3" fill={palette.paper}><path d="M-23 -27 L25 -28 L26 27 L-24 28 Z" /><path d="M6 -11 L15 -11 M-12 1 L14 1 M-12 13 L6 13" /></g>
				<g opacity={progress(seconds, cue('rule', 4), 0.7)}>
					<g transform="translate(1120 0) scale(-1 1)"><InkPerson x={500} y={448} reach={progress(seconds, cue('rule', 4), 1.4)} /></g>
					<InkPath d="M615 454 Q657 424 646 399 Q639 379 616 385 M646 398 L655 369" amount={progress(seconds, cue('rule', 4) + 0.8, 1.2)} width={4} />
					<path d={`M${mix(631, 590, progress(seconds, cue('rule', 4) + 1.2, 1))} 444 L619 448`} stroke={palette.red} strokeWidth="5" strokeLinecap="round" />
				</g>
				{state.stopped && <text x="720" y="704" fontFamily="Arial, Helvetica, sans-serif" fontSize="50" fill={palette.red}>Stopped</text>}
				{state.resumed && <InkPath d="M627 757 Q781 762 947 750" amount={progress(seconds, state.resumeAt, 0.9)} width={5} />}
			</g>
		</svg>
	</div>;
};
export const Rule: React.FC = () => { const seconds = useSeconds('rule'); return <Shot seconds={seconds} id="rule"><RulePicture seconds={seconds} /></Shot>; };
