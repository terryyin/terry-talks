import { AnimationClip, AnimationMixer, LoopOnce, Object3D, SkinnedMesh } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { CharacterDirection, CharacterPose } from './direction';

export const createCharacterRig = (source: Object3D, clips: AnimationClip[], direction: CharacterDirection) => {
	const selected = direction.actions.map((cue) => {
		const clip = clips.find((candidate) => candidate.name === cue.clip);
		if (!clip) throw new Error(`Character cue "${cue.name}" needs missing clip "${cue.clip}". Available clips: ${clips.map((candidate) => candidate.name).join(', ')}`);
		return { cue, clip };
	});
	const object = clone(source);
	const mixer = new AnimationMixer(object);
	// One action per authored cue permits the same named clip at independent
	// incoming/outgoing offsets, including repeated settled Idle cues.
	const actions = selected.map(({ cue, clip }) => {
		const action = mixer.clipAction(clip.clone()).play();
		action.setLoop(LoopOnce, 1);
		action.clampWhenFinished = true;
		action.paused = true;
		return { cue: cue.name, action };
	});
	const sample = (pose: CharacterPose) => {
		for (const { cue, action } of actions) {
			const requested = pose.clips.find((candidate) => candidate.cue === cue);
			const duration = action.getClip().duration;
			const seconds = requested?.seconds ?? 0;
			action.stopFading();
			action.stopWarping();
			action.enabled = true;
			action.paused = true;
			action.setEffectiveTimeScale(1);
			action.setEffectiveWeight(requested?.weight ?? 0);
			action.time = requested?.playback === 'loop' ? ((seconds % duration) + duration) % duration : Math.max(0, Math.min(duration, seconds));
		}
		mixer.update(0);
		object.updateMatrixWorld(true);
	};
	const dispose = () => {
		mixer.stopAllAction();
		mixer.uncacheRoot(object);
		// SkeletonUtils owns cloned skeletons. Geometry/materials belong to the
		// cached loader asset, so this instance must leave those shared resources.
		const skeletons = new Set<SkinnedMesh['skeleton']>();
		object.traverse((node) => { if ((node as SkinnedMesh).isSkinnedMesh) skeletons.add((node as SkinnedMesh).skeleton); });
		skeletons.forEach((skeleton) => skeleton.dispose());
	};
	return { object, sample, dispose };
};
