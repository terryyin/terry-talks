import type React from 'react';
import {loadFont} from '@remotion/fonts';
import {AbsoluteFill, cancelRender, Interactive, staticFile} from 'remotion';

void Promise.all([
	loadFont({family: 'PitfallsPoppins', url: staticFile('assets/fonts/poppins/Poppins-Regular.ttf'), weight: '400'}),
	loadFont({family: 'PitfallsPoppins', url: staticFile('assets/fonts/poppins/Poppins-Medium.ttf'), weight: '500'}),
	loadFont({family: 'PitfallsPoppins', url: staticFile('assets/fonts/poppins/Poppins-SemiBold.ttf'), weight: '600'}),
]).catch(cancelRender);

export const colors = {ink: '#172d3b', paper: '#f5f5f0', muted: '#5c707c', blue: '#3c6580', green: '#2f735f', red: '#b44b3b'};
export type SceneProps = {readonly headline: string; readonly support?: string; readonly style?: React.CSSProperties};
export const sceneSchema = {
	headline: {type: 'text-content', default: '', description: 'Main text'},
	support: {type: 'text-content', default: '', description: 'Supporting text'},
} as const;

/** Ink field and series header until artwork plates are present. */
export const Stage: React.FC<{readonly children: React.ReactNode; readonly style?: React.CSSProperties}> = ({children, style}) => (
	<AbsoluteFill style={{backgroundColor: colors.ink, color: colors.paper, fontFamily: 'PitfallsPoppins', overflow: 'hidden', ...style}}>
		<Interactive.Div name="Series, episode and AI disclosure" data-negation-header style={{position: 'absolute', left: 90, top: 140, right: 180, padding: '18px 24px', borderRadius: 12, background: '#10232de8', fontSize: 30, letterSpacing: 2.2, lineHeight: 1.3, fontWeight: 500}}>AI AUGMENTED<br/>DEVELOPMENT PITFALLS <span style={{opacity: 0.7}}> / 02</span><div style={{fontSize: 25, letterSpacing: .3, fontWeight: 400, marginTop: 10}}>AI-generated scenes &amp; voices</div></Interactive.Div>
		{children}
	</AbsoluteFill>
);
