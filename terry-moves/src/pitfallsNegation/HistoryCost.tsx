import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const HistoryCostInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage plate="holdings-work" seconds={4.5} framing="work" blur={8} shade={.42} style={style}>
		<Panel top={400} style={{padding: 36, boxSizing: 'border-box'}}>
			<Eyebrow color={colors.red}>SUITE &amp; DOCS · STILL CARRYING HISTORY</Eyebrow>
			<div style={{marginTop: 22, display: 'grid', gap: 16}}>
				{['test: entry must not be required', 'scan: no EntryStarted gate', 'Docs · Refresh does not require entry', 'FAQ · Why we dropped entry setup'].map((line, index) => (
					<div key={line} data-history-clutter={index + 1} style={{padding: '18px 22px', borderRadius: 10, background: index % 2 ? '#f0e6e2' : '#e8eef1', fontSize: 36, lineHeight: 1.25, fontWeight: 500, opacity: interpolate(frame, [index * .18 * fps, index * .18 * fps + .25 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [index * .18 * fps, index * .18 * fps + .3 * fps], ['0px 12px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{line}</div>
				))}
			</div>
			<Interactive.Div name="History still occupies the suite" data-cost-line style={{marginTop: 28, fontSize: 44, fontWeight: 500, lineHeight: 1.25, letterSpacing: -1, color: colors.ink}}>{headline}</Interactive.Div>
		</Panel>
	</Stage>;
};

export const HistoryCost = Interactive.withSchema({Component: HistoryCostInner, componentName: '<HistoryCost>', schema: sceneSchema, wrapInSequence: true});
