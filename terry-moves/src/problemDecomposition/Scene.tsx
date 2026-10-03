import React from 'react';
import { AbsoluteFill } from 'remotion';
import { bodyFont, captionTop, headlineFont, palette } from './design';
import { captionAt, captionRanges, FilmScene, filmScript, mix, reveal, sceneAt } from './film';
import { cue, DinnerWorld, Headline, SceneProps, wordCue } from './elements';
import { Premises } from './premises';
import { Stop, Value } from './goals';
import { Commit, Fractal, Vertical } from './principles';
import { Ending, Health } from './health';
import { PartIcon, Receipt, SplitPhone } from './objects';

export const CaptionBar: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	const opacity = caption ? Math.min(reveal(seconds, caption.start, 0.12), reveal(caption.end - seconds, 0, 0.1)) : 0;
	const finalCredit = sceneAt(seconds).id === 'end' && caption && seconds >= caption.speechEnd;
	return (
		<div style={{ position: 'absolute', left: 0, right: 0, top: captionTop, bottom: 0, background: palette.paper, borderTop: `1px solid ${palette.rule}`, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '18px 68px 29px', boxSizing: 'border-box' }}>
			<div style={{ fontFamily: bodyFont, fontSize: 43, fontWeight: 450, color: palette.ink, lineHeight: 1.2, textAlign: 'center', opacity }}>{caption?.text}</div>
			{finalCredit && <div style={{ position: 'absolute', bottom: 11, left: 0, right: 0, textAlign: 'center', fontFamily: bodyFont, fontSize: 13, color: palette.muted, letterSpacing: 1.2 }}>{filmScript.voiceCredit}</div>}
		</div>
	);
};

const Eyebrow: React.FC<{ scene: FilmScene }> = ({ scene }) => (
	<div style={{ position: 'absolute', top: 31, left: 67, right: 67, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: scene.id === 'stop' ? palette.paperLight : palette.muted, fontFamily: bodyFont, fontSize: 18, letterSpacing: 2.4, textTransform: 'uppercase' }}>
		<span>Problem decomposition</span><span>{scene.id === 'hook' ? '02' : scene.label}</span>
	</div>
);

const Hook: React.FC<{ time: number; scene: FilmScene }> = ({ time, scene }) => {
	const length = scene.end - scene.start;
	const dinnerStart = (captionRanges(scene)[2]?.start ?? scene.start + length * 0.65) - scene.start;
	const dinner = reveal(time, dinnerStart, 0.6);
	const bill = reveal(time, dinnerStart + 1.4, 0.65);
	return (
		<>
			<DinnerWorld zoom={mix(1.025, 1, Math.min(1, time / length))} />
			<Headline opacity={1 - dinner}>Stopped tomorrow.<br /><em style={{ color: palette.cobalt }}>What still works?</em></Headline>
			<Headline opacity={dinner}>Three friends.<br /><em style={{ color: palette.cobalt }}>One dinner bill.</em></Headline>
			<div style={{ position: 'absolute', left: 438, top: mix(810, 621, bill), opacity: bill, transform: `rotate(${mix(-12, -5, bill)}deg)` }}><Receipt width={206} /></div>
			<div style={{ position: 'absolute', top: 258, right: 70, color: palette.ink, fontFamily: bodyFont, fontSize: 20, letterSpacing: 2, opacity: 1 - dinner, transform: `translateY(${mix(10, 0, reveal(time, 0.4))}px)` }}>
				<svg width="38" height="38" viewBox="0 0 38 38" style={{ verticalAlign: 'middle', marginRight: 12 }}><circle cx="19" cy="19" r="16" fill="none" stroke={palette.ink} strokeWidth="1.5" /><path d="M19 9 V19 H27" fill="none" stroke={palette.ink} strokeWidth="2" strokeLinecap="round" /></svg>
				A QUESTION WORTH ASKING
			</div>
		</>
	);
};

const Parts: React.FC<SceneProps> = ({ time, scene }) => {
	const words = reveal(time, 0.2, 0.7);
	return (
		<>
			<DinnerWorld y={150} zoom={1.005} />
			<Headline>An answer has parts.<br /><em style={{ color: palette.cobalt }}>The customer still waits.</em></Headline>
			<svg width="1080" height="900" style={{ position: 'absolute', left: 0, top: 0 }}>
				<path d="M218 637 L218 618 L540 618 L540 637 M540 618 L862 618 L862 637" fill="none" stroke={palette.paperLight} strokeWidth="3" strokeDasharray="5 7" opacity={words} />
			</svg>
			{(['database', 'api', 'screen'] as const).map((part, index) => {
				const shown = reveal(time, wordCue(scene, 0, part), 0.72);
				return (
					<div key={part} style={{ position: 'absolute', left: 70 + index * 322, top: mix(890, 646, shown), width: 296, height: 190, opacity: shown, transform: `rotate(${mix(index === 0 ? -8 : 8, 0, shown)}deg)`, background: palette.cobalt, border: `1px solid ${palette.ink}`, boxShadow: '8px 12px 0 #172c4227', color: palette.paperLight, boxSizing: 'border-box', padding: '25px 26px' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><PartIcon part={part} /><span style={{ fontFamily: headlineFont, fontSize: 27, opacity: 0.58 }}>0{index + 1}</span></div>
						<div style={{ fontFamily: headlineFont, fontSize: 38, marginTop: 13 }}>{['Database', 'API', 'Screen'][index]}</div>
					</div>
				);
			})}
		</>
	);
};

const PossibilityCard: React.FC<{ index: number; title: string; subtitle: string; selected: boolean; advance: number }> = ({ index, title, subtitle, selected, advance }) => (
	<div style={{ position: 'absolute', left: 52 + index * 328, top: mix(250, selected ? 270 : 244, advance), width: 310, height: 134, boxSizing: 'border-box', padding: '18px 19px', background: selected ? palette.cobalt : palette.paperLight, color: selected ? palette.paperLight : palette.ink, border: `1px solid ${selected ? palette.cobalt : palette.rule}`, boxShadow: selected ? '5px 8px 0 #172c4224' : '3px 5px 0 #172c4212', transform: `scale(${selected ? mix(1, 1.01, advance) : mix(1, 0.94, advance)})`, transformOrigin: '50% 50%', zIndex: selected ? 2 : 1 }}>
		<div style={{ fontFamily: bodyFont, fontSize: 15, letterSpacing: 1.8, textTransform: 'uppercase', opacity: 0.72 }}>{subtitle}</div>
		<div style={{ fontFamily: headlineFont, fontSize: 33, lineHeight: 1.05, marginTop: 12 }}>{title}</div>
	</div>
);

const Problem: React.FC<SceneProps> = ({ time, scene }) => {
	const advance = reveal(time, cue(scene, 1), 1.2);
	const phone = reveal(time, cue(scene, 1), 0.8);
	const shares = reveal(time, wordCue(scene, 1, 'equally'), 1.45);
	return (
		<>
			<DinnerWorld y={150} />
			<Headline size={64}>Start with a useful<br /><em style={{ color: palette.cobalt }}>customer problem.</em></Headline>
			<PossibilityCard index={0} title="Split equally" subtitle="First · one useful outcome" selected advance={advance} />
			<PossibilityCard index={1} title="Unequal shares" subtitle="Later · a possibility" selected={false} advance={advance} />
			<PossibilityCard index={2} title="Track payments" subtitle="Later · a possibility" selected={false} advance={advance} />
			<div style={{ position: 'absolute', left: 437, top: mix(696, 615, phone), opacity: phone, transform: `rotate(${mix(-11, -6, phone)}deg)` }}><Receipt width={196} /></div>
			<div style={{ position: 'absolute', left: mix(794, 681, phone), top: mix(823, 527, phone), opacity: phone, transform: `rotate(${mix(-19, 2, phone)}deg) scale(${mix(0.5, 0.97, phone)})`, transformOrigin: '50% 100%' }}><SplitPhone width={253} shown={shares} /></div>
		</>
	);
};

export const ProblemDecompositionScene: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	const time = seconds - scene.start;
	return (
		<AbsoluteFill style={{ background: palette.paper, overflow: 'hidden' }}>
			{scene.id === 'hook' && <Hook time={time} scene={scene} />}
			{scene.id === 'parts' && <Parts time={time} scene={scene} />}
			{scene.id === 'problem' && <Problem time={time} scene={scene} />}
			{scene.id === 'premises' && <Premises time={time} scene={scene} />}
			{scene.id === 'value' && <Value time={time} scene={scene} />}
			{scene.id === 'stop' && <Stop time={time} scene={scene} />}
			{scene.id === 'vertical' && <Vertical time={time} scene={scene} />}
			{scene.id === 'fractal' && <Fractal time={time} scene={scene} />}
			{scene.id === 'commit' && <Commit time={time} scene={scene} />}
			{scene.id === 'health' && <Health time={time} scene={scene} />}
			{scene.id === 'end' && <Ending time={time} scene={scene} />}
			<Eyebrow scene={scene} />
			<CaptionBar seconds={seconds} />
		</AbsoluteFill>
	);
};
