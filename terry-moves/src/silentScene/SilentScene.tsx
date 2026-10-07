import React from 'react';
import { Engineer } from '../aiTestAutomation/actors';
import { palette } from '../aiTestAutomation/design';
import { reach } from '../aiTestAutomation/motion';
import { Wrench } from '../aiTestAutomation/props';
import { ScenePose } from './compileScene';

export const SilentScene: React.FC<{ pose: ScenePose }> = ({ pose }) => {
	const y = pose.y - pose.lift;
	const wrist = { x: pose.x + 90, y: y - 180 };
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="100%" height="100%" data-testid="silent-scene">
		<rect width="1080" height="1080" fill={palette.paper}/>
		<Engineer x={pose.x} y={y} rightHand={reach(pose.x, y, wrist.x, wrist.y, 1)}/>
		<g data-testid="carried-wrench"><Wrench x={wrist.x} y={wrist.y}/></g>
	</svg>;
};
