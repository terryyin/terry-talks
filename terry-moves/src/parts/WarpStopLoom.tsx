import React from 'react';
import {AbsoluteFill} from 'remotion';
import AnimationEffect from '../video_components/AnimationEffect';

const PAPER = '#f2ebe0';
const INK = '#1c1b18';
const VIEW = '0 0 1600 900';
const PLATE_TOP = 232;
const PLATE_H = 96;
const FABRIC = 'M 170 658 Q 800 638 1430 660 L 1550 892 L 52 892 Z';

const actorWarp = {x: 820, bulge: -2.2};
const WARPS: {x: number; bulge: number}[] = [
	{x: 270, bulge: 2.4},
	{x: 460, bulge: -1.8},
	{x: 640, bulge: 2.7},
	actorWarp,
	{x: 1010, bulge: 1.6},
	{x: 1200, bulge: -2.5},
];
const stillWarps = WARPS.filter((w) => w !== actorWarp);

const BAR_SWEEPS: {d: string; strokeWidth: number; opacity: number}[] = [
	{d: 'M 118 404 Q 168 418 208 416', strokeWidth: 1.7, opacity: 0.28},
	{d: 'M 128 438 Q 176 428 214 434', strokeWidth: 1.15, opacity: 0.2},
	{d: 'M 1398 406 Q 1458 418 1504 408', strokeWidth: 1.8, opacity: 0.26},
	{d: 'M 1392 440 Q 1466 430 1512 436', strokeWidth: 1.2, opacity: 0.18},
	{d: 'M 240 398 Q 800 386 1360 400', strokeWidth: 0.9, opacity: 0.14},
];

function vStroke(x: number, y1: number, y2: number, bulge: number): string {
	return `M ${x} ${y1} Q ${x + bulge} ${(y1 + y2) / 2} ${x} ${y2}`;
}

const InkStroke: React.FC<{
	d: string;
	strokeWidth: number;
	opacity: number;
	stroke?: string;
}> = ({d, strokeWidth, opacity, stroke = INK}) => (
	<path d={d} stroke={stroke} strokeWidth={strokeWidth} fill="none" opacity={opacity} strokeLinecap="round" />
);

const LoomSvg: React.FC<{children: React.ReactNode}> = ({children}) => (
	<svg width="100%" height="100%" viewBox={VIEW} preserveAspectRatio="xMidYMid slice">
		{children}
	</svg>
);

const Dropper: React.FC<{cx: number}> = ({cx}) => {
	const k = ((cx * 13) % 11) - 5;
	const l = cx - 20 + k * 0.15;
	const r = cx + 20 + k * 0.1;
	const b = PLATE_TOP + PLATE_H;
	const body = `M ${l + 2} ${PLATE_TOP + 7}
		C ${l - 4} ${PLATE_TOP - 2}, ${r + 2} ${PLATE_TOP - 3}, ${r - 1} ${PLATE_TOP + 6}
		C ${r + 5} ${PLATE_TOP + 42}, ${r + 4} ${PLATE_TOP + 72}, ${r - 2} ${b - 4}
		C ${cx + k * 0.2} ${b + 6}, ${l - 2} ${b + 3}, ${l + 3} ${b - 5}
		C ${l - 5} ${PLATE_TOP + 70}, ${l - 4} ${PLATE_TOP + 40}, ${l + 2} ${PLATE_TOP + 7} Z`;
	return (
		<g>
			<path d={body} fill={INK} opacity={0.78} />
			<InkStroke
				d={`M ${cx - 6} ${PLATE_TOP + 18} Q ${cx + 4} ${PLATE_TOP + 50} ${cx - 3} ${b - 16}`}
				stroke="#efe8dc"
				strokeWidth={5}
				opacity={0.18}
			/>
			<ellipse
				cx={cx}
				cy={PLATE_TOP + 11}
				rx={7}
				ry={5.2}
				fill={PAPER}
				stroke={INK}
				strokeWidth={1.7}
			/>
		</g>
	);
};

const WarpYarn: React.FC<{x: number; bulge: number}> = ({x, bulge}) => (
	<g>
		<InkStroke d={vStroke(x, 48, 662, bulge)} strokeWidth={1.7} opacity={0.88} />
		<InkStroke d={vStroke(x + 1.2, 52, 658, bulge * 0.4)} strokeWidth={0.6} opacity={0.28} />
	</g>
);

export const WarpStopLoom: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: PAPER}}>
			<LoomSvg>
				<defs>
					<filter id="warpStopPaper" x="0" y="0" width="100%" height="100%">
						<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="n" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.93  0 0 0 0 0.90  0 0 0 0 0.84  0 0 0 0.14 0"
						/>
					</filter>
					<pattern id="warpStopHatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(26)">
						<path d="M 0 0 L 0 16" stroke={INK} strokeWidth={0.65} opacity={0.16} />
					</pattern>
				</defs>
				<rect width="1600" height="900" fill={PAPER} />
				<rect width="1600" height="900" filter="url(#warpStopPaper)" />
				<path d="M 70 40 Q 120 430 90 880 L 148 882 Q 168 430 132 42 Z" fill={INK} opacity={0.52} />
				<path d="M 1470 38 Q 1495 420 1462 878 L 1528 880 Q 1555 430 1524 40 Z" fill={INK} opacity={0.5} />
				<InkStroke d="M 88 68 Q 800 50 1512 72" strokeWidth={7} opacity={0.4} />
				<InkStroke d="M 108 78 Q 800 62 1494 80" strokeWidth={2.4} opacity={0.18} />
				{WARPS.map((w) => (
					<InkStroke
						key={`guide-${w.x}`}
						d={vStroke(w.x + 20, 168, 520, w.bulge * 0.3)}
						strokeWidth={1.05}
						opacity={0.2}
					/>
				))}
				{stillWarps.map((w) => (
					<Dropper key={`plate-${w.x}`} cx={w.x} />
				))}
				{stillWarps.map((w) => (
					<WarpYarn key={`yarn-${w.x}`} x={w.x} bulge={w.bulge} />
				))}
				<path d={FABRIC} fill={PAPER} stroke="none" />
				<path d={FABRIC} fill="url(#warpStopHatch)" opacity={0.85} />
				<InkStroke d="M 170 658 Q 800 638 1430 660" strokeWidth={1.8} opacity={0.35} />
				<InkStroke d="M 80 888 Q 800 872 1520 886" strokeWidth={2.2} opacity={0.22} />
			</LoomSvg>
			<AnimationEffect actor="stop-bar">
				<LoomSvg>
					{BAR_SWEEPS.map((s) => (
						<InkStroke key={s.d} d={s.d} strokeWidth={s.strokeWidth} opacity={s.opacity} />
					))}
					<path
						d="M 188 412 Q 800 396 1416 410 Q 1442 428 1414 448 Q 800 464 186 446 Q 162 428 188 412 Z"
						fill={INK}
						opacity={0.72}
					/>
					<InkStroke d="M 220 418 Q 800 406 1384 416" stroke="#efe8dc" strokeWidth={7} opacity={0.22} />
					<InkStroke d="M 210 414 Q 800 400 1398 412" strokeWidth={2.1} opacity={0.55} />
				</LoomSvg>
			</AnimationEffect>
			<AnimationEffect actor="dropper">
				<LoomSvg>
					<Dropper cx={actorWarp.x} />
				</LoomSvg>
			</AnimationEffect>
			<AnimationEffect actor="warp">
				<LoomSvg>
					<WarpYarn x={actorWarp.x} bulge={actorWarp.bulge} />
				</LoomSvg>
			</AnimationEffect>
		</AbsoluteFill>
	);
};
