import React from 'react';
import {CanvasImage, Easing, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {actSchema, type ActProps, Stage} from './Stage';

const StrainInner: React.FC<ActProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage paper="#e9ecd9" ink="#17251c" style={style}>
		<Interactive.Div name="Small change, big strain" style={{position: 'absolute', top: 112, left: 80, width: 920, fontSize: 128, lineHeight: 1.04, letterSpacing: -6, fontWeight: 600, whiteSpace: 'pre-line', translate: interpolate(frame, [0, 0.45 * fps], ['0px 28px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)})}}>{headline}</Interactive.Div>
		<CanvasImage name="The same code creature strains inside the functioning product" src={staticFile('assets/listen-to-code/inside-product.png')} premountFor={fps} style={{position: 'absolute', left: 60, top: 390, width: 960, height: 505, objectFit: 'contain', transformOrigin: '50% 55%', scale: interpolate(frame, [0, 2.5 * fps], [1, 1.02], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}/>
		<Interactive.Div name="Opportunity in the strain" style={{position: 'absolute', left: 82, top: 910, width: 920, fontSize: 44, fontWeight: 500, color: '#9f4439', opacity: interpolate(frame, [0.2 * fps, 0.45 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{support}</Interactive.Div>
	</Stage>;
};

export const Strain = Interactive.withSchema({Component: StrainInner, componentName: '<Strain>', schema: actSchema, wrapInSequence: true});
