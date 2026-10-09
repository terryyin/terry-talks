import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Brand, CaptionText, Paper } from '../tpsAndAi/Frame';
import { captionAt, SceneId, sceneById } from './film';

export const useSeconds = (id: SceneId): number => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return sceneById(id).start + frame / fps;
};

export const Captions: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	return <CaptionText text={caption?.spoken} lineBreakAfter={caption?.lineBreakAfter} />;
};

export const Shot: React.FC<React.PropsWithChildren<{ id: SceneId; seconds: number }>> = ({ id, seconds, children }) => <Paper>
	<div data-scene={id} style={{ position: 'absolute', inset: 0 }}>{children}</div>
	<Captions seconds={seconds} />
	<Brand />
</Paper>;
