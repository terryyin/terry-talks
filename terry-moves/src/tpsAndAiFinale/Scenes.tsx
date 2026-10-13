import React from 'react';
import { Heading, palette, serif } from '../tpsAndAi/Frame';
import { DirectedHeading } from '../tpsAndAiJit/DirectedHeading';
import { headingDirections, teachingViewAt } from './direction';
import { Illustration, IllustrationDetail, Shot, useSeconds } from './Frame';
import { sceneById } from './film';

export const Cover: React.FC = () => {
	const scene = sceneById('cover');
	return <Shot id="cover" seconds={useSeconds('cover')}>
		<Heading>{scene.heading}</Heading>
		<Heading style={{ top: 232, fontSize: 48, letterSpacing: -1.2, whiteSpace: 'pre-line', lineHeight: 1.2 }}>{scene.subheading}</Heading>
		<Illustration file={scene.asset} style={{ left: 66, top: 390, width: 948, height: 338 }} />
		<div style={{ position: 'absolute', top: 764, left: 92, right: 92, display: 'flex', justifyContent: 'space-between', fontSize: 38, fontFamily: serif, color: palette.gray }}><span>Jidoka frees.</span><span>Just in time entrusts.</span></div>
	</Shot>;
};

export const Free: React.FC = () => {
	const seconds = useSeconds('free');
	const scene = sceneById('free');
	return <Shot id="free" seconds={seconds}>
		<DirectedHeading direction={headingDirections.free} seconds={seconds - scene.start} />
		<Illustration file={scene.asset} style={{ left: 40, top: 305, width: 1000, height: 525 }} />
	</Shot>;
};

export const Entrust: React.FC = () => {
	const seconds = useSeconds('entrust');
	const scene = sceneById('entrust');
	const defining = seconds >= scene.captionRanges[1].start && seconds < scene.captionRanges[1].end;
	return <Shot id="entrust" seconds={seconds}>
		<DirectedHeading direction={headingDirections.entrust} seconds={seconds - scene.start} />
		<Illustration file={scene.asset} style={{ left: 64, top: defining ? 320 : 260, width: 952, height: defining ? 480 : 560 }} />
		{defining ? <div data-testid="need-definition" style={{ position: 'absolute', left: 64, right: 64, top: 236, fontFamily: serif, fontSize: 44, lineHeight: 1.25, color: palette.red, textAlign: 'center' }}>Only what. When. How much.</div> : null}
	</Shot>;
};

export const Agency: React.FC = () => {
	const seconds = useSeconds('agency');
	const scene = sceneById('agency');
	return <Shot id="agency" seconds={seconds}>
		<DirectedHeading direction={headingDirections.agency} seconds={seconds - scene.start} />
		<Heading style={{ top: 234, fontSize: 50, letterSpacing: -1.1 }}>{scene.subheading}</Heading>
		<IllustrationDetail file={scene.asset} sourceWidth={2022} sourceHeight={778} x={1070} y={175} width={952} height={550} top={330} areaHeight={488} label="people-and-shared-product" />
	</Shot>;
};

const LearningScene: React.FC<{ id: 'respect' | 'improve'; first: string; second: string }> = ({ id, first, second }) => {
	const scene = sceneById(id);
	const seconds = useSeconds(id);
	const view = teachingViewAt(scene, seconds);
	const common = { file: scene.asset, sourceWidth: 1536, sourceHeight: 1024, y: 186, width: 760, height: 650, top: 322, areaHeight: 478 };
	return <Shot id={id} seconds={seconds}>
		<DirectedHeading direction={headingDirections[id]} seconds={seconds - scene.start} />
		<Heading style={{ top: 232, fontSize: 48, letterSpacing: -1 }}>{scene.subheading}</Heading>
		{view.second ? <>
			<IllustrationDetail {...common} x={776} opacity={view.opacity} label={second} />
			{view.opacity < 1 ? <IllustrationDetail {...common} x={0} opacity={1 - view.opacity} label={first} outgoing /> : null}
		</> : <IllustrationDetail {...common} x={0} label={first} />}
		<div data-testid="learning-cue" style={{ position: 'absolute', left: 64, right: 64, top: 805, textAlign: 'center', fontSize: 32, color: palette.gray }}>{first} → {second}</div>
	</Shot>;
};

export const Respect: React.FC = () => <LearningScene id="respect" first="Learn" second="Teach" />;
export const Improve: React.FC = () => <LearningScene id="improve" first="Prepare" second="Simplify" />;

export const Closing: React.FC = () => {
	const seconds = useSeconds('closing');
	const scene = sceneById('closing');
	const conclusion = seconds >= scene.captionRanges[scene.captionRanges.length - 1].start;
	return <Shot id="closing" seconds={seconds}>
		<Illustration file={scene.asset} style={{ left: 0, top: 258, width: 1080, height: 592 }} />
		{conclusion ? <Heading style={{ top: 154, fontSize: 68, lineHeight: 1.24, whiteSpace: 'pre-line' }}>{scene.captionRanges[scene.captionRanges.length - 1].spoken.replace(/\. /g, '.\n')}</Heading> : <DirectedHeading direction={headingDirections.closing} seconds={seconds - scene.start} />}
		{seconds >= scene.creditStart! ? <div data-testid="film-credits" style={{ position: 'absolute', left: 64, right: 64, top: 898, fontSize: 56, lineHeight: 1.2, textAlign: 'center' }}>{scene.creditLines![0]}</div> : null}
	</Shot>;
};
