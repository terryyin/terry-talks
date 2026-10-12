import { beat, timeline } from '../beatTimeline';

export type Vector = [number, number, number];
export type ClipCue = {
	name: string;
	clip: string;
	seconds: number;
	transitionSeconds: number;
	startSeconds: number;
	rate: number;
	playback: 'hold' | 'once' | 'loop';
	turn?: { startSeconds: number; seconds: number; toYaw: number };
};

export type CharacterDirection = {
	asset: string;
	actions: ClipCue[];
	stage: {
		position: Vector;
		yaw: number;
		background: string;
		floor: string;
		camera: { position: Vector; target: Vector; fov: number };
	};
};

export type ClipSample = { cue: string; clip: string; seconds: number; weight: number; playback: ClipCue['playback'] };
export type CharacterPose = { clips: ClipSample[]; position: Vector; yaw: number; support?: { foot: string; yawOffset: number } };

const smooth = (t: number) => {
	const bounded = Math.max(0, Math.min(1, t));
	return bounded * bounded * (3 - 2 * bounded);
};
const timeAt = (cue: ClipCue, seconds: number) => cue.startSeconds + (cue.playback === 'hold' ? 0 : seconds * cue.rate);

// The ordered clock owns both duration and clip offsets. An outgoing clip holds
// its final pose during the join; the incoming clip starts at its authored time.
// No playback history, completion event or second JSX timeline is involved.
export const compileDirection = (direction: CharacterDirection, fps: number) => {
	if (direction.actions.length === 0) throw new Error('Character direction needs an action');
	const names = new Set<string>();
	direction.actions.forEach((cue) => {
		if (names.has(cue.name)) throw new Error(`Duplicate character cue: ${cue.name}`);
		names.add(cue.name);
		if (Math.round(cue.seconds * fps) < 1 || cue.transitionSeconds < 0 || cue.transitionSeconds > (Math.round(cue.seconds * fps) - 1) / fps) {
			throw new Error(`Invalid duration or transition for character cue: ${cue.name}`);
		}
	});
	const facingAt = (index: number, seconds: number): number => {
		const cue = direction.actions[index];
		const previousYaw = index === 0 ? direction.stage.yaw : facingAt(index - 1, (Math.round(direction.actions[index - 1].seconds * fps) - 1) / fps);
		return cue.turn ? previousYaw + (cue.turn.toYaw - previousYaw) * smooth((seconds - cue.turn.startSeconds) / cue.turn.seconds) : previousYaw;
	};
	return timeline(direction.actions.map((cue, index) => beat(cue.name, cue.seconds, undefined, (seconds): CharacterPose => {
		const previous = direction.actions[index - 1];
		const weight = previous && cue.transitionSeconds > 0 ? smooth(seconds / cue.transitionSeconds) : 1;
		const clips = direction.actions.map((action, actionIndex): ClipSample => {
			const isCurrent = actionIndex === index;
			const isPrevious = actionIndex === index - 1;
			return {
				cue: action.name,
				clip: action.clip,
				seconds: isCurrent ? timeAt(action, seconds) : isPrevious ? timeAt(action, (Math.round(action.seconds * fps) - 1) / fps) : 0,
				weight: isCurrent ? weight : isPrevious ? 1 - weight : 0,
				playback: action.playback,
			};
		});
		return { clips, position: direction.stage.position, yaw: facingAt(index, seconds) };
	}, fps)), fps);
};
