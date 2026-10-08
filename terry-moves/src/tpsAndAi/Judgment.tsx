import React from 'react';
import { Heading, palette, serif, Shot, useSeconds } from './Frame';
import { cue, progress } from './film';
export const JudgmentPicture: React.FC<{ seconds: number }> = ({ seconds }) => <>
	<Heading style={{ fontSize: 74 }}>Keep the judgment.</Heading>
	<div style={{ position: 'absolute', left: 90, right: 90, top: 290, display: 'flex', flexDirection: 'column', gap: 38 }}>
		<div style={{ display: 'flex', alignItems: 'baseline', gap: 45 }}><span style={{ fontFamily: serif, fontSize: 72, width: 310 }}>Solve</span><span style={{ fontSize: 49, color: palette.gray }}>Human judgment</span></div>
		<div style={{ display: 'flex', alignItems: 'baseline', gap: 45, opacity: progress(seconds, cue('judgment', 1), 0.7) }}><span style={{ fontFamily: serif, fontSize: 72, width: 310 }}>Preserve</span><span style={{ fontSize: 49, color: palette.gray }}>Known rules</span></div>
		<div style={{ display: 'flex', alignItems: 'baseline', gap: 45, opacity: progress(seconds, cue('judgment', 2), 0.7) }}><span style={{ fontFamily: serif, fontSize: 72, width: 310, color: palette.red }}>Protect</span><span style={{ fontSize: 47, lineHeight: 1.2 }}>Simple checks<br />Clear evidence</span></div>
	</div>
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0, opacity: progress(seconds, cue('judgment', 1), 0.7) }}>
		<text x="95" y="805" fontSize="42" fill={palette.gray}>Known rule</text>
		<path d="M340 790 H540 M521 778 L540 790 L521 802" fill="none" stroke={palette.ink} strokeWidth="4" />
		<g data-testid="closed-software-stop" data-work-blocked="true"><rect x="555" y="747" width="146" height="76" rx="4" fill={palette.red} /><text x="628" y="799" textAnchor="middle" fontSize="43" fill={palette.paper}>STOP</text><path d="M704 733 V837" stroke={palette.red} strokeWidth="7" /></g>
		<path d="M730 790 H955" fill="none" stroke={palette.gray} strokeWidth="4" opacity="0.2" />
	</svg>
</>;
export const Judgment: React.FC = () => { const seconds = useSeconds('judgment'); return <Shot seconds={seconds} id="judgment"><JudgmentPicture seconds={seconds} /></Shot>; };
