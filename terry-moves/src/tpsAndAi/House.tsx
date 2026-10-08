import React from 'react';
import { Heading, palette, sans, Shot, useSeconds } from './Frame';
export const HousePicture: React.FC = () => <>
	<Heading style={{ fontSize: 66 }}>Toyota Production System</Heading>
	<svg data-testid="tps-house" viewBox="0 0 1080 1080" style={{ position: 'absolute', inset: 0, fontFamily: sans }}>
		<path d="M90 424 L540 220 L990 424 Z" fill={palette.ink} stroke={palette.ink} strokeWidth="5" strokeLinejoin="round" />
		<g textAnchor="middle" fill={palette.paper}><text x="540" y="325" fontSize="48">Best quality</text><text x="540" y="388" fontSize="34">Lowest cost · Shortest lead time</text></g>
		<rect x="138" y="424" width="804" height="314" fill="#f5efe5" stroke={palette.gray} strokeWidth="4" />
		<rect data-testid="jidoka-pillar" x="138" y="424" width="260" height="314" fill="#f0d9cf" stroke={palette.red} strokeWidth="5" />
		<path d="M682 424 V738" stroke={palette.gray} strokeWidth="4" />
		<g textAnchor="middle">
			<text x="268" y="517" fill={palette.red} fontSize="58" fontWeight="600">Jidoka</text>
			<text x="268" y="589" fill={palette.gray} fontSize="38">Stop at</text><text x="268" y="637" fill={palette.gray} fontSize="38">abnormality</text>
			<text x="540" y="537" fill={palette.ink} fontSize="47">People</text><text x="540" y="627" fill={palette.ink} fontSize="47">Kaizen</text>
			<text x="812" y="517" fill={palette.ink} fontSize="40">Just-in-Time</text><text x="812" y="589" fill={palette.gray} fontSize="38">Only what</text><text x="812" y="637" fill={palette.gray} fontSize="38">is needed</text>
		</g>
		<rect x="110" y="738" width="860" height="92" fill={palette.paper} stroke={palette.gray} strokeWidth="4" />
		<text x="540" y="777" textAnchor="middle" fill={palette.ink} fontSize="34">Standardized work · Heijunka</text><text x="540" y="813" textAnchor="middle" fill={palette.gray} fontSize="32">Stability</text>
	</svg>
</>;
export const House: React.FC = () => <Shot seconds={useSeconds('house')} id="house"><HousePicture /></Shot>;
