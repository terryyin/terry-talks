import type React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {blue, Heading, Label, Mark, red, ReviewLayout, Sheet} from './ReviewLayout';

const schema = {promptAt: {type: 'number', default: 6.5, min: 0, hiddenFromList: false, description: 'Prompt reveal in seconds'}} as const;

const StoryAndPromptScene: React.FC<{promptAt: number; style?: React.CSSProperties}> = ({promptAt, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <ReviewLayout style={style}>
		<Heading>Trace the number.</Heading>
		<Sheet style={{padding: '35px 38px'}}>
			<Label color={blue}>FIRST USER STORY</Label>
			<div style={{fontSize: 60, lineHeight: 1.18, marginTop: 20}}>Demo CSV import with <Mark tone="example">10 rows</Mark>.</div>
			<div style={{color: blue, fontSize: 36, fontWeight: 800, marginTop: 22}}>DEMO EXAMPLE</div>
		</Sheet>
		<Interactive.Div name="The same number becomes a limit" style={{
			marginTop: 35,
			opacity: interpolate(frame, [promptAt * fps, (promptAt + .28) * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
			translate: interpolate(frame, [promptAt * fps, (promptAt + .28) * fps], ['0px 24px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
		}}>
			<div style={{height: 52, width: 6, background: '#8291b5', margin: '-35px 0 0 62px'}}/>
			<Sheet style={{padding: '35px 38px'}}>
				<Label color={red}>PROMPT TO CODING AGENT</Label>
				<div style={{fontSize: 60, lineHeight: 1.18, marginTop: 20}}>Limit CSV imports to <Mark tone="limit">10 rows</Mark>.</div>
				<div style={{color: red, fontSize: 36, fontWeight: 800, marginTop: 22}}>HARD MAXIMUM</div>
			</Sheet>
		</Interactive.Div>
	</ReviewLayout>;
};

export const StoryAndPrompt = Interactive.withSchema({Component: StoryAndPromptScene, componentName: '<StoryAndPrompt>', schema, wrapInSequence: true});
