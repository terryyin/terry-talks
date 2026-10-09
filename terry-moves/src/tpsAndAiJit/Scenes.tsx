import React from 'react';
import { Art, Heading } from '../tpsAndAi/Frame';
import { HousePicture } from '../tpsAndAi/House';
import { Shot, useSeconds } from './Frame';
import { sceneById, SceneId } from './film';

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
			<Heading style={{ fontSize: 76 }}>{view.heading}</Heading>
			<Art file={view.asset} style={{ left: 60, top: 230, width: 960, height: 600 }} />
		</> : <HousePicture highlightJIT heading={scene.heading} />}
	</Shot>;
};

/** The whole original illustration remains visible inside the shared art area. */
const IllustratedScene: React.FC<{ id: SceneId }> = ({ id }) => {
	const scene = sceneById(id);
	return <Shot id={id} seconds={useSeconds(id)}>
		<Heading style={{ fontSize: 76 }}>{scene.heading}</Heading>
		<Art file={scene.asset!} style={{ left: 60, top: 260, width: 960, height: 570 }} />
	</Shot>;
};

export const Resourceful: React.FC = () => <IllustratedScene id="resourceful" />;
export const Pull: React.FC = () => <IllustratedScene id="pull" />;
export const Feedback: React.FC = () => <IllustratedScene id="feedback" />;
