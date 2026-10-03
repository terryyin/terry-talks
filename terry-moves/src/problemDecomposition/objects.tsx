import React from 'react';
import { bodyFont, headlineFont, palette } from './design';

/** The real bill becomes a readable, animated foreground object. */
export const Receipt: React.FC<{ width?: number; amount?: string }> = ({ width = 220, amount = '$90' }) => (
	<svg width={width} height={width * 1.24} viewBox="0 0 220 273" aria-label={`Dinner bill total ${amount}`}>
		<path d="M14 8 L207 8 L207 252 L199 247 L191 255 L183 249 L175 256 L167 250 L159 257 L151 250 L143 257 L135 251 L127 258 L119 251 L111 258 L103 251 L95 258 L87 251 L79 258 L71 251 L63 258 L55 251 L47 258 L39 251 L31 258 L23 251 L14 257 Z" fill="#172c421c" transform="translate(6 8)" />
		<path d="M8 2 L201 2 L201 246 L193 241 L185 249 L177 243 L169 250 L161 244 L153 251 L145 244 L137 251 L129 245 L121 252 L113 245 L105 252 L97 245 L89 252 L81 245 L73 252 L65 245 L57 252 L49 245 L41 252 L33 245 L25 252 L17 245 L8 251 Z" fill={palette.paperLight} stroke={palette.rule} strokeWidth="1.5" />
		<text x="105" y="38" textAnchor="middle" fontFamily={bodyFont} fontSize="13" letterSpacing="3" fill={palette.muted}>DINNER FOR THREE</text>
		<line x1="28" y1="57" x2="181" y2="57" stroke={palette.rule} strokeWidth="1" />
		<text x="105" y="87" textAnchor="middle" fontFamily={bodyFont} fontSize="18" fill={palette.ink}>Dinner · 3 people</text>
		<line x1="28" y1="107" x2="181" y2="107" stroke={palette.rule} strokeDasharray="3 4" />
		<text x="105" y="166" textAnchor="middle" fontFamily={headlineFont} fontSize="61" fill={palette.ink}>{amount}</text>
		<text x="105" y="203" textAnchor="middle" fontFamily={bodyFont} fontSize="15" letterSpacing="3" fill={palette.muted}>TOTAL</text>
	</svg>
);

export const SplitPhone: React.FC<{ width?: number; shown?: number }> = ({ width = 270, shown = 1 }) => (
	<svg width={width} height={width * 1.48} viewBox="0 0 270 400" aria-label="Equal splitting works: three friends each owe thirty dollars">
		<rect x="12" y="10" width="246" height="378" rx="30" fill="#172c4228" transform="translate(5 7)" />
		<rect x="5" y="3" width="246" height="378" rx="30" fill={palette.ink} />
		<rect x="14" y="12" width="228" height="360" rx="22" fill={palette.paperLight} />
		<rect x="94" y="17" width="67" height="7" rx="3.5" fill={palette.ink} />
		<text x="128" y="60" textAnchor="middle" fontFamily={bodyFont} fontSize="15" letterSpacing="1.8" fill={palette.muted}>SPLIT EQUALLY</text>
		<text x="128" y="110" textAnchor="middle" fontFamily={headlineFont} fontSize="44" fill={palette.ink}>$90 ÷ 3</text>
		{[0, 1, 2].map((index) => (
			<g key={index} opacity={Math.max(0, Math.min(1, shown * 3 - index))}>
				<line x1="36" y1={138 + index * 58} x2="220" y2={138 + index * 58} stroke={palette.rule} />
				<circle cx="46" cy={165 + index * 58} r="6" fill={[palette.cobalt, palette.gold, palette.terracotta][index]} />
				<text x="61" y={172 + index * 58} fontFamily={bodyFont} fontSize="17" fill={palette.ink}>Friend {index + 1}</text>
				<text x="215" y={176 + index * 58} textAnchor="end" fontFamily={headlineFont} fontSize="31" fill={palette.cobalt}>$30</text>
			</g>
		))}
		<g opacity={Math.max(0, (shown - 0.7) / 0.3)}>
			<rect x="35" y="324" width="185" height="29" rx="14.5" fill={palette.cobalt} />
			<text x="128" y="344" textAnchor="middle" fontFamily={bodyFont} fontSize="14" fill={palette.paperLight}>Everyone knows what to pay</text>
		</g>
	</svg>
);

export const PartIcon: React.FC<{ part: 'database' | 'api' | 'screen' }> = ({ part }) => {
	const common = { fill: 'none', stroke: palette.paperLight, strokeWidth: 2.8, strokeLinecap: 'round' as const };
	return (
		<svg width="56" height="56" viewBox="0 0 56 56">
			{part === 'database' ? (
				<g {...common}>
					<ellipse cx="28" cy="12" rx="18" ry="7" />
					<path d="M10 12 v29 c0 10 36 10 36 0 V12 M10 26 c0 10 36 10 36 0" />
				</g>
			) : part === 'api' ? (
				<g {...common}>
					<path d="M19 14 L7 28 L19 42 M37 14 L49 28 L37 42 M33 10 L23 46" />
				</g>
			) : (
				<g {...common}>
					<rect x="6" y="7" width="44" height="31" rx="3" />
					<path d="M20 48 H36 M28 38 V48" />
				</g>
			)}
		</svg>
	);
};
