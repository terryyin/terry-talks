import React from 'react';
import { palette } from '../storyImpact/scene';
import { FONT_FAMILY, scaleAround, STAGE } from '../storyImpact/layout';
import { DisciplinedLine, RomanticLine, Splash } from '../storyImpact/title';
import { Developer } from './developer';
import { Ball, Card, Header, Meter, Sheet, Sparkles, Spiral, Tags, Zap } from './extras';
import { Patches } from './patches';
import { Product } from './product';
import { END, BasEndCardPose, FilmPose } from './film';
import type { Pose } from './pose';

// The whole feature-teams picture at one moment. Bas's clip and the Odd-e
// logo are laid over it by the composition. Pure function of the film pose.

const Backdrop: React.FC<{ paper: string }> = ({ paper }) => (
	<g>
		<rect x={0} y={0} width={STAGE.width} height={STAGE.height} fill={paper} />
		{Array.from({ length: 14 }, (_, i) => (
			<circle key={i} cx={((i * 257) % 1040) + 20} cy={((i * 397) % 820) + 30} r={4 + (i % 3) * 2} fill={palette.paperShadow} opacity={0.7} />
		))}
	</g>
);

const Stage: React.FC<{ pose: Pose }> = ({ pose }) => {
	const { look, neglect } = pose;
	return (
		<g style={{ filter: Math.abs(look.saturation - 1) < 0.02 ? undefined : `saturate(${look.saturation.toFixed(3)})` }}>
			<Header header={pose.header} />
			<Product
				column={pose.column}
				coherent={pose.coherent}
				under={<Patches patches={pose.patches} coherent={pose.coherent} />}
				over={<Tags tags={pose.tags} s={pose.s} />}
			/>
			<Sheet sheet={pose.sheet} />
			{pose.balls.map((ball) => (
				<Ball key={ball.id} ball={ball} />
			))}
			<Zap zap={pose.zap} />
			{pose.devs.map((dev, i) => (
				<Developer key={dev.id} dev={dev} index={i} />
			))}
			{pose.card ? <Card card={pose.card} /> : null}
			{pose.quality === undefined ? null : <Meter quality={pose.quality} />}
			<Spiral spiral={pose.spiral} turn={pose.s * 1.6} />
			<Sparkles joy={pose.joy} s={pose.s} />
			{neglect > 0 ? (
				<g pointerEvents="none">
					<rect x={0} y={0} width={STAGE.width} height={STAGE.height} fill={palette.ink} opacity={neglect * 0.1} />
					<rect x={10} y={10} width={STAGE.width - 20} height={STAGE.height - 20} rx={30} fill="none" stroke={palette.ink} strokeWidth={8} strokeDasharray="22 14" opacity={neglect * 0.6} />
				</g>
			) : null}
			{pose.flash > 0 ? <rect x={0} y={0} width={STAGE.width} height={STAGE.height} fill={palette.white} opacity={pose.flash * 0.85} /> : null}
		</g>
	);
};

const Line: React.FC<{ testId: string; text: string; y: number; size: number; scale: number; weight?: number; opacity?: number }> = ({ testId, text, y, size, scale, weight = 800, opacity }) =>
	scale <= 0 ? null : (
		<g transform={scaleAround({ x: 540, y: y - size * 0.35 }, scale, scale)}>
			<text data-testid={testId} x={540} y={y} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={weight} fontSize={size} fill={palette.ink} opacity={opacity}>
				{text}
			</text>
		</g>
	);

// The end card in the story-impact card's styles: the closing line, then the
// credits, Terry's unchanged and Bas's for the content.
export const FeatureEndCard: React.FC<{ card: BasEndCardPose }> = ({ card }) => (
	<g data-testid="end-card">
		<Splash scale={card.splash} at={{ x: 300, y: 372 }} />
		<Line testId="end-lead" text={END.lead} y={235} size={56} scale={card.lead} />
		<RomanticLine text={END.romantic} drops={card.drops} y={440} size={150} />
		<DisciplinedLine text={END.disciplined} snap={card.snap} underline={card.underline} y={610} size={80} />
		<Line testId="end-credit" text={END.credit} y={790} size={46} scale={card.credit} weight={700} opacity={0.85} />
		<Line testId="end-bas" text={END.bas} y={860} size={42} scale={card.bas} weight={700} opacity={0.85} />
	</g>
);

export const FeatureTeamsScene: React.FC<{ film: FilmPose }> = ({ film }) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${STAGE.width} ${STAGE.height}`} width={STAGE.width} height={STAGE.height}>
		<Backdrop paper={film.scene.look.paper} />
		{film.stage <= 0 ? null : (
			<g transform={film.stage === 1 ? undefined : scaleAround({ x: 540, y: 500 }, film.stage, film.stage)}>
				<Stage pose={film.scene} />
			</g>
		)}
		{film.title ? <FeatureTitle title={film.title} /> : null}
		{film.endCard ? <FeatureEndCard card={film.endCard} /> : null}
	</svg>
);

const FeatureTitle: React.FC<{ title: NonNullable<FilmPose['title']> }> = ({ title }) => {
	const k = 1 - title.leave;
	if (k <= 0) return null;
	return (
		<g data-testid="title" transform={title.leave === 0 ? undefined : scaleAround({ x: 540, y: 500 }, k, k)} opacity={Math.min(1, k * 1.5)}>
			<Splash scale={title.splash} at={{ x: 235, y: 385 }} />
			<RomanticLine text={title.romantic} drops={title.drops} />
			<DisciplinedLine text={title.disciplined} snap={title.snap} underline={title.underline} />
		</g>
	);
};
