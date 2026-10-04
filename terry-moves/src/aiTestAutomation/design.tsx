import React from 'react';

export const palette = {
	paper: '#FFF6E7', ink: '#24344B', mint: '#5BBEB5', sky: '#9BD4E5', coral: '#EC6E5A',
	gold: '#F7C85C', lavender: '#BCA4D8', green: '#3FA56A', skin: '#DDA37F', cream: '#FFFDF6',
	wood: '#D7AF85', muted: '#697B87', red: '#C74D43', shadow: '#B99A7A',
};
export const BODY = 'Avenir Next, Trebuchet MS, sans-serif';
export const HEAD = 'Georgia, serif';

export const Definitions: React.FC = () => <defs>
	<filter id="paper-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.64" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.045"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
	<filter id="paper-shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="9" stdDeviation="5" floodColor={palette.ink} floodOpacity="0.14"/></filter>
	<linearGradient id="warm-wall" x1="0" y1="0" x2="1" y2="1"><stop stopColor={palette.paper}/><stop offset="1" stopColor="#F1E2CF"/></linearGradient>
	<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#E6F8F5" stopOpacity="0.85"/><stop offset="1" stopColor="#CCE6E6" stopOpacity="0.24"/></linearGradient>
</defs>;

export const Label: React.FC<{ x: number; y: number; children: React.ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({ x, y, children, size = 24, color = palette.ink, anchor = 'middle' }) => <text x={x} y={y} textAnchor={anchor} fill={color} stroke="none" fontFamily={BODY} fontWeight="700" fontSize={size} letterSpacing="1">{children}</text>;

export const Workshop: React.FC<{ quiet?: boolean }> = ({ quiet = false }) => <g>
	<rect width="1080" height="1125" fill="url(#warm-wall)"/>
	<path d="M0 975H1080V1125H0Z" fill="#EBD6BE"/>
	<path d="M0 975H1080 M0 1038H1080 M75 1125L274 975 M455 1125L516 975 M810 1125L770 975" stroke="#C5A586" strokeWidth="3" opacity="0.36"/>
	<g opacity="0.76" stroke={palette.ink} strokeWidth="4" strokeLinejoin="round">
		<path d="M90 333L278 311V543L90 558Z" fill={palette.cream}/>
		<path d="M103 347L265 328V530L103 543Z" fill="#D8E9DE"/>
		<path d="M183 338V536 M102 429L267 412" fill="none"/>
		<path d="M107 537C145 428 145 451 166 461C173 392 213 430 209 467C234 432 249 468 260 529" fill="#B7C9B4" stroke="none"/>
		<path d="M875 336L981 349V568L875 555Z" fill="#E4D1B8"/>
		<path d="M888 360L967 370M888 411L967 421M888 461L967 471M888 511L967 521" stroke="#B8987B"/>
	</g>
	<path d="M54 724L166 708L266 722L151 742Z" fill={palette.wood} stroke={palette.ink} strokeWidth="4"/>
	<path d="M63 730V961M245 729V975M158 744V1005" stroke={palette.ink} strokeWidth="10"/>
	<g transform="translate(110 636) rotate(-5)" stroke={palette.ink} strokeWidth="4"><rect width="72" height="70" rx="5" fill={palette.lavender}/><path d="M16 18H57M16 31H49M16 44H55" strokeWidth="3" opacity="0.55"/></g>
	<path d="M510 286V313 M465 334Q510 270 555 334Z" fill={palette.gold} stroke={palette.ink} strokeWidth="5"/>
	<ellipse cx="510" cy="335" rx="46" ry="13" fill="#FFDEA0" stroke={palette.ink} strokeWidth="4"/>
	<path d="M450 344L322 785H722L567 345Z" fill="#FFEFBD" opacity="0.13"/>
	<g transform="translate(945 874)"><path d="M-37 16L-25 109H25L38 16Z" fill={palette.coral} stroke={palette.ink} strokeWidth="4"/><path d="M0 20Q-66-19-57-80Q1-62 0 20 M0 0Q47-81 67-47Q77-13 0 0 M0 30Q-14-105 12-130Q46-64 0 30" fill="#759A77" stroke={palette.ink} strokeWidth="4"/></g>
	{!quiet && <g opacity="0.4" stroke={palette.ink} strokeWidth="3" fill="none"><path d="M785 373H823V411H784Z M768 458H814V492H768Z M766 396H752V474H768 M800 411V458"/><circle cx="848" cy="434" r="16"/><path d="M814 474H847V450"/></g>}
	<rect width="1080" height="1125" filter="url(#paper-grain)" fill="transparent" pointerEvents="none"/>
</g>;
