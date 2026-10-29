import type React from 'react';
import {loadFont} from '@remotion/fonts';
import {AbsoluteFill, cancelRender, staticFile} from 'remotion';
import {OddEMark} from './OddEMark';
import {traditionalChineseFont, useListenLanguage} from './language';

void Promise.all([
	loadFont({family: 'ListenPoppins', url: staticFile('assets/fonts/poppins/Poppins-Regular.ttf'), weight: '400'}),
	loadFont({family: 'ListenPoppins', url: staticFile('assets/fonts/poppins/Poppins-Medium.ttf'), weight: '500'}),
	loadFont({family: 'ListenPoppins', url: staticFile('assets/fonts/poppins/Poppins-SemiBold.ttf'), weight: '600'}),
	loadFont({family: 'ListenNotoSansTC', url: staticFile('assets/fonts/noto-sans-tc-listen/NotoSansTC-Listen.ttf'), weight: '400'}),
	loadFont({family: 'ListenNotoSansTC', url: staticFile('assets/fonts/noto-sans-tc-listen/NotoSansTC-Listen.ttf'), weight: '500'}),
	loadFont({family: 'ListenNotoSansTC', url: staticFile('assets/fonts/noto-sans-tc-listen/NotoSansTC-Listen.ttf'), weight: '600'}),
]).catch(cancelRender);

export type ActProps = {
	readonly headline: string;
	readonly support: string;
	readonly style?: React.CSSProperties;
};

export const actSchema = {
	headline: {type: 'text-content', default: '', description: 'Headline'},
	support: {type: 'text-content', default: '', description: 'Supporting thought'},
} as const;

export const Stage: React.FC<{
	readonly children: React.ReactNode;
	readonly paper: string;
	readonly ink: string;
	readonly showCornerMark?: boolean;
	readonly style?: React.CSSProperties;
}> = ({children, paper, ink, showCornerMark = true, style}) => {
	const language = useListenLanguage();
	return <AbsoluteFill lang={language} style={{backgroundColor: paper, color: ink, fontFamily: language === 'zh-Hant' ? traditionalChineseFont : 'ListenPoppins', overflow: 'hidden', ...style}}>
	{children}
	<svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.18}}>
		<defs>
			<filter id="listen-paper-grain"><feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves={3} stitchTiles="stitch" seed={14}/><feColorMatrix type="saturate" values="0"/></filter>
		</defs>
		<rect width="1080" height="1080" filter="url(#listen-paper-grain)" opacity="0.36"/>
	</svg>
	{showCornerMark ? <div style={{position: 'absolute', top: 42, right: 64}}><OddEMark size={76} ink={ink} paper={paper}/></div> : null}
	</AbsoluteFill>;
};
