import React from 'react';
import { Art, Heading } from '../tpsAndAi/Frame';
import { HousePicture } from '../tpsAndAi/House';
import { DirectedHeading } from './DirectedHeading';
import { definitionDirections, headingDirections } from './direction';
import { Shot, useSeconds } from './Frame';
import { sceneById } from './film';

export const Hook: React.FC = () => {
	const scene = sceneById('hook');
	return <Shot id="hook" seconds={useSeconds('hook')}>
		<Heading>{scene.heading}</Heading>
		<Heading style={{ top: 214, fontSize: 48, whiteSpace: 'pre-line' }}>{scene.subheading}</Heading>
		<Art file={scene.asset!} style={{ left: 180, top: 340, width: 720, height: 490 }} />
	</Shot>;
};

export const House: React.FC = () => {
	const seconds = useSeconds('house');
	const scene = sceneById('house');
	const view = scene.definitionViews!.find((entry) => seconds >= entry.start && seconds < entry.end);
	return <Shot id="house" seconds={seconds}>
		{view ? <>
			<DirectedHeading direction={definitionDirections[scene.definitionViews!.indexOf(view)]} seconds={seconds - view.start} />
			<Art file={view.asset} style={{ left: 60, top: 230, width: 960, height: 600 }} />
		</> : <HousePicture highlightJIT heading={scene.heading} />}
	</Shot>;
};

/** The whole original illustration remains visible inside the shared art area. */
const IllustratedScene: React.FC<{ id: 'resourceful' | 'pull' | 'feedback' }> = ({ id }) => {
	const scene = sceneById(id);
	const seconds = useSeconds(id);
	return <Shot id={id} seconds={seconds}>
		<DirectedHeading direction={headingDirections[id]} seconds={seconds - scene.start} />
		<Art file={scene.asset!} style={{ left: 60, top: 260, width: 960, height: 570 }} />
	</Shot>;
};

export const Resourceful: React.FC = () => <IllustratedScene id="resourceful" />;
export const Pull: React.FC = () => <IllustratedScene id="pull" />;
export const Feedback: React.FC = () => <IllustratedScene id="feedback" />;
