import React from 'react';
import { Engineer } from '../aiTestAutomation/actors';
import { palette } from '../aiTestAutomation/design';
import { Wrench } from '../aiTestAutomation/props';
import { ScenePose } from './compileScene';
import { SceneScript } from './script';

export const SilentScene: React.FC<{ pose: ScenePose; places: SceneScript['places'] }> = ({ pose, places }) => {
	const y = pose.y - pose.lift;
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="100%" height="100%" data-testid="silent-scene">
		<rect width="1080" height="1080" fill={palette.paper}/>
		{/* The slab's top sits under the foot of a prop drawn at the surface point. */}
		{Object.entries(places).map(([name, { surface }]) => surface && <rect key={name} data-testid="surface" data-place={name} x={surface.x - 70} y={surface.y + 48} width="140" height="14" rx="4" fill={palette.wood} stroke={palette.ink} strokeWidth="4"/>)}
		{Object.entries(pose.resting).map(([name, point]) => <g key={name} data-testid="resting-prop" data-prop={name}><Wrench x={point.x} y={point.y}/></g>)}
		<Engineer x={pose.x} y={y} rightHand={pose.hand} gaze={pose.gaze}/>
		{pose.held !== null && <g data-testid="carried-prop" data-prop={pose.held}><Wrench x={pose.x + pose.hand.x} y={y + pose.hand.y}/></g>}
	</svg>;
};
