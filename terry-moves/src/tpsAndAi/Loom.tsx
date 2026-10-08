import React from 'react';
import { Freeze, OffthreadVideo, staticFile, useVideoConfig } from 'remotion';
import { Art, Heading, Shot, useSeconds } from './Frame';
import { loomFrameAt } from './film';
export const LoomPicture: React.FC<{ seconds: number; fps: number }> = ({ seconds, fps }) => <>
	<Heading style={{ top: 104, fontSize: 74 }}>Human wisdom, built in.</Heading>
	<div data-testid="loom-clip" data-source-frame={loomFrameAt(seconds, fps)} style={{ position: 'absolute', left: 90, top: 232, width: 900, height: 506.25 }}>
		<Freeze frame={loomFrameAt(seconds, fps)}><OffthreadVideo src={staticFile('assets/tps-and-ai/loom-warp-stop.mp4')} muted style={{ width: '100%', height: '100%' }} /></Freeze>
	</div>
	<Art file="jidoka-human-radical.svg" style={{ left: 315, top: 660, width: 450, height: 180 }} />
</>;
export const Loom: React.FC = () => { const seconds = useSeconds('loom'); const { fps } = useVideoConfig(); return <Shot seconds={seconds} id="loom"><LoomPicture seconds={seconds} fps={fps} /></Shot>; };
