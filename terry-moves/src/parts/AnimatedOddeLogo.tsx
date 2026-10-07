import React from 'react';
import { OddeLogo } from './OddeLogo';
import { OddeLogoInner } from './OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';

// The established outer mark and animated inner coin, shared by film corners.
export const AnimatedOddeLogo: React.FC<{ left: number; top: number; width: number }> = ({ left, top, width }) => (
	<div data-testid="odde-logo" style={{ position: 'absolute', left, top, width, height: width * 0.98 }}>
		<OddeLogo />
		<FlipCoin speed={2} interval={20} shift={0}><OddeLogoInner /></FlipCoin>
	</div>
);
