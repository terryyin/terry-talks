import React from 'react';
import {CanvasImage, Easing, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig, type InteractivitySchema} from 'remotion';
import {type ActProps, Stage} from './Stage';

const InsideProductInner: React.FC<ActProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Stage paper="#e9ecd9" ink="#17251c" style={style}>
		<Interactive.Div name="The product serves; the code strains" style={{position: 'absolute', top: 80, left: 80, width: 920, whiteSpace: 'pre-line', fontSize: 76, lineHeight: 1.12, letterSpacing: -3, fontWeight: 600, translate: interpolate(frame, [0, 0.45 * fps], ['0px 16px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1)})}}>{headline}</Interactive.Div>
		<CanvasImage name="The code’s strain becomes something a developer can hear" src={staticFile('assets/listen-to-code/inside-product.png')} premountFor={fps} style={{position: 'absolute', left: 60, top: 250, width: 960, height: 640, objectFit: 'contain', transformOrigin: '50% 55%', opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), scale: interpolate(frame, [0, 5 * fps], [0.99, 1.025], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}/>
		<Interactive.Div name="Why we listened" style={{position: 'absolute', top: 930, left: 82, width: 920, whiteSpace: 'pre-line', fontSize: 40, lineHeight: 1.25, letterSpacing: -0.9, fontWeight: 500, color: '#276d3e', opacity: interpolate(frame, [0.65 * fps, 1 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{support}</Interactive.Div>
	</Stage>;
};

const insideProductSchema = {
	headline: {type: 'text-content', default: '', description: 'The product’s external purpose'},
	support: {type: 'text-content', default: '', description: 'Why developers listened to the code'},
} as const satisfies InteractivitySchema;

export const InsideProduct = Interactive.withSchema({Component: InsideProductInner, componentName: '<InsideProduct>', schema: insideProductSchema, wrapInSequence: true});
