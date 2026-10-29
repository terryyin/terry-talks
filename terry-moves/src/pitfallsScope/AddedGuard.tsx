import React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Eyebrow, Panel, type SceneProps, sceneSchema, Stage} from './Stage';

const AddedGuardInner: React.FC<SceneProps> = ({headline, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const added = interpolate(frame, [.35 * fps, .8 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return <Stage plate="interpretation" seconds={2.9} blur={10} shade={.34} style={style}>
		<Panel top={650}>
			<Eyebrow>THE ADDED RULE</Eyebrow>
			<div style={{fontSize: 57, fontWeight: 500, lineHeight: 1.2, marginTop: 25}}>{headline}</div>
			<div style={{marginTop: 44, background: '#152b38', color: '#edf3ef', padding: '30px 24px', borderRadius: 10, fontFamily: 'monospace', fontSize: 43, lineHeight: 1.55}}>
				<Interactive.Div name="The additional count guard" style={{opacity: added, color: '#ffbd9f', whiteSpace: 'pre-line'}}>{'if (count > 3) reject();'}</Interactive.Div>
				<div>tagContacts(selected);</div>
			</div>
		</Panel>
	</Stage>;
};

export const AddedGuard = Interactive.withSchema({Component: AddedGuardInner, componentName: '<AddedGuard>', schema: sceneSchema, wrapInSequence: true});
