import type React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {blue, Heading, Label, Mark, ReviewLayout, Sheet} from './ReviewLayout';

const schema = {limitsAt: {type: 'number', default: 3.1, min: 0, hiddenFromList: false, description: 'Limits note reveal in seconds'}} as const;

const RewriteStoryScene: React.FC<{limitsAt: number; style?: React.CSSProperties}> = ({limitsAt, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <ReviewLayout style={style}>
		<Heading>Write it clearly.</Heading>
		<Sheet style={{padding: '38px 40px'}}>
			<Label color={blue}>TICKET + PROMPT</Label>
			<div style={{fontSize: 56, lineHeight: 1.17, fontWeight: 600, marginTop: 24}}>Demo CSV import with <Mark tone="example">10 rows</Mark>.</div>
			<div style={{fontSize: 53, lineHeight: 1.15, color: blue, fontWeight: 800, marginTop: 21}}>Ten is an example.</div>
		</Sheet>
		<Interactive.Div name="Actual limits belong in their own requirement" style={{
			marginTop: 30, padding: '26px 32px', background: '#e7edff', color: '#263b8f', borderRadius: 15, fontSize: 46, lineHeight: 1.15, fontWeight: 700,
			opacity: interpolate(frame, [limitsAt * fps, (limitsAt + .24) * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
		}}>Write any real limits separately.</Interactive.Div>
	</ReviewLayout>;
};

export const RewriteStory = Interactive.withSchema({Component: RewriteStoryScene, componentName: '<RewriteStory>', schema, wrapInSequence: true});
