import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BODY, Definitions, HEAD, Label, palette, Workshop } from './design';
import { captionAt, FilmScene, filmScript, reveal, sceneAt, STAGE } from './film';
import { Hook, Overload, PurposeAndProof, StopAndFix, Upkeep } from './Problem';
import { Investigate, SandboxShot } from './Learning';
import { Selective } from './Selective';
import { Ending, Optimize } from './Protection';
import { mix, travel } from './motion';

const Header: React.FC<{ scene: FilmScene; seconds: number }> = ({ scene, seconds }) => {
	const titles: Record<FilmScene['id'], [string, string]> = {
		hook: seconds < scene.captionRanges[1]?.start ? ['Ask AI to write', 'more tests?'] : ['You probably don’t', 'want to do that.'],
		overload: seconds < scene.captionRanges[1]?.start ? ['Tickets arrive.', 'Faster than fixes.'] : seconds < scene.captionRanges[2]?.start ? ['Not enough', 'automated tests?'] : ['You’re probably', 'right.'],
		purpose: ['Tests define purpose.', 'And provide proof.'],
		upkeep: seconds < scene.captionRanges[1]?.start ? ['Before protection:', 'more to maintain.'] : seconds < scene.captionRanges[2]?.start ? ['High-level engineering.', 'Protect original intent.'] : ['AI piles on code.', 'Upkeep arrives first.'],
		stopFix: ['', ''],
		sandbox: ['A better use of AI?', 'Hands-on testing.'],
		investigate: seconds < scene.captionRanges[3]?.start ? ['Confirm. Explore.', 'Check known behavior.'] : ['A system in panic', 'needs relief.'],
		selective: seconds < scene.captionRanges[2]?.start ? ['Useful checks.', 'Ordinary test code.'] : ['New features?', 'Start with intent.'],
		optimize: ['Simplify the suite.', 'Keep what matters.'],
		end: ['Less to carry.', 'Fewer bugs to chase.'],
	};
	return <g>
		<Label x={65} y={55} size={18} anchor="start" color={palette.muted}>TERRY MOVES / THE LEGACY WORKSHOP</Label>
		<g fontFamily={HEAD} fontWeight="700" fontSize="64" fill={palette.ink} letterSpacing="-1.8">
			<text x="65" y="144">{titles[scene.id][0]}</text><text x="65" y="222">{titles[scene.id][1]}</text>
		</g>
		<path d="M65 263H147" stroke={palette.coral} strokeWidth="8" strokeLinecap="round"/>
		{scene.id !== 'hook' && <Label x={172} y={271} size={21} anchor="start" color={palette.muted}>LARGE LEGACY PROJECT · MAINTENANCE OVERLOAD</Label>}
	</g>;
};

const CaptionBar: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	return <div data-testid="caption-bar" style={{ position: 'absolute', left: 0, top: 1125, width: 1080, height: 225, boxSizing: 'border-box', background: palette.paper, borderTop: '2px solid #D9C8B3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '22px 76px 35px' }}>
		<div style={{ fontFamily: BODY, fontSize: 44, fontWeight: 600, lineHeight: 1.24, textAlign: 'center', color: palette.ink }}>{caption?.text}</div>
		{sceneAt(seconds).id === 'end' && <div style={{ position: 'absolute', bottom: 13, left: 0, right: 0, fontFamily: BODY, textAlign: 'center', color: palette.muted, fontSize: 17, letterSpacing: 1 }}>{filmScript.voiceCredit}</div>}
	</div>;
};

export const AITestAutomationScene: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	// The opening is fully present on frame zero for a muted feed. Later shots settle quickly.
	const arrival = scene.id === 'hook' ? 1 : reveal(seconds, scene.start, 0.22);
	const settle = travel(seconds, scene.start, Math.min(1.2, scene.end - scene.start));
	const zoom = scene.id === 'hook' ? mix(1, 1.025, travel(seconds, 0.8, 2.7)) : scene.id === 'investigate' ? mix(1, 1.035, settle) : scene.id === 'overload' ? mix(1.025, 1, settle) : 1;
	const camera = `translate(540 715) scale(${zoom}) translate(-540 -715)`;
	return <AbsoluteFill style={{ background: palette.paper }} data-scene={scene.id}>
		<svg width={STAGE.width} height={STAGE.height} viewBox="0 0 1080 1350" role="img" aria-label={`${scene.label}: illustrated legacy workshop`}>
			<Definitions/><Workshop quiet={scene.id === 'end'}/><Header scene={scene} seconds={seconds}/>
			<g opacity={arrival} transform={`translate(0 ${(1 - arrival) * 9})`}><g transform={camera}>
				{scene.id === 'hook' && <Hook seconds={seconds} scene={scene}/>}
				{scene.id === 'overload' && <Overload seconds={seconds} scene={scene}/>}
				{scene.id === 'purpose' && <PurposeAndProof seconds={seconds} scene={scene}/>}
				{scene.id === 'upkeep' && <Upkeep seconds={seconds} scene={scene}/>}
				{scene.id === 'stopFix' && <StopAndFix seconds={seconds} scene={scene}/>}
				{scene.id === 'sandbox' && <SandboxShot seconds={seconds} scene={scene}/>}
				{scene.id === 'investigate' && <Investigate seconds={seconds} scene={scene}/>}
				{scene.id === 'selective' && <Selective seconds={seconds} scene={scene}/>}
				{scene.id === 'optimize' && <Optimize seconds={seconds} scene={scene}/>}
				{scene.id === 'end' && <Ending seconds={seconds} scene={scene}/>}
			</g></g>
			<path d={`M0 1124H${1080 * seconds / filmScript.duration}`} stroke={palette.mint} strokeWidth="4"/>
		</svg>
		<CaptionBar seconds={seconds}/>
	</AbsoluteFill>;
};
