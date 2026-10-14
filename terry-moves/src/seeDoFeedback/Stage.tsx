import React from 'react';
import { AbsoluteFill, CanvasImage, staticFile, useVideoConfig } from 'remotion';
import { poppinsFontFamily } from './font';

export const colors = { ivory: '#FFFFFF', ink: '#222222', muted: '#6C706E', gold: '#D29B23', coral: '#C36F55' } as const;

export const Stage: React.FC<React.PropsWithChildren<{ chapter?: string }>> = ({ chapter, children }) => {
	const { fps } = useVideoConfig();
	return <AbsoluteFill style={{ backgroundColor: colors.ivory, color: colors.ink, fontFamily: poppinsFontFamily, overflow: 'hidden' }}>
		{chapter ? <div style={{ position: 'absolute', left: 72, top: 87, fontSize: 24, fontWeight: 500, letterSpacing: 1.5, color: colors.muted }}>{chapter}</div> : null}
		{children}
		<CanvasImage name="Odd-e — upper-right" src={staticFile('assets/tps-and-ai/odd-e-logo.png')} premountFor={fps} style={{ position: 'absolute', left: 928, top: 56, width: 96, height: 96, zIndex: 10 }} />
	</AbsoluteFill>;
};
