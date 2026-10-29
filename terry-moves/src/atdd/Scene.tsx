import React from 'react';
import { CaptionBar } from '../storyImpact/caption';
import { Paper } from '../storyImpact/pieces';
import { STAGE } from '../storyImpact/layout';
import { palette, STROKE } from './art';
import { film, momentAt } from './film';
import { cue, move, ScenarioCircle, SolutionTree } from './diagrams';
import { ATDDStaging, staging as authoredStaging } from './staging';
import { crew } from './crew';
import { Box, Flow, MiniAI, Person, RED, Text, WAIT } from './pieces';
import { captionText, useATDDLanguage } from './language';

const headings = [
	'Parts before the whole?', 'One narrow result', 'Small, useful scenarios',
	'Automate. Run. Observe.', 'Keep the green prefix', 'Temporary, if useful',
	'What does Update reveal?', 'Local work. Outer feedback.', 'Actions pass. Result fails.',
	'Together → briefly split', 'Reunite and run it all', 'Cohesion belongs in done',
	'Advanced option: Then first', 'AI within protected work',
];

const Cover: React.FC<{ closing?: boolean; staging: ATDDStaging }> = ({ closing = false, staging }) => <g>
	<Text x={540} y={157} size={76} color={palette.structure}>ATDD</Text>
	<Text x={540} y={299} size={94}>Work through</Text>
	<Text x={540} y={407} size={94}>one scenario</Text>
	<Text x={540} y={476} size={37}>Acceptance Test Driven Development</Text>
	<g transform="translate(-16 434) scale(.47)"><SolutionTree staging={staging} miniature /></g>
	<g transform="translate(506 431) scale(.46)"><ScenarioCircle staging={staging} staticBoard miniature /></g>
	<Text x={540} y={945} size={42}>Terry Yin</Text>
	{closing ? <Text x={540} y={1007} size={30} weight={700}>CEDAR · AI-GENERATED NARRATION</Text> : <Text x={540} y={1007} size={30} weight={700}>From the original whiteboard presentation</Text>}
</g>;

const AdvancedOption: React.FC<{ seconds: number }> = ({ seconds }) => {
	return <g>
		<Box x={249} y={228} width={668} height={495} fill={palette.panel} stroke={palette.structure}>
			<Text x={583} y={278} size={40}>Make the result</Text>
			<Text x={583} y={320} size={40}>observable first</Text>
			{['Given', 'Selection', 'Update'].map((row, i) => {
				const replace = move(seconds, cue(12, 1, 'begin') + i * 0.65, 0.55);
				return <g key={row} data-advanced-step={row}>
					<Text x={290} y={385 + i * 80} size={36} anchor="start">{row}</Text>
					<g opacity={Math.max(0, 1 - replace * 2)}>
						<rect x={503} y={342 + i * 80} width={356} height={60} rx={16} fill={palette.paper} stroke={WAIT} strokeWidth={5} strokeDasharray="12 8" />
						<Text x={681} y={383 + i * 80} size={31} color={WAIT}>Temporary fake</Text>
					</g>
					<g opacity={Math.max(0, replace * 2 - 1)}>
						<rect x={503} y={342 + i * 80} width={356} height={60} rx={16} fill={palette.cellSky} stroke={palette.structure} strokeWidth={5} />
						<Text x={681} y={383 + i * 80} size={33} color={palette.structure}>Real path</Text>
					</g>
				</g>;
			})}
			<rect x={283} y={603} width={576} height={83} rx={20} fill={palette.cellSky} stroke={palette.structure} strokeWidth={6} />
			<Text x={571} y={657} size={40}>Then: a real result check</Text>
		</Box>
		<Flow d="M965 650 V364" color={palette.structure} width={STROKE.flow} progress={move(seconds, cue(12, 1, 'earlier'))} arrow />
		<Text x={577} y={798} size={35}>An advanced option, after the walkthrough.</Text>
	</g>;
};

const AIWithinScenario: React.FC<{ seconds: number; staging: ATDDStaging }> = ({ seconds, staging }) => {
	const humans = crew(staging.participants.scales);
	const center = 485;
	return <g>
		<Text x={262} y={139} size={30}>The solution tree</Text>
		<Text x={792} y={139} size={30}>The scenario + checks</Text>
		<g transform="translate(1 117) scale(.48)"><SolutionTree staging={staging} miniature /></g>
		<g transform="translate(526 108) scale(.5)"><ScenarioCircle staging={staging} staticBoard miniature /></g>
		<Box x={215} y={596} width={650} height={191} fill={palette.panel} stroke={palette.behavior}>
			<Text x={540} y={638} size={33}>Scenario A · existing checks</Text>
			{humans.people.map(({ id, offset, scale }) => <Person key={id} id={id} x={center + offset} y={688} seconds={seconds} working scale={scale} />)}
			<g opacity={move(seconds, cue(13, 0, 'help'), 0.55)} transform={`translate(${center + humans.width / 2 + 62} 715) scale(.8)`}>
				<MiniAI x={0} y={0} />
			</g>
		</Box>
		<circle cx={312} cy={827} r={12 + move(seconds, cue(13, 0, 'grow'), 0.7) * 8} fill="none" stroke={palette.behavior} strokeWidth={3} strokeDasharray="5 4" />
		<Text x={350} y={837} size={28} anchor="start" weight={700}>Grow scope deliberately</Text>
	</g>;
};

export const DiagramBoard: React.FC<{ diagram: 'tree' | 'circle'; staging?: ATDDStaging }> = ({ diagram, staging = authoredStaging }) => <svg width={STAGE.width} height={STAGE.height} viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
	<Paper />
	<Text x={540} y={84} size={56}>{diagram === 'tree' ? 'The solution tree' : 'One scenario, changing sheets'}</Text>
	{diagram === 'tree' ? <SolutionTree staging={staging} /> : <ScenarioCircle staging={staging} staticBoard />}
	{diagram === 'circle' ? <g>
		<Text x={264} y={950} size={28} color={palette.behavior}>✓ Observed pass</Text><Text x={551} y={950} size={28} color={WAIT}>… Unfinished</Text><Text x={849} y={950} size={28} color={RED}>× Observed failure</Text>
		<Text x={540} y={1007} size={30}>Five together → brief 3 / 2 exploration → reunite</Text>
	</g> : <Text x={540} y={978} size={31}>One observed outcome pulls the structure it needs.</Text>}
</svg>;

export const ATDDScene: React.FC<{ seconds: number; staging?: ATDDStaging }> = ({ seconds, staging = authoredStaging }) => {
	const language = useATDDLanguage();
	const { index, caption } = momentAt(seconds);
	const entering = move(seconds, film.coverDuration, 0.55);
	const closing = move(seconds, cue(13, 1, 'acceptance') - 0.1, 0.9);
	return <svg width={STAGE.width} height={STAGE.height} viewBox="0 0 1080 1080">
		<Paper />
		<g opacity={entering * (1 - closing)}>
			<Text x={500} y={80} size={50}>{headings[index]}</Text>
			{index < 2 ? <SolutionTree staging={staging} seconds={seconds} phase={index === 0 ? 'assumed' : 'growing'} /> : index < 13 ? <g opacity={index === 12 ? 0.2 : 1}><ScenarioCircle staging={staging} seconds={seconds} phase={index} /></g> : null}
			{index === 12 ? <AdvancedOption seconds={seconds} /> : null}
			{index === 13 ? <AIWithinScenario seconds={seconds} staging={staging} /> : null}
			{caption ? <CaptionBar caption={captionText(index, caption, language)} /> : null}
		</g>
		{entering < 1 ? <g opacity={1 - entering}><Cover staging={staging} /></g> : null}
		{closing > 0 ? <g opacity={closing}><Cover staging={staging} closing /></g> : null}
	</svg>;
};
