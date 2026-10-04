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
	<ellipse cx="550" cy="810" rx="460" ry="380" fill={palette.cream} opacity="0.35"/>
	<path d="M0 990H1080V1125H0Z" fill="#EBD6BE"/>
	<path d="M0 990H1080M120 1125L290 990M860 1125L790 990" stroke="#C5A586" strokeWidth="3" opacity="0.28"/>
	<path d="M90 920H990L1020 946H65Z" fill={quiet ? '#E1BC91' : palette.wood} stroke={palette.ink} strokeWidth="5"/>
	<path d="M95 946V1085M985 946V1085" stroke={palette.ink} strokeWidth="12"/>
	<rect width="1080" height="1125" filter="url(#paper-grain)" fill="transparent" pointerEvents="none"/>
</g>;
