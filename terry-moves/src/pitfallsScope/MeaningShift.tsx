import React from 'react';
import {AbsoluteFill, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, type SceneProps, sceneSchema} from './Stage';

const MeaningShiftInner: React.FC<SceneProps> = ({headline, support, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <AbsoluteFill style={{pointerEvents: 'none', fontFamily: 'PitfallsPoppins', ...style}}>
		<Interactive.Div name="The changing meaning of three" style={{position: 'absolute', left: 170, top: interpolate(frame, [1.8 * fps, 2.55 * fps], [860, 675], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), width: 400, fontSize: 44, lineHeight: 1.2, fontWeight: 500, letterSpacing: 2.8}}>
			<div data-three-meaning="example" style={{position: 'absolute', color: colors.green, opacity: interpolate(frame, [1.8 * fps, 2.15 * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{headline}</div>
			<div data-three-meaning="maximum" style={{position: 'absolute', color: colors.red, opacity: interpolate(frame, [1.8 * fps, 2.15 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{support}</div>
		</Interactive.Div>
		<Interactive.Div name="The same three moves from example to prompt" data-transferred-number style={{position: 'absolute', left: 650, top: interpolate(frame, [1.8 * fps, 2.55 * fps], [815, 630], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), fontSize: 94, lineHeight: 1, fontWeight: 500, color: frame < 2.05 * fps ? colors.green : colors.red}}>3</Interactive.Div>
	</AbsoluteFill>;
};

export const MeaningShift = Interactive.withSchema({Component: MeaningShiftInner, componentName: '<MeaningShift>', schema: sceneSchema, wrapInSequence: true});
