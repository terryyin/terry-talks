import type React from 'react';
import {loadFont} from '@remotion/fonts';
import {AbsoluteFill, CanvasImage, cancelRender, Easing, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

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

export const Stage: React.FC<{readonly plate: string; readonly seconds: number; readonly children: React.ReactNode; readonly blur?: number; readonly shade?: number; readonly style?: React.CSSProperties}> = ({plate, seconds, children, blur = 0, shade = 0.1, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <AbsoluteFill style={{backgroundColor: colors.ink, color: colors.paper, fontFamily: 'PitfallsPoppins', overflow: 'hidden', ...style}}>
		<CanvasImage name="The refinement team" src={staticFile(`assets/pitfalls-scope/${plate}.png`)} premountFor={fps} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: blur ? `blur(${blur}px)` : undefined, scale: interpolate(frame, [0, seconds * fps], [1.015, 1.075], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), transformOrigin: '50% 44%'}}/>
		<AbsoluteFill style={{background: `linear-gradient(180deg, rgba(10,24,34,.68) 0%, rgba(10,24,34,${shade}) 28%, rgba(10,24,34,${shade}) 55%, rgba(10,24,34,.9) 100%)`}}/>
		<Interactive.Div name="Series and episode" style={{position: 'absolute', left: 90, top: 108, right: 136, fontSize: 31, letterSpacing: 3.1, lineHeight: 1.45, fontWeight: 500}}>AI AUGMENTED<br/>DEVELOPMENT PITFALLS <span style={{opacity: 0.62}}> / 01</span></Interactive.Div>
		{children}
	</AbsoluteFill>;
};

export const Panel: React.FC<{readonly children: React.ReactNode; readonly top?: number; readonly style?: React.CSSProperties}> = ({children, top = 780, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return <Interactive.Div name="The current point of attention" style={{position: 'absolute', left: 90, top, width: 856, padding: 48, backgroundColor: colors.paper, color: colors.ink, borderRadius: 16, boxShadow: '0 24px 80px #071b2c55', translate: interpolate(frame, [0, 0.55 * fps], ['0px 24px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.2, .75, .2, 1)}), ...style}}>{children}</Interactive.Div>;
};

export const Eyebrow: React.FC<{readonly children: React.ReactNode; readonly color?: string}> = ({children, color = colors.muted}) => <div style={{fontSize: 29, letterSpacing: 2.6, fontWeight: 500, lineHeight: 1.5, color}}>{children}</div>;
