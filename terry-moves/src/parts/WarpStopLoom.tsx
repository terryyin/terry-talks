import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const PAPER = '#f2ebe0';
const INK = '#292720';
const VERMILION = '#b83c2b';
const DROPPER_OUTLINE = 'M -15 5 Q 0 -9 16 4 L 18 149 Q 1 160 -18 150 Z';
const PLATES = [
	{x: 480, y: 276},
	{x: 635, y: 304},
	{x: 790, y: 332},
	{x: 945, y: 360},
];
const BREAK = 3;
const FALL_START = 3.45;
const FALL_END = 4.15;
const CONTACT = 4.9;
const STOP = 5.5;

const between = (time: number, start: number, end: number) =>
	interpolate(time, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const sweepEnd = (time: number) => 845 + 45 * Math.sin(time * Math.PI * 2 / 1.2);

const Ink: React.FC<{d: string; width?: number; opacity?: number; color?: string}> =
	({d, width = 3, opacity = 0.85, color = INK}) => (
		<path d={d} fill="none" stroke={color} strokeWidth={width} opacity={opacity} strokeLinecap="round" strokeLinejoin="round" />
	);

const Dropper: React.FC<{x: number; y: number; accent: number}> = ({x, y, accent}) => (
	<g transform={`translate(${x} ${y})`}>
		<path d={DROPPER_OUTLINE} fill={INK} opacity="0.8" />
		<path d={DROPPER_OUTLINE} fill={VERMILION} opacity={accent} />
		<Ink d="M -9 38 Q -5 91 -10 139" color={PAPER} opacity={0.25} width={4} />
		<ellipse cx="0" cy="16" rx="8" ry="5" fill={PAPER} />
	</g>
);

/** A schematic teaching cutaway: linkage geometry is not a Type G reconstruction. */
export const WarpStopLoom: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const time = frame / fps;
	const broken = between(time, BREAK, BREAK + 0.35);
	const fall = Math.pow(between(time, FALL_START, FALL_END), 2) * 82;
	const accent = between(time, FALL_END, FALL_END + 0.25);
	// The bar continues its ordinary sweep throughout the break and fall.
	// Only its next approach is obstructed; its leading edge meets x = 927.
	const barEnd = time < FALL_END ? sweepEnd(time)
		: interpolate(between(time, FALL_END, CONTACT), [0, 1], [sweepEnd(FALL_END), 927]);
	const trip = between(time, CONTACT, STOP);
	// Integrate a linear slowdown during stop actuation, then hold every drive part.
	const driveTime = time < CONTACT ? time
		: CONTACT + (STOP - CONTACT) * (trip - trip * trip / 2);
	const driveAngle = driveTime * 200;
	const beat = Math.sin(driveTime * Math.PI * 2 / 0.9) * 14;
	const visibility = between(time, 0, 0.3) * (1 - between(time, 9.5, 10.1));
	const barLeft = barEnd - 650;
	const rodY = 676 + trip * 30;

	return (
		<AbsoluteFill style={{backgroundColor: PAPER}}>
			<svg width="100%" height="100%" viewBox="0 0 1600 900">
				<defs>
					<filter id="loom-paper" x="0" y="0" width="100%" height="100%">
						<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
						<feColorMatrix values="0 0 0 0 .5  0 0 0 0 .46  0 0 0 0 .37  0 0 0 .08 0" />
					</filter>
					<pattern id="woven-cloth" width="13" height="13" patternUnits="userSpaceOnUse">
						<path d="M 0 0 H 13 M 0 0 V 13" stroke={INK} strokeWidth="0.8" opacity="0.3" />
					</pattern>
				</defs>
				<rect width="1600" height="900" fill={PAPER} />
				<rect width="1600" height="900" filter="url(#loom-paper)" />
				<g opacity={visibility}>
					{/* Quiet timber and wash ground the enlarged mechanism in a loom. */}
					<path d="M 147 253 Q 135 455 151 755 L 190 760 Q 170 454 181 255 Z" fill={INK} opacity="0.36" />
					<path d="M 1377 229 Q 1389 477 1372 747 L 1423 752 Q 1429 459 1417 231 Z" fill={INK} opacity="0.4" />
					<Ink d="M 127 752 Q 779 774 1453 752" width={12} opacity={0.14} />
					<Ink d="M 160 229 Q 773 200 1408 221" width={13} opacity={0.16} />
					<path d="M 1132 290 L 1373 270 L 1375 475 L 1134 484 Z" fill="url(#woven-cloth)" opacity="0.55" />
					{/* Each lengthwise yarn passes through its own hanging plate eye. */}
					{PLATES.map(({x, y}, index) => {
						const actor = index === PLATES.length - 1;
						const yarnY = y + 16;
						const leftY = yarnY + (x - 168) * 0.038;
						const rightY = yarnY - (1250 - x) * 0.038;
						const looseLeftEnd = `${x - 66 - broken * 30} ${yarnY + broken * 47}`;
						const looseRightEnd = `${x - 51 + broken * 32} ${yarnY + broken * 29 + fall * 0.7}`;
						return (
							<g key={x}>
								<Dropper x={x} y={y + (actor ? fall : 0)} accent={actor ? accent : 0} />
								{actor && time >= BREAK ? (
									<g>
										<Ink d={`M 168 ${leftY} Q 632 ${yarnY + 25} ${looseLeftEnd}`} width={3.5} />
										<Ink d={`M ${looseRightEnd} Q 1050 ${yarnY + broken * 60} 1250 ${rightY}`} width={3.5} />
										<Ink d={`M ${looseLeftEnd} l -5 -6 m 5 6 l 5 -4`} width={1.7} />
										<Ink d={`M ${looseRightEnd} l 5 -7 m -5 7 l -4 -5`} width={1.7} />
									</g>
								) : <Ink d={`M 168 ${leftY} L 1250 ${rightY}`} width={actor ? 3.5 : 2.5} opacity={actor ? 0.95 : 0.65} />}
							</g>
						);
					})}
					{/* Oscillating feeler ends against the fallen plate, never through it. */}
					<path d={`M ${barLeft} 550 L ${barEnd} 550 L ${barEnd} 574 Q ${(barLeft + barEnd) / 2} 579 ${barLeft} 574 Z`} fill={INK} opacity="0.8" />
					<Ink d={`M ${barLeft + 15} 556 L ${barEnd - 7} 556`} color={PAPER} width={3} opacity={0.3} />
					<Ink d="M 220 592 L 898 592" width={3} opacity={0.17} />
					{/* Simple connected stop rod: obstruction trips the drive coupling. */}
					<Ink d={`M ${barLeft + 26} 574 L 246 ${rodY} L 1098 ${rodY} L ${1152 - trip * 50} ${638 + trip * 37}`} width={9} opacity={0.68} />
					{[[barLeft + 26, 574], [246, rodY], [1098, rodY]].map(([x, y], index) => (
						<circle key={index} cx={x} cy={y} r="7" fill={PAPER} stroke={INK} strokeWidth="4" />
					))}
					{/* A restrained drive wheel and beater make cessation of weaving visible. */}
					<circle cx="1230" cy="639" r="76" fill={PAPER} stroke={INK} strokeWidth="10" opacity="0.75" />
					<circle cx="1230" cy="639" r="63" fill="none" stroke={INK} strokeWidth="2" opacity="0.4" />
					<g transform={`rotate(${driveAngle} 1230 639)`}>
						<Ink d="M 1159 639 L 1301 639 M 1230 568 L 1230 710" width={7} opacity={0.6} />
						<circle cx="1230" cy="639" r="11" fill={INK} opacity="0.85" />
					</g>
					<Ink d={`M 1230 639 L ${1280 + beat} 496 L ${1280 + beat} 284`} width={7} opacity={0.45} />
					<g transform={`translate(${beat} 0)`}>
						<path d="M 1257 280 L 1285 278 L 1288 488 L 1257 491 Z" fill={INK} opacity="0.4" />
						{Array.from({length: 14}, (_, i) => <Ink key={i} d={`M 1260 ${291 + i * 14} L 1280 ${291 + i * 14}`} width={2} opacity={0.45} />)}
					</g>
					<Ink d={`M ${1135 - trip * 50} ${638 + trip * 37} L ${1171 - trip * 50} ${638 + trip * 37}`} width={14} />
				</g>
			</svg>
		</AbsoluteFill>
	);
};
