import React from 'react';
import { CaptionBar } from '../storyImpact/caption';
import { Paper } from '../storyImpact/pieces';
import { STAGE } from '../storyImpact/layout';
import { ballColors } from '../storyImpact/scene';
import { palette, STROKE } from './art';
import { film, momentAt } from './film';
import { cue, move, ScenarioCircle, SolutionTree } from './diagrams';
import { Box, Flow, MiniAI, RED, Text, WAIT } from './pieces';

const headings = [
	'Parts before the whole?', 'One narrow result', 'Small, useful scenarios',
	'Automate. Run. Observe.', 'Keep the green prefix', 'Temporary, if useful',
	'What does Update reveal?', 'Local work. Outer feedback.', 'Actions pass. Result fails.',
	'Together → briefly split', 'Reunite and run it all', 'Cohesion belongs in done',
	'Advanced option: Then first', 'AI within protected work',
];

const Cover: React.FC<{ closing?: boolean }> = ({ closing = false }) => <g>
	<Text x={540} y={157} size={76} color={palette.structure}>ATDD</Text>
	<Text x={540} y={299} size={94}>Work through</Text>
	<Text x={540} y={407} size={94}>one scenario</Text>
	<Text x={540} y={476} size={37}>Acceptance Test Driven Development</Text>
	<g transform="translate(-16 434) scale(.47)"><SolutionTree miniature /></g>
	<g transform="translate(506 431) scale(.46)"><ScenarioCircle staticBoard miniature /></g>
	<Text x={540} y={945} size={42}>Terry Yin</Text>
	{closing ? <Text x={540} y={1007} size={30} weight={700}>CEDAR · AI-GENERATED NARRATION</Text> : <Text x={540} y={1007} size={30} weight={700}>From the original whiteboard presentation</Text>}
</g>;

const AdvancedOption: React.FC<{ seconds: number }> = ({ seconds }) => {
	const replace = move(seconds, cue(12, 1, 'become'), 1.2);
	return <g>
		<Box x={249} y={228} width={668} height={495} fill={palette.panel} stroke={palette.structure}>
			<Text x={583} y={291} size={43}>Make the result observable first</Text>
			{['Given', 'Selection', 'Update'].map((row, i) => <g key={row}>
				<Text x={290} y={370 + i * 80} size={36} anchor="start">{row}</Text>
				<rect x={503} y={326 + i * 80} width={356} height={60} rx={16} fill={palette.paper} stroke={replace < 1 ? WAIT : palette.structure} strokeWidth={5} strokeDasharray={replace < 1 ? '12 8' : undefined} />
				<Text x={681} y={367 + i * 80} size={33} color={replace < 1 ? WAIT : palette.structure}>{replace < 0.8 ? 'Fake → real' : 'Real path'}</Text>
			</g>)}
			<rect x={283} y={603} width={576} height={83} rx={20} fill={palette.cellSky} stroke={palette.structure} strokeWidth={6} />
			<Text x={571} y={657} size={40}>Then: a real result check</Text>
		</Box>
		<Flow d="M965 650 V364" color={palette.structure} width={STROKE.flow} progress={move(seconds, cue(12, 1, 'earlier'))} arrow />
		<Text x={577} y={798} size={35}>An advanced option, after the walkthrough.</Text>
	</g>;
};

export const DiagramBoard: React.FC<{ diagram: 'tree' | 'circle' }> = ({ diagram }) => <svg width={STAGE.width} height={STAGE.height} viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
	<Paper />
	<Text x={540} y={84} size={56}>{diagram === 'tree' ? 'The solution tree' : 'One scenario, changing sheets'}</Text>
	{diagram === 'tree' ? <SolutionTree /> : <ScenarioCircle staticBoard />}
	{diagram === 'circle' ? <g>
		<Text x={264} y={950} size={28} color={palette.behavior}>✓ Observed pass</Text><Text x={551} y={950} size={28} color={WAIT}>… Unfinished</Text><Text x={849} y={950} size={28} color={RED}>× Observed failure</Text>
		<Text x={540} y={1007} size={30}>Five together → brief 3 / 2 exploration → reunite</Text>
	</g> : <Text x={540} y={978} size={31}>One observed outcome pulls the structure it needs.</Text>}
</svg>;

export const ATDDScene: React.FC<{ seconds: number }> = ({ seconds }) => {
	const { index, caption } = momentAt(seconds);
	const entering = move(seconds, film.coverDuration, 0.55);
	const closing = move(seconds, cue(13, 1, 'acceptance') - 0.1, 0.9);
	return <svg width={STAGE.width} height={STAGE.height} viewBox="0 0 1080 1080">
		<Paper />
		<g opacity={entering * (1 - closing)}>
			<Text x={500} y={80} size={50}>{headings[index]}</Text>
			{index < 2 ? <SolutionTree seconds={seconds} phase={index === 0 ? 'assumed' : 'growing'} /> : <g opacity={index >= 12 ? 0.2 : 1}><ScenarioCircle seconds={seconds} phase={index} /></g>}
			{index === 12 ? <AdvancedOption seconds={seconds} /> : null}
			{index === 13 ? <g>
				<rect x={283} y={180} width={710} height={667} rx={130} fill="none" stroke={palette.behavior} strokeWidth={9} strokeDasharray="18 13" />
				<Box x={394} y={393} width={476} height={266} fill={palette.panel} stroke={palette.behavior}>
					<Text x={632} y={450} size={43} color={palette.behavior}>Protected work</Text>
					<MiniAI x={632} y={541} />
					<Text x={632} y={626} size={30}>Scenario + existing checks</Text>
				</Box>
				<circle cx={959} cy={799} r={19 + move(seconds, cue(13, 0, 'grow'), 1) * 19} fill={ballColors.sun} stroke={palette.ink} strokeWidth={5} />
			</g> : null}
			{caption ? <CaptionBar caption={caption} /> : null}
		</g>
		{entering < 1 ? <g opacity={1 - entering}><Cover /></g> : null}
		{closing > 0 ? <g opacity={closing}><Cover closing /></g> : null}
	</svg>;
};
