import React from 'react';
import { Heading, palette, sans, Shot, useSeconds } from './Frame';
import { useFilmLanguage, useFilmText, useLocalizedFilmFonts } from './language';
export const HousePicture: React.FC = () => { const text = useFilmText(); const fonts = useLocalizedFilmFonts(); const japanese = useFilmLanguage() === 'ja'; return <>
	<Heading style={{ fontSize: 66 }}>{text('house')}</Heading>
	<svg data-testid="tps-house" viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0, fontFamily: fonts?.sans ?? sans }}>
		<path d="M90 424 L540 220 L990 424 Z" fill={palette.ink} stroke={palette.ink} strokeWidth="5" strokeLinejoin="round" />
		<g textAnchor="middle" fill={palette.paper}><text x="540" y="325" fontSize="48">{text('quality')}</text><text x="540" y="388" fontSize="34">{text('costAndLeadTime')}</text></g>
		<rect x="138" y="424" width="804" height="314" fill="#f5efe5" stroke={palette.gray} strokeWidth="4" />
		<rect data-testid="jidoka-pillar" x="138" y="424" width="260" height="314" fill="#f0d9cf" stroke={palette.red} strokeWidth="5" />
		<path d="M682 424 V738" stroke={palette.gray} strokeWidth="4" />
		<g textAnchor="middle">
			<text x="268" y="517" fill={palette.red} fontSize="58" fontWeight="600">{text('jidoka')}</text>
			<text x="268" y="589" fill={palette.gray} fontSize="38">{text('stopAt')}</text><text x="268" y="637" fill={palette.gray} fontSize="38">{text('abnormality')}</text>
			<text x="540" y="537" fill={palette.ink} fontSize="47">{text('people')}</text><text x="540" y="627" fill={palette.ink} fontSize="47">{text('kaizen')}</text>
			<text x="812" y={japanese ? 489 : 517} fill={palette.ink} fontSize="40">{japanese ? <><tspan x="812">{text('justInTime').split('\n')[0]}</tspan><tspan x="812" dy="48">{text('justInTime').split('\n')[1]}</tspan></> : text('justInTime')}</text><text x="812" y="589" fill={palette.gray} fontSize="38">{text('onlyWhat')}</text><text x="812" y="637" fill={palette.gray} fontSize="38">{text('isNeeded')}</text>
		</g>
		<rect x="110" y="738" width="860" height="92" fill={palette.paper} stroke={palette.gray} strokeWidth="4" />
		<text x="540" y="777" textAnchor="middle" fill={palette.ink} fontSize="34">{text('standardizedWork')}</text><text x="540" y="813" textAnchor="middle" fill={palette.gray} fontSize="32">{text('stability')}</text>
	</svg>
</>; };
export const House: React.FC = () => <Shot seconds={useSeconds('house')} id="house"><HousePicture /></Shot>;
