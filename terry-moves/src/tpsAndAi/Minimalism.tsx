import React from 'react';
import { Heading, palette, Shot, useSeconds } from './Frame';
import { cue, progress } from './film';
import { useFilmLanguage, useFilmText } from './language';
import { englishShellsAt } from './englishDirection';
const shells = [
	{ id: 'outer', x: 130, y: 285, width: 820, height: 420 },
	{ id: 'middle', x: 155, y: 315, width: 770, height: 360 },
	{ id: 'inner', x: 180, y: 345, width: 720, height: 300 },
];
export const MinimalismPicture: React.FC<{ seconds: number }> = ({ seconds }) => { const text = useFilmText(); const shellOpacities = useFilmLanguage() === 'en' ? englishShellsAt(seconds) : undefined; return <>
	<Heading>{text('minimalism')}</Heading>
	<svg viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0 }}>
		<g fill="none" stroke={palette.gray} strokeWidth="3" opacity={shellOpacities ? undefined : 0.35 * (1 - progress(seconds, cue('minimalism', 1), 2))}>
			{shells.map(({ id, ...geometry }, index) => <rect key={id} data-testid={shellOpacities ? `redundant-shell-${id}` : undefined} {...geometry} rx="4" opacity={shellOpacities?.[index]} />)}
		</g>
		<rect data-testid="necessary-behavior" x="218" y="392" width="644" height="206" rx="4" fill={palette.paper} stroke={palette.ink} strokeWidth="5" />
		<text x="540" y="483" textAnchor="middle" fill={palette.ink} fontSize="52">{text('necessaryBehavior')}</text><text x="540" y="548" textAnchor="middle" fill={palette.red} fontSize="45">{text('selfProtection')}</text>
	</svg>
</>; };
export const Minimalism: React.FC = () => { const seconds = useSeconds('minimalism'); return <Shot seconds={seconds} id="minimalism"><MinimalismPicture seconds={seconds} /></Shot>; };
