import React from 'react';
import { Art, Heading } from '../tpsAndAi/Frame';
import { Shot, useSeconds } from './Frame';
import { FocusView, sceneById } from './film';

/** Crop the unchanged panorama in source-image coordinates, keeping its aspect. */
export const FocusedPanorama: React.FC<{ view: FocusView; top?: number; height?: number }> = ({ view, top = 294, height = 536 }) => {
	const scale = Math.min(940 / view.width, height / view.height);
	const width = view.width * scale;
	const fittedHeight = view.height * scale;
	return <div data-focus={view.id} style={{ position: 'absolute', left: (1080 - width) / 2, top: top + (height - fittedHeight) / 2, width, height: fittedHeight, overflow: 'hidden', clipPath: view.clipPath }}>
		<Art file="integration-coordination.png" style={{ left: -view.x * scale, top: -view.y * scale, width: 2022 * scale, height: 778 * scale }} />
	</div>;
};

export const Integration: React.FC = () => {
	const seconds = useSeconds('integration');
	const scene = sceneById('integration');
	const view = scene.focusViews!.find((focus) => seconds >= focus.start && seconds < focus.end) ?? scene.focusViews![0];
	return <Shot id="integration" seconds={seconds}>
		<Heading style={{ fontSize: 64, whiteSpace: 'pre-line', lineHeight: 1.14 }}>{scene.heading}</Heading>
		<FocusedPanorama view={view} />
	</Shot>;
};

export const Closing: React.FC = () => {
	const seconds = useSeconds('closing');
	const scene = sceneById('closing');
	return <Shot id="closing" seconds={seconds}>
		<Heading>{scene.heading}</Heading>
		<FocusedPanorama view={scene.focusViews![0]} top={250} height={580} />
		{seconds >= scene.creditStart! ? <div data-testid="film-credits" style={{ position: 'absolute', left: 64, right: 64, top: 898, fontSize: 56, lineHeight: 1.2, textAlign: 'center' }}>{scene.creditLines![0]}</div> : null}
	</Shot>;
};
