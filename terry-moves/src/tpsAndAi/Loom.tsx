import React from 'react';
import { Freeze, OffthreadVideo, staticFile, useVideoConfig } from 'remotion';
import { Art, Heading, palette, Shot, useSeconds } from './Frame';
import { loomFrameAt } from './film';
import { JA_FONT_FAMILY, useFilmLanguage, useFilmText } from './language';
export const LoomPicture: React.FC<{ seconds: number; fps: number }> = ({ seconds, fps }) => { const text = useFilmText(); const japanese = useFilmLanguage() === 'ja'; return <>
	<Heading style={{ top: 104, fontSize: 74 }}>{text('loom')}</Heading>
	<div data-testid="loom-clip" data-source-frame={loomFrameAt(seconds, fps)} style={{ position: 'absolute', left: 90, top: 232, width: 900, height: 506.25 }}>
		<Freeze frame={loomFrameAt(seconds, fps)}><OffthreadVideo src={staticFile('assets/tps-and-ai/loom-warp-stop.mp4')} muted style={{ width: '100%', height: '100%' }} /></Freeze>
	</div>
	<Art file="jidoka-human-radical.svg" style={{ left: 315, top: 660, width: 450, height: 180 }} />
	{japanese ? <svg data-testid="radical-translation" viewBox="0 0 600 240" style={{ position: 'absolute', left: 315, top: 660, width: 450, height: 180 }}><rect x="140" y="212" width="194" height="28" fill={palette.paper} /><text x="237" y="234" textAnchor="middle" fill="#c33b2b" fontFamily={JA_FONT_FAMILY} fontSize="21">{text('radical')}</text></svg> : null}
</>; };
export const Loom: React.FC = () => { const seconds = useSeconds('loom'); const { fps } = useVideoConfig(); return <Shot seconds={seconds} id="loom"><LoomPicture seconds={seconds} fps={fps} /></Shot>; };
