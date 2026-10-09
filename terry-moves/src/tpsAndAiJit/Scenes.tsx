import React from 'react';
import { Art, Heading } from '../tpsAndAi/Frame';
import { HousePicture } from '../tpsAndAi/House';
import { Shot, useSeconds } from './Frame';
import { sceneById, SceneId } from './film';

export const Hook: React.FC = () => {
	const scene = sceneById('hook');
	return <Shot id="hook" seconds={useSeconds('hook')}>
		<Heading>{scene.heading}</Heading>
		<Heading style={{ top: 214, fontSize: 58 }}>{scene.subheading}</Heading>
		<Art file={scene.asset!} style={{ left: 180, top: 298, width: 720, height: 540 }} />
	</Shot>;
};

export const House: React.FC = () => <Shot id="house" seconds={useSeconds('house')}><HousePicture highlightJIT heading={sceneById('house').heading} /></Shot>;

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
