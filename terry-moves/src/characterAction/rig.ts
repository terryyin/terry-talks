import { AnimationClip, AnimationMixer, LoopOnce, Mesh, Object3D, Quaternion, SkinnedMesh, Vector3 } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { CharacterDirection, CharacterPose, compileDirection } from './direction';

const up = new Vector3(0, 1, 0);

export const createCharacterRig = (source: Object3D, clips: AnimationClip[], direction: CharacterDirection) => {
	const selected = direction.actions.map((cue) => {
		const clip = clips.find((candidate) => candidate.name === cue.clip);
		if (!clip) throw new Error(`Character cue "${cue.name}" needs missing clip "${cue.clip}". Available clips: ${clips.map((candidate) => candidate.name).join(', ')}`);
		return { cue, clip };
	});
	const object = clone(source);
	object.traverse((node) => { if ((node as Mesh).isMesh) { node.castShadow = true; node.receiveShadow = true; } });
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
	const compensatedFeet = new Map<Object3D, Quaternion>();
	const sample = (pose: CharacterPose) => {
		// Three's PropertyMixer may skip writing an unchanged animated value.
		// Restore our previous local correction before it samples the base pose,
		// including repeated held frames and a support change to the other foot.
		compensatedFeet.forEach((rotation, foot) => foot.quaternion.copy(rotation));
		compensatedFeet.clear();
		object.position.set(0, 0, 0);
		object.rotation.set(0, 0, 0);
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
		// Float32 source keys are slightly non-unit. Three's quaternion interpolant
		// can normalize an exact key when reached from one interval and copy it raw
		// on fresh entry. Normalize bones to give those routes the same rotation.
		object.traverse((node) => { if (node.type === 'Bone') node.quaternion.normalize(); });
		object.updateMatrixWorld(true);
		// The planted sole keeps its facing while the pelvis turns through the
		// step. The next support starts at the current yaw; the lifted foot is free.
		if (pose.support) {
			const foot = object.getObjectByName(pose.support.foot)!;
			compensatedFeet.set(foot, foot.quaternion.clone());
			const parentRotation = foot.parent!.getWorldQuaternion(new Quaternion());
			const localUp = up.clone().applyQuaternion(parentRotation.invert());
			foot.quaternion.premultiply(new Quaternion().setFromAxisAngle(localUp, pose.support.yawOffset));
			object.updateMatrixWorld(true);
		}
		object.position.set(...pose.position);
		object.rotation.y = pose.yaw;
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

// RobotExpressive's feet are rigid meshes under these two named bones. Sample
// their actual sole vertices rather than assuming the bone origin is the floor.
const soleHeight = (foot: Object3D) => {
	let minimum = Infinity;
	foot.traverse((node) => {
		if (!(node as Mesh).isMesh) return;
		const mesh = node as Mesh;
		const vertices = mesh.geometry.getAttribute('position');
		for (let index = 0; index < vertices.count; index++) minimum = Math.min(minimum, new Vector3().fromBufferAttribute(vertices, index).applyMatrix4(mesh.matrixWorld).y);
	});
	return minimum;
};

export type ContactSample = { foot: string; anchor: [number, number] };

export const compileCharacterPerformance = (rig: ReturnType<typeof createCharacterRig>, direction: CharacterDirection, fps: number) => {
	const clock = compileDirection(direction, fps);
	const feet = ['FootL', 'FootR'].map((name) => {
		const foot = rig.object.getObjectByName(name);
		if (!foot) throw new Error(`RobotExpressive contact needs foot "${name}"`);
		return foot;
	});
	const poses: CharacterPose[] = [];
	const contacts: ContactSample[] = [];
	const root = new Vector3(...direction.stage.position);
	let support = 0;
	let anchor: Vector3 | undefined;
	let plantedYaw = direction.stage.yaw;
	for (let frame = 0; frame < clock.durationInFrames; frame++) {
		const authored = clock.poseAt(frame);
		const local = { ...authored, position: [0, 0, 0] as CharacterPose['position'], yaw: 0 };
		rig.sample(local);
		const heights = feet.map(soleHeight);
		// A small hysteresis avoids alternating anchors in double support.
		const candidate = heights[0] <= heights[1] ? 0 : 1;
		if (frame === 0 || heights[candidate] < heights[support] - 0.025) {
			support = candidate;
			anchor = feet[support].getWorldPosition(new Vector3()).applyAxisAngle(up, authored.yaw).add(root);
			plantedYaw = authored.yaw;
		}
		const yawOffset = plantedYaw - authored.yaw;
		const contact = { foot: feet[support].name, yawOffset };
		rig.sample({ ...local, support: contact });
		const offset = feet[support].getWorldPosition(new Vector3()).applyAxisAngle(up, authored.yaw);
		root.x = anchor!.x - offset.x;
		root.z = anchor!.z - offset.z;
		// Keep the lowest real sole at the authored clearance. This follows the
		// walk's heel/toe roll without pushing either foot through the floor.
		root.y = direction.stage.position[1] - Math.min(...feet.map(soleHeight));
		const pose = { ...authored, position: root.toArray() as CharacterPose['position'], support: contact };
		poses.push(pose);
		contacts.push({ foot: contact.foot, anchor: [anchor!.x, anchor!.z] });
	}
	// The complete table is derived from this saved rig, script and fps before
	// any requested frame is drawn. Direct/backward entry never integrates time.
	return { ...clock, poseAt: (frame: number) => poses[Math.max(0, Math.min(poses.length - 1, Math.floor(frame)))], contactAt: (frame: number) => contacts[frame] };
};
