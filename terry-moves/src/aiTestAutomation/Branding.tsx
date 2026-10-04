import React from 'react';
import { AbsoluteFill } from 'remotion';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import { BODY, Definitions, HEAD, Label, palette } from './design';
import { AUTHOR_CREDIT, CLOSING_LINES, durationInFrames, filmScript, FPS, reveal, STAGE } from './film';

export const OddeCorner: React.FC = () => <div data-testid="odde-logo" style={{ position: 'absolute', left: 927, top: 2, width: 128, height: 128 * 0.98 }}>
	<OddeLogo/>
	<FlipCoin speed={2} interval={20} shift={0}><OddeLogoInner/></FlipCoin>
</div>;

// The silent author hold follows the complete measured film; it never retimes speech.
export const AuthorCard: React.FC<{ frame: number }> = ({ frame }) => {
	const arrival = reveal((frame - durationInFrames) / FPS, 0, 0.45);
	return <AbsoluteFill style={{ background: palette.paper }} data-testid="author-card">
		<svg width={STAGE.width} height={STAGE.height} viewBox="0 0 1080 1350" role="img" aria-label={AUTHOR_CREDIT}>
			<Definitions/>
			<rect width="1080" height="1350" filter="url(#paper-grain)" fill={palette.paper}/>
			<Label x={65} y={55} size={18} anchor="start" color={palette.muted}>TERRY MOVES / THE LEGACY WORKSHOP</Label>
			<g opacity={arrival} transform={`translate(0 ${(1 - arrival) * 12})`}>
				<g fontFamily={HEAD} fontWeight="700" fontSize="66" fill={palette.ink} letterSpacing="-1.8" textAnchor="middle">
					<text x="540" y="440">{CLOSING_LINES[0]}</text><text x="540" y="522">{CLOSING_LINES[1]}</text>
				</g>
				<path d="M497 583H583" stroke={palette.coral} strokeWidth="8" strokeLinecap="round"/>
				<text x="540" y="742" fontFamily={BODY} fontWeight="700" fontSize="52" textAnchor="middle" fill={palette.ink}>{AUTHOR_CREDIT}</text>
			</g>
			<Label x={540} y={1305} size={17} color={palette.muted}>{filmScript.voiceCredit}</Label>
		</svg>
	</AbsoluteFill>;
};
