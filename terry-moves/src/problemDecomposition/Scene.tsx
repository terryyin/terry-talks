import React from 'react';
import { AbsoluteFill } from 'remotion';
import { bodyFont, captionTop, headlineFont, palette } from './design';
import { captionAt, FilmScene, filmScript, reveal, sceneAt } from './film';
import { chapterOf, chapters } from './series';
import { ProductStage } from './stage';
import { Premises } from './premises';
import { CustomerWorld, GoalDetail, WorkingReceipt } from './goals';
import { Principles } from './principles';
import { Ending, Health } from './health';

export const CaptionBar: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	const opacity = caption ? Math.min(reveal(seconds, caption.start, 0.1), reveal(caption.end - seconds, 0, 0.08)) : 0;
	const finalCredit = sceneAt(seconds).id === 'end' && caption && seconds >= caption.speechEnd;
	return <div style={{ position: 'absolute', left: 0, right: 0, top: captionTop, bottom: 0, background: palette.paper, borderTop: `1px solid ${palette.rule}`, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '18px 64px 31px', boxSizing: 'border-box' }}>
		<div style={{ fontFamily: bodyFont, fontSize: 42, color: palette.ink, lineHeight: 1.2, textAlign: 'center', opacity }}>{caption?.text}</div>
		{finalCredit && <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontFamily: bodyFont, fontSize: 14, color: palette.muted, letterSpacing: 1.2 }}>{filmScript.voiceCredit}</div>}
	</div>;
};

const ChapterRail: React.FC<{ scene: FilmScene }> = ({ scene }) => (
	<div data-testid="chapter-rail" data-chapter={chapters[chapterOf(scene.id)]} style={{ position: 'absolute', left: 65, right: 65, top: 58, display: 'flex', justifyContent: 'space-between', fontFamily: bodyFont, fontSize: 25 }}>
		{chapters.map((chapter, index) => <div key={chapter} style={{ color: chapterOf(scene.id) === index ? palette.cobalt : palette.muted, borderBottom: `3px solid ${chapterOf(scene.id) === index ? palette.cobalt : 'transparent'}`, paddingBottom: 10 }}><span style={{ opacity: 0.5, marginRight: 7 }}>0{index + 1}</span>{chapter}</div>)}
	</div>
);

const titles: Record<FilmScene['id'], [string, string]> = {
	hook: ['Split the wish.', 'Problem decomposition · Story Impact / 02'],
	parts: ['Solution decomposition', 'How should an answer be structured?'],
	problem: ['Problem decomposition', 'Which smaller customer problem can we solve?'],
	premises: ['Two premises', 'Smaller problems. Uncertain plans.'],
	value: ['Two goals', '1 · Deliver useful value and feedback'],
	stop: ['Two goals', '2 · Make stopping affordable'],
	vertical: ['Four principles', 'How to keep each impact useful'],
	fractal: ['Four principles', 'The same pattern, at smaller scales'],
	commit: ['Four principles', 'Useful now, even if this is the last commit'],
	health: ['Four principles', 'Protect the health of the whole product'],
	end: ['Smaller problems.', 'Useful impacts. Freedom to choose again.'],
};

export const ProblemDecompositionScene: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	const [title, subtitle] = titles[scene.id];
	return <AbsoluteFill style={{ background: palette.paper, overflow: 'hidden' }}>
		<div style={{ position: 'absolute', left: 65, top: 24, fontFamily: bodyFont, fontSize: 17, letterSpacing: 2.4, color: palette.muted }}>STORY IMPACT / 02</div>
		<ChapterRail scene={scene} />
		<div style={{ position: 'absolute', left: 64, top: 119, color: palette.ink, fontFamily: headlineFont, fontSize: 59, letterSpacing: -1.7 }}>{title}</div>
		<div style={{ position: 'absolute', left: 67, top: 194, color: palette.muted, fontFamily: bodyFont, fontSize: 27 }}>{subtitle}</div>
		<ProductStage seconds={seconds} />
		<CustomerWorld seconds={seconds} />
		<WorkingReceipt seconds={seconds} />
		{scene.id === 'premises' && <Premises seconds={seconds} />}
		<GoalDetail seconds={seconds} />
		<Principles seconds={seconds} />
		{scene.id === 'health' && <Health seconds={seconds} />}
		{scene.id === 'end' && <Ending seconds={seconds} />}
		<CaptionBar seconds={seconds} />
	</AbsoluteFill>;
};
