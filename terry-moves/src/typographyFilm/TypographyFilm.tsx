import React, { useMemo } from 'react';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { TypeDirection, TypePose, typographyTimeline } from './direction';
import { editedOpeningContrast, openingContrast, problemBaseline } from './script';

const tones = { ink: '#f3efe7', quiet: '#c0bdb4', accent: '#dce3bd' };

// One typographic stage consumes every passage. Copy, grouping, emphasis,
// spacing and motion arrive from the script rather than passage-name branches.
export const TypographyPicture: React.FC<{ pose: TypePose }> = ({ pose }) => <div
	data-passage={pose.passage}
	style={{ position: 'absolute', inset: 0, backgroundColor: '#1b1b18', fontFamily: 'Arial, sans-serif' }}
>
	<div style={{ position: 'absolute', inset: '100px 110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
		{pose.groups.map((group) => <div key={group.id} data-type-group={group.id} style={{
			fontSize: group.size,
			fontWeight: group.weight,
			letterSpacing: group.letterSpacing,
			lineHeight: group.lineHeight,
			marginTop: group.spaceBefore,
			color: tones[group.tone],
			opacity: group.opacity,
			translate: `0px ${group.y}px`,
		}}>
			{group.lines.map((line, index) => <div key={index} data-type-line style={{ whiteSpace: 'pre' }}>{line}</div>)}
		</div>)}
	</div>
</div>;

type TypographyFilmProps = { direction: TypeDirection };

export const TypographyFilm: React.FC<TypographyFilmProps> = ({ direction }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const performance = useMemo(() => typographyTimeline(direction, fps), [direction, fps]);
	return <TypographyPicture pose={performance.poseAt(frame)} />;
};

const fps = 30;
const size = 1080;

export const TypographyOpeningCompositions: React.FC = () => <>
	<Composition
		id="TypographyOpeningContrast"
		component={TypographyFilm}
		defaultProps={{ direction: openingContrast }}
		durationInFrames={typographyTimeline(openingContrast, fps).durationInFrames}
		fps={fps}
		width={size}
		height={size}
	/>
	<Composition
		id="TypographyOpeningContrastEdited"
		component={TypographyFilm}
		defaultProps={{ direction: editedOpeningContrast }}
		durationInFrames={typographyTimeline(editedOpeningContrast, fps).durationInFrames}
		fps={fps}
		width={size}
		height={size}
	/>
</>;

export const TypographyProblemBaselineComposition: React.FC = () => <Composition
	id="TypographyProblemBaseline"
	component={TypographyFilm}
	defaultProps={{ direction: problemBaseline }}
	durationInFrames={typographyTimeline(problemBaseline, fps).durationInFrames}
	fps={fps}
	width={size}
	height={size}
/>;
