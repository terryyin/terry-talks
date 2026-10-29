import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const DemoConsequenceInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const fourthSelected = frame >= .6 * fps;
	const pressingTag = frame >= .7 * fps && frame < .8 * fps;
	const rejected = frame >= .8 * fps;
	return <Stage plate="demo-v2" seconds={3.6} framing="work" shade={.2} style={style}>
		<Panel top={430} style={{width: 810, padding: 32, boxSizing: 'border-box'}}>
			<div style={{fontSize: 52, fontWeight: 500, lineHeight: 1.2, marginBottom: 8}}>{headline}</div>
			<div data-selection-count style={{fontSize: 34, lineHeight: 1.25, color: colors.muted, marginBottom: 16}}>{fourthSelected ? 4 : 3} contacts selected</div>
			{['Alex', 'Jo', 'Sam', 'Lee'].map((name, index) => {
				const selected = index < 3 || fourthSelected;
				return <div key={name} data-contact-row={index + 1} data-selected={selected} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 22, height: 68, padding: '0 14px', backgroundColor: index === 3 && fourthSelected ? '#e5edf2' : 'transparent', borderBottom: '1px solid #d8dfde'}}>
					<div style={{width: 38, height: 38, borderRadius: 7, border: `3px solid ${selected ? colors.blue : '#a6b4b9'}`, background: selected ? colors.blue : 'transparent', color: colors.paper, display: 'grid', placeItems: 'center', fontSize: 29, lineHeight: 1}}>{selected ? '✓' : null}</div>
					<div style={{width: 40, height: 40, borderRadius: '50%', background: '#d9e0df', display: 'grid', placeItems: 'center', fontSize: 24, color: colors.muted}}>{name[0]}</div>
					<div style={{fontSize: 40, fontWeight: 400}}>{name}</div>
				</div>;
			})}
			<Interactive.Div name="Apply the tag to the selected contacts" data-tag-button data-pressed={pressingTag} style={{marginTop: 22, height: 74, borderRadius: 10, background: pressingTag ? '#24465e' : colors.blue, color: colors.paper, display: 'grid', placeItems: 'center', fontSize: 40, fontWeight: 500, scale: interpolate(frame, [.7 * fps, .75 * fps, .8 * fps], [1, .97, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Tag {fourthSelected ? 4 : 3} contacts</Interactive.Div>
			<Interactive.Div name="The tag application is rejected" data-error="contact-limit" data-tag-status={rejected ? 'rejected' : 'ready'} style={{marginTop: 18, minHeight: 100, boxSizing: 'border-box', background: '#f4e2dc', color: colors.red, borderRadius: 9, padding: '12px 18px', opacity: interpolate(frame, [.76 * fps, .8 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
				<div style={{fontSize: 40, lineHeight: 1.2, fontWeight: 500}}>! {support}</div>
				<div style={{fontSize: 32, lineHeight: 1.25, marginTop: 4}}>Tag not applied</div>
			</Interactive.Div>
		</Panel>
	</Stage>;
};

export const DemoConsequence = Interactive.withSchema({Component: DemoConsequenceInner, componentName: '<DemoConsequence>', schema: sceneSchema, wrapInSequence: true});
