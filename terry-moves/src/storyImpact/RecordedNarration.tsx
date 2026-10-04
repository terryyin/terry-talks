import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { fullFilm } from './fullFilm';
import recordingTimeline from './recordingTimeline.json';

// Both of Terry's recordings were made against this original timeline.
// Match each segment to the revised beat, preserving all recorded speech.
export const RecordedNarration: React.FC<{ src: string; from: number }> = ({ src, from }) => (
	<>
		{fullFilm.beats.map((b) => {
			const original = recordingTimeline.find((recorded) => recorded.name === b.name);
			if (!original) throw new Error(`Recording has no beat named ${b.name}`);
			const current = fullFilm.beatRange(b.name);
			return (
				<Sequence key={b.name} from={from + current.from} durationInFrames={current.durationInFrames} layout="none">
					<Audio src={staticFile(src)} trimBefore={original.from} trimAfter={original.from + original.durationInFrames} playbackRate={original.durationInFrames / current.durationInFrames} />
				</Sequence>
			);
		})}
	</>
);
