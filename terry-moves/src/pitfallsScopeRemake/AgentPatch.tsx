import type React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Heading, Label, mono, red, ReviewLayout, Sheet} from './ReviewLayout';

const schema = {heading: {type: 'text-content', default: 'The agent adds a check.', description: 'Patch title'}} as const;

const AgentPatchScene: React.FC<{heading: string; style?: React.CSSProperties}> = ({heading, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <ReviewLayout style={style}>
		<Heading>{heading}</Heading>
		<Sheet style={{background: '#19273d', color: '#f7faff', borderColor: '#19273d'}}>
			<div style={{background: '#253852', padding: '25px 32px'}}><Label color="#e5edff">AGENT PATCH · import.ts</Label></div>
			<div style={{padding: '39px 32px', fontSize: 47, lineHeight: 1.43, fontFamily: mono, whiteSpace: 'pre'}}>
				<span style={{color: '#aaccff'}}>if</span>{' (rows.length > '}<span style={{color: '#ffd18d', fontWeight: 800}}>10</span>{') {\n  rejectImport();\n}'}
			</div>
		</Sheet>
		<Interactive.Div name="The patch explains the rejection" style={{
			marginTop: 30, padding: '25px 32px', background: '#fce5e7', color: red, borderRadius: 15, fontSize: 49, fontWeight: 800,
			opacity: interpolate(frame, [.38 * fps, .68 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
		}}>11 valid rows → blocked</Interactive.Div>
	</ReviewLayout>;
};

export const AgentPatch = Interactive.withSchema({Component: AgentPatchScene, componentName: '<AgentPatch>', schema, wrapInSequence: true});
