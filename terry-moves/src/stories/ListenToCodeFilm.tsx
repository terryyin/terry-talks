import React from 'react';
import {Audio} from '@remotion/media';
import {Composition, Folder, staticFile, useVideoConfig} from 'remotion';
import {Listen} from '../listenToCode/Listen';
import {InsideProduct} from '../listenToCode/InsideProduct';
import {Machines} from '../listenToCode/Machines';
import {Strain} from '../listenToCode/Strain';
import {Hearing} from '../listenToCode/Hearing';
import {Beyond} from '../listenToCode/Beyond';
import {ListenLanguageProvider, useListenLanguage} from '../listenToCode/language';

export const ListenToCode: React.FC = () => {
	const {fps} = useVideoConfig();
	const chinese = useListenLanguage() === 'zh-Hant';
	return <>
		<Audio name="An original score for listening and strain" src={staticFile('assets/listen-to-code/score-v4.wav')} premountFor={fps} volume={0.9}/>
		<Listen name="01 — Listen to your code" from={0} durationInFrames={2 * fps} premountFor={fps} headline={'Listen to\nyour code.'}/>
		<InsideProduct name="02 — The product serves; the code strains" from={2 * fps} durationInFrames={5 * fps} premountFor={fps} headline={chinese ? '產品服務使用者。\n程式碼卻在掙扎。' : 'The product serves.\nThe code strains.'} support={chinese ? '我們聆聽程式碼，理解產品的設計。' : 'We listened to understand its design.'}/>
		<Machines name="03 — The machines write and review" from={7 * fps} durationInFrames={2.5 * fps} premountFor={fps} headline={chinese ? 'AI 撰寫。' : 'AI writes.'} support={chinese ? 'AI 審查。' : 'AI reviews.'}/>
		<Strain name="04 — Small change, big strain" from={9.5 * fps} durationInFrames={2.5 * fps} premountFor={fps} headline={chinese ? '小改動，\n大阻力。' : 'Small change.\nBig strain.'} support={chinese ? '也是改善設計的契機。' : 'A chance to improve the design.'}/>
		<Hearing name="05 — How do we hear it now" from={12 * fps} durationInFrames={3 * fps} premountFor={fps} headline={chinese ? '現在，\n該如何聆聽？' : 'How do we\nhear it now?'} support={chinese ? '如果我們讀的程式碼變少，' : 'If we read less code,'}/>
		<Beyond name="06 — Beyond code, an open question" from={15 * fps} durationInFrames={5 * fps} premountFor={fps} headline={chinese ? '除了程式碼，\n還能如何看出\n產品是否已準備好\n迎接改變？' : 'Beyond code,\nwhat tells us\na product is ready\nfor change?'} support={chinese ? '這是個開放的問題。' : 'An open question.'}/>
	</>;
};

const ListenToCodeTraditionalChinese: React.FC = () => <ListenLanguageProvider language="zh-Hant"><ListenToCode/></ListenLanguageProvider>;

export const ListenToCodeFilm: React.FC = () => <>
	<Composition id="ListenToCodeFilm" component={ListenToCode} durationInFrames={600} fps={30} width={1080} height={1080}/>
	<Composition id="ListenToCodeFilmZhHant" component={ListenToCodeTraditionalChinese} durationInFrames={600} fps={30} width={1080} height={1080}/>
	<Folder name="Listen-To-Code-Acts">
		<Composition id="ListenToCodeListen" component={Listen} durationInFrames={60} fps={30} width={1080} height={1080} defaultProps={{headline: 'Listen to\nyour code.'}}/>
		<Composition id="ListenToCodeInsideProduct" component={InsideProduct} durationInFrames={150} fps={30} width={1080} height={1080} defaultProps={{headline: 'The product serves.\nThe code strains.', support: 'We listened to understand its design.'}}/>
		<Composition id="ListenToCodeMachines" component={Machines} durationInFrames={75} fps={30} width={1080} height={1080} defaultProps={{headline: 'AI writes.', support: 'AI reviews.'}}/>
		<Composition id="ListenToCodeStrain" component={Strain} durationInFrames={75} fps={30} width={1080} height={1080} defaultProps={{headline: 'Small change.\nBig strain.', support: 'A chance to improve the design.'}}/>
		<Composition id="ListenToCodeHearing" component={Hearing} durationInFrames={90} fps={30} width={1080} height={1080} defaultProps={{headline: 'How do we\nhear it now?', support: 'If we read less code,'}}/>
		<Composition id="ListenToCodeBeyond" component={Beyond} durationInFrames={150} fps={30} width={1080} height={1080} defaultProps={{headline: 'Beyond code,\nwhat tells us\na product is ready\nfor change?', support: 'An open question.'}}/>
	</Folder>
</>;
