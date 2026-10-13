import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Art } from '../tpsAndAi/Frame';
import { DirectedHeading } from './DirectedHeading';
import { closingFramingAt, headingDirections, panoramaTimeline } from './direction';
import { Shot, useSeconds } from './Frame';
import { FocusView, sceneById } from './film';

/** Crop the unchanged panorama in source-image coordinates, keeping its aspect. */
export const FocusedPanorama: React.FC<{ view: FocusView; top?: number; height?: number; opacity?: number; outgoing?: boolean }> = ({ view, top = 294, height = 536, opacity = 1, outgoing = false }) => {
	const scale = Math.min(940 / view.width, height / view.height);
	const width = view.width * scale;
	const fittedHeight = view.height * scale;
	return <div data-focus={outgoing ? undefined : view.id} data-panorama-outgoing={outgoing ? view.id : undefined} style={{ position: 'absolute', left: (1080 - width) / 2, top: top + (height - fittedHeight) / 2, width, height: fittedHeight, overflow: 'hidden', clipPath: view.clipPath, opacity }}>
		<Art file="integration-coordination.png" style={{ left: -view.x * scale, top: -view.y * scale, width: 2022 * scale, height: 778 * scale }} />
	</div>;
};

export const Integration: React.FC = () => {
	const seconds = useSeconds('integration');
	const scene = sceneById('integration');
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const performance = useMemo(() => panoramaTimeline(scene.focusViews!, fps), [scene, fps]);
	const pose = performance.poseAt(frame);
	return <Shot id="integration" seconds={seconds}>
		<DirectedHeading direction={headingDirections.integration} seconds={seconds - scene.start} />
		<FocusedPanorama view={pose.view} opacity={pose.opacity} />
		{pose.outgoing ? <FocusedPanorama view={pose.outgoing.view} opacity={pose.outgoing.opacity} outgoing /> : null}
	</Shot>;
};

export const Closing: React.FC = () => {
	const seconds = useSeconds('closing');
	const scene = sceneById('closing');
	return <Shot id="closing" seconds={seconds}>
		<DirectedHeading direction={headingDirections.closing} seconds={seconds - scene.start} />
		<FocusedPanorama view={scene.focusViews![0]} {...closingFramingAt(seconds - scene.start)} />
		{seconds >= scene.creditStart! ? <div data-testid="film-credits" style={{ position: 'absolute', left: 64, right: 64, top: 898, fontSize: 56, lineHeight: 1.2, textAlign: 'center' }}>{scene.creditLines![0]}</div> : null}
	</Shot>;
};
