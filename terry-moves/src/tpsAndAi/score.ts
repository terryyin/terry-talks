import { interpolate } from 'remotion';

export type SpeechWindow = { speechStart: number; speechEnd: number };

/** Keep the established TPS score quiet under measured speech and let it breathe in gaps. */
export const speechScoreVolumeAt = (seconds: number, windows: SpeechWindow[]): number => Math.min(0.55, ...windows.map(({ speechStart, speechEnd }) =>
	interpolate(seconds, [speechStart - 0.18, speechStart, speechEnd, speechEnd + 0.4], [0.55, 0.25, 0.25, 0.55], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	})));
