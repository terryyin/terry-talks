// One declared speaker shot: source, crop and play choice live here; the film
// derives its clip clock and inset placement from this plus the measured record.

import { INSET } from './layout';

export type Shot = {
	source: string;
	crop: { left: number; top: number; width: number };
	play: 'full' | { from: number; to: number };
	whenShort: 'edit' | 'hold';
	audio: 'voice' | 'muted';
};

export type ShotMeasurement = {
	source: string;
	sha256: string;
	durationSeconds: number;
	width: number;
	height: number;
	fps: number;
	hasAudio: boolean;
};

export type ShotChoreography = {
	end: number;
};

export type ShotPlacement = {
	videoWidth: number;
	left: number;
	top: number;
};

export type CompiledShot = {
	from: number;
	to: number;
	slotSeconds: number;
	sceneSeconds: number;
	holdFrom: number | null;
	videoFrames: number;
	placement: ShotPlacement;
	audio: Shot['audio'];
	source: string;
};

export const speakerShot = {
	source: 'assets/Component teams.mp4',
	crop: { left: 0.085, top: 0.04, width: 0.83 },
	play: 'full',
	whenShort: 'edit',
	audio: 'voice',
} as const satisfies Shot;

// Pure: slot length, hold, frame count and inset video placement from the
// declaration and measured source. The approved film uses full play, edit and
// voice; hold and ranged play compile for replacement timing choices.
export const compileShot = (
	shot: Shot,
	measurement: ShotMeasurement,
	choreography: ShotChoreography,
	fps: number,
): CompiledShot => {
	const from = shot.play === 'full' ? 0 : shot.play.from;
	const to = shot.play === 'full' ? measurement.durationSeconds : shot.play.to;
	const slotSeconds = to - from;
	const sceneSeconds = shot.whenShort === 'edit' ? slotSeconds : Math.max(slotSeconds, choreography.end);
	const holdFrom =
		shot.whenShort === 'hold' && slotSeconds < choreography.end ? slotSeconds : null;
	const videoWidth = INSET.width / shot.crop.width;
	return {
		from,
		to,
		slotSeconds,
		sceneSeconds,
		holdFrom,
		videoFrames: Math.ceil(slotSeconds * fps),
		placement: {
			videoWidth,
			left: -shot.crop.left * videoWidth,
			top: -shot.crop.top * videoWidth * (measurement.height / measurement.width) - 6,
		},
		audio: shot.audio,
		source: shot.source,
	};
};
