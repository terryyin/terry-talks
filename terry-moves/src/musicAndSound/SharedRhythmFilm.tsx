import React, { useMemo } from 'react';
import { Audio, Composition, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import excerptScore from '../../public/assets/shared-rhythm/excerpt.json';
import baselineScore from '../../public/assets/shared-rhythm/baseline.json';
import { rhythmBaseline } from './baseline';
import { RhythmDirection, RhythmMotif, RhythmPose, rhythmMotion, rhythmTimeline } from './direction';
import { RhythmScore, matchingRhythmScore } from './score';
import { rhythmExcerpt, rhythmFps } from './script';

const RhythmShape: React.FC<{ motif: RhythmMotif; size: number }> = ({ motif, size }) => {
	if (motif.shape === 'disc') return <circle r={size / 2} fill={motif.color} />;
	if (motif.shape === 'bar') return <rect x={-size / 2} y={-size * 0.32} width={size} height={size * 0.64} rx={size * 0.13} fill={motif.color} />;
	return <circle r={size * 0.38} fill="none" stroke={motif.color} strokeWidth={size * 0.2} />;
};

// A common stage interprets the performer placement and named accents. There
// are no passage-ID branches: another passage uses this same picture path.
export const RhythmPicture: React.FC<{ direction: RhythmDirection; pose: RhythmPose; frame: number; fps: number }> = ({ direction, pose, frame, fps }) => <div
	data-rhythm-passage={pose.passage.id}
	style={{ position: 'absolute', inset: 0, backgroundColor: '#18282b', color: '#f4efe3', fontFamily: 'Arial, sans-serif' }}
>
	<svg width="1080" height="1080" viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}>
		<circle cx="540" cy="570" r="400" fill="none" stroke="#f4efe3" strokeWidth="1" opacity="0.06" />
		{pose.passage.performers.map((performer) => {
			const motif = direction.motifs.find((item) => item.id === performer.motif)!;
			const motion = rhythmMotion(frame, pose.cues, motif.id, fps);
			return <g key={motif.id}>
				<ellipse cx={performer.x} cy={performer.y + performer.size * 0.65} rx={performer.size * 0.43} ry="7" fill="#070f11" opacity="0.35" />
				<circle data-rhythm-ripple={motif.id} cx={performer.x} cy={performer.y} r={performer.size * (0.62 + motion.ring * 0.7)} stroke={motif.color} strokeWidth="3" fill="none" opacity={motion.ringOpacity} />
				<g
					data-rhythm-performer={motif.id}
					data-rhythm-impact={motion.impact ? motion.cue : undefined}
					data-rhythm-cue={motion.cue}
					transform={`translate(${performer.x} ${performer.y + motion.lift}) scale(${motion.xScale} ${motion.yScale})`}
				>
					<RhythmShape motif={motif} size={performer.size} />
				</g>
			</g>;
		})}
	</svg>
	{pose.passage.title ? <div style={{ position: 'absolute', left: 110, top: 120, fontSize: 82, lineHeight: 1.08, letterSpacing: '-3px', fontWeight: 500, whiteSpace: 'pre-line' }}>{pose.passage.title}</div> : null}
	{pose.passage.credit ? <div style={{ position: 'absolute', left: 110, right: 110, bottom: 180, fontSize: 44, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{pose.passage.credit}</div> : null}
</div>;

export type SharedRhythmFilmProps = { direction: RhythmDirection; score: RhythmScore };

export const SharedRhythmFilm: React.FC<SharedRhythmFilmProps> = ({ direction, score }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const selected = useMemo(() => matchingRhythmScore(direction, score, fps), [direction, score, fps]);
	return <>
		<Audio src={staticFile(selected.audioPath)} />
		<RhythmPicture direction={direction} pose={selected.performance.poseAt(frame)} frame={frame} fps={fps} />
	</>;
};

export const SharedRhythmExcerptComposition: React.FC = () => <Composition
	id="SharedRhythmExcerpt"
	component={SharedRhythmFilm}
	defaultProps={{ direction: rhythmExcerpt, score: excerptScore }}
	durationInFrames={rhythmTimeline(rhythmExcerpt, rhythmFps).durationInFrames}
	fps={rhythmFps}
	width={1080}
	height={1080}
	calculateMetadata={({ props }) => ({ durationInFrames: matchingRhythmScore(props.direction, props.score, rhythmFps).performance.durationInFrames })}
/>;

export const SharedRhythmBaselineComposition: React.FC = () => <Composition
	id="SharedRhythmBaseline"
	component={SharedRhythmFilm}
	defaultProps={{ direction: rhythmBaseline, score: baselineScore }}
	durationInFrames={rhythmTimeline(rhythmBaseline, rhythmFps).durationInFrames}
	fps={rhythmFps}
	width={1080}
	height={1080}
	calculateMetadata={({ props }) => ({ durationInFrames: matchingRhythmScore(props.direction, props.score, rhythmFps).performance.durationInFrames })}
/>;
