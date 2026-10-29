import React from 'react';
import {Interactive} from 'remotion';
import {colors, Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const HoldingsBeforeInner: React.FC<SceneProps> = ({headline, support, style}) => (
	<Stage plate="holdings-work" seconds={3} framing="work" blur={6} shade={.34} style={style}>
		<Panel top={470} style={{padding: 40, boxSizing: 'border-box'}}>
			<Eyebrow>HOLDINGS REFRESH · BEFORE</Eyebrow>
			<div style={{fontSize: 42, lineHeight: 1.25, color: colors.muted, marginTop: 22}}>Eligibility</div>
			<Interactive.Div name="Old eligibility needs Connected and Entry" data-eligibility="connected-entry" style={{marginTop: 18, padding: '28px 30px', borderRadius: 12, background: '#e8eef1', fontSize: 54, fontWeight: 500, lineHeight: 1.2}}>
				{headline}
			</Interactive.Div>
			{support ? <div style={{fontSize: 40, lineHeight: 1.3, marginTop: 28, color: colors.ink}}>{support}</div> : null}
		</Panel>
	</Stage>
);

export const HoldingsBefore = Interactive.withSchema({Component: HoldingsBeforeInner, componentName: '<HoldingsBefore>', schema: sceneSchema, wrapInSequence: true});
