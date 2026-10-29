import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const DemoConsequenceInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const fourthSelected = frame >= .5 * fps;
	return <Stage plate="demo-v2" seconds={7.5} shade={.2} style={style}>
		<Panel top={890} style={{padding: 32, boxSizing: 'border-box', opacity: interpolate(frame, [3.3 * fps, 3.6 * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
			<div style={{fontSize: 54, fontWeight: 500, lineHeight: 1.2, marginBottom: 16}}>{headline}</div>
			{['Alex', 'Jo', 'Sam', 'Lee'].map((name, index) => {
				const selected = index < 3 || fourthSelected;
				return <div key={name} data-contact-row={index + 1} data-selected={selected} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 24, height: 80, padding: '0 14px', backgroundColor: index === 3 && fourthSelected ? '#e5edf2' : 'transparent', borderBottom: '1px solid #d8dfde'}}>
					<div style={{width: 42, height: 42, borderRadius: 7, border: `3px solid ${selected ? colors.blue : '#a6b4b9'}`, background: selected ? colors.blue : 'transparent', color: colors.paper, display: 'grid', placeItems: 'center', fontSize: 32, lineHeight: 1}}>{selected ? '✓' : null}</div>
					<div style={{width: 45, height: 45, borderRadius: '50%', background: '#d9e0df', display: 'grid', placeItems: 'center', fontSize: 26, color: colors.muted}}>{name[0]}</div>
					<div style={{fontSize: 44, fontWeight: 400}}>{name}</div>
				</div>;
			})}
			<Interactive.Div name="The fourth selection is blocked" data-error="contact-limit" style={{marginTop: 18, background: '#f4e2dc', color: colors.red, borderRadius: 9, padding: '14px 18px', fontSize: 44, lineHeight: 1.2, fontWeight: 500, opacity: interpolate(frame, [.65 * fps, .8 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>! {support}</Interactive.Div>
		</Panel>
	</Stage>;
};

export const DemoConsequence = Interactive.withSchema({Component: DemoConsequenceInner, componentName: '<DemoConsequence>', schema: sceneSchema, wrapInSequence: true});
