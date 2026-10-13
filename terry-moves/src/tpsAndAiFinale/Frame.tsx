import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Brand, CaptionText, Paper } from '../tpsAndAi/Frame';
import { assetPathFor, captionAt, SceneId, sceneById } from './film';

export const useSeconds = (id: SceneId): number => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return sceneById(id).start + frame / fps;
};

export const Illustration: React.FC<{ file: string; style?: React.CSSProperties }> = ({ file, style }) => <Img src={staticFile(assetPathFor(file))} style={{ position: 'absolute', objectFit: 'contain', ...style }} />;

/** Close-ups use the original image's coordinates; the asset is never altered. */
export const IllustrationDetail: React.FC<{ file: string; sourceWidth: number; sourceHeight: number; x: number; y: number; width: number; height: number; top?: number; areaHeight?: number; opacity?: number; label: string; outgoing?: boolean }> = ({ file, sourceWidth, sourceHeight, x, y, width, height, top = 326, areaHeight = 478, opacity = 1, label, outgoing = false }) => {
	const scale = Math.min(940 / width, areaHeight / height);
	const fittedWidth = width * scale;
	const fittedHeight = height * scale;
	return <div data-illustration-view={outgoing ? undefined : label} data-illustration-outgoing={outgoing ? label : undefined} style={{ position: 'absolute', left: (1080 - fittedWidth) / 2, top: top + (areaHeight - fittedHeight) / 2, width: fittedWidth, height: fittedHeight, overflow: 'hidden', opacity }}>
		<Illustration file={file} style={{ left: -x * scale, top: -y * scale, width: sourceWidth * scale, height: sourceHeight * scale }} />
	</div>;
};

export const Shot: React.FC<React.PropsWithChildren<{ id: SceneId; seconds: number }>> = ({ id, seconds, children }) => {
	const caption = captionAt(seconds);
	return <Paper>
		<div data-scene={id} style={{ position: 'absolute', inset: 0 }}>{children}</div>
		<CaptionText text={caption?.spoken} lineBreakAfter={caption?.lineBreakAfter} />
		<Brand />
	</Paper>;
};
