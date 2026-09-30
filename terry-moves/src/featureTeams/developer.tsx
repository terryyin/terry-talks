import React from 'react';
import { palette } from '../storyImpact/scene';
import { Face } from '../storyImpact/face';
import { captionLines } from '../storyImpact/caption';
import { FONT_FAMILY, OUTLINE, SHADOW, scaleAround } from '../storyImpact/layout';
import { FLOOR, PEOPLE_SCALE } from './layout';
import type { BubblePose, DevPose } from './pose';

// A flat cartoon developer standing on the floor, in the customer's style:
// round head, tidy hair, a shirt in their team's colour. Pure function of
// the pose. The speech bubble rides above the head.

const SKIN = '#FFD7B5';
const HAIR = ['#5A3E36', '#2B2D42', '#8A5A2B'];

const HEAD_Y = -128;
const HEAD_R = 36;

const Clipboard: React.FC = () => (
	<g transform="translate(-58 -78) rotate(-8)">
		<rect x={-4} y={-4} width={38} height={50} rx={6} fill={palette.white} stroke={palette.ink} strokeWidth={5} />
		<rect x={6} y={-10} width={18} height={10} rx={4} fill={palette.tray} stroke={palette.ink} strokeWidth={4} />
		<path d="M6,14 h18 M6,26 h18 M6,38 h12" stroke={palette.structure} strokeWidth={4} strokeLinecap="round" />
	</g>
);

const Person: React.FC<{ dev: DevPose; hair: string }> = ({ dev, hair }) => {
	const { mood, shirt, hand, clipboard } = dev;
	const shoulders = -100;
	const hem = -30;
	const body = `M-32,${shoulders + 8} Q-32,${shoulders} -22,${shoulders} L22,${shoulders} Q32,${shoulders} 32,${shoulders + 8} L40,${hem - 6} Q40,${hem} 32,${hem} L-32,${hem} Q-40,${hem} -40,${hem - 6} Z`;
	// The front arm (toward the listener) swings up when they call out.
	const arm = (side: -1 | 1) => {
		const raised = side === 1 ? hand : 0;
		const end = { x: side * (44 + 30 * raised), y: hem - 12 - 78 * raised };
		return (
			<g key={side}>
				<path d={`M${side * 30},${shoulders + 14} L${end.x},${end.y}`} stroke={palette.ink} strokeWidth={17} strokeLinecap="round" />
				<path d={`M${side * 30},${shoulders + 14} L${end.x},${end.y}`} stroke={shirt} strokeWidth={7} strokeLinecap="round" />
				<circle cx={end.x} cy={end.y + 4} r={8} fill={SKIN} stroke={palette.ink} strokeWidth={4} />
			</g>
		);
	};
	return (
		<g>
			<ellipse cx={4} cy={0} rx={50} ry={9} fill={palette.ink} opacity={0.15} />
			<rect x={-22} y={-36} width={16} height={36} rx={7} fill={palette.ink} />
			<rect x={6} y={-36} width={16} height={36} rx={7} fill={palette.ink} />
			{arm(-1)}
			<path d={body} fill={shirt} stroke={palette.ink} strokeWidth={6} strokeLinejoin="round" />
			{arm(1)}
			{clipboard ? <Clipboard /> : null}
			<circle cx={0} cy={HEAD_Y} r={HEAD_R} fill={SKIN} stroke={palette.ink} strokeWidth={OUTLINE - 1} />
			<path
				d={`M${-HEAD_R + 2},${HEAD_Y - 4} Q${-HEAD_R + 4},${HEAD_Y - HEAD_R - 8} 4,${HEAD_Y - HEAD_R - 2} Q${HEAD_R + 6},${HEAD_Y - HEAD_R + 4} ${HEAD_R - 2},${HEAD_Y - 2} Q10,${HEAD_Y - HEAD_R + 10} -14,${HEAD_Y - HEAD_R + 16} Q${-HEAD_R + 10},${HEAD_Y - 20} ${-HEAD_R + 2},${HEAD_Y - 4} Z`}
				fill={hair}
				stroke={palette.ink}
				strokeWidth={4}
				strokeLinejoin="round"
			/>
			<Face x={-7} y={HEAD_Y + 4} r={HEAD_R * 0.9} mood={mood} />
		</g>
	);
};

const BUBBLE_LINE = 24;

export const Bubble: React.FC<{ bubble: BubblePose; x: number; y: number }> = ({ bubble, x, y }) => {
	const size = bubble.tone === 'shout' ? 34 : 30;
	const lines = captionLines(bubble.text, 22);
	const width = Math.min(560, Math.max(...lines.map((l) => l.length)) * size * 0.52 + 44);
	const height = lines.length * size * 1.2 + 26;
	const left = Math.max(30, Math.min(690 - width, x - width / 2));
	const top = y - 22 - height;
	return (
		<g data-testid="speech" transform={scaleAround({ x, y }, bubble.pop, bubble.pop)} opacity={Math.min(1, bubble.pop * 1.5)}>
			<rect x={left + SHADOW.x} y={top + SHADOW.y} width={width} height={height} rx={BUBBLE_LINE} fill={palette.paperShadow} />
			<path d={`M${x - 14},${top + height - 2} L${x},${y - 4} L${x + 16},${top + height - 2} Z`} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE - 2} strokeLinejoin="round" />
			<rect x={left} y={top} width={width} height={height} rx={BUBBLE_LINE} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE - 2} />
			<path d={`M${x - 10},${top + height - 3} L${x + 12},${top + height - 3}`} stroke={palette.white} strokeWidth={OUTLINE} />
			<text textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={bubble.tone === 'weary' ? 600 : 700} fontSize={size} fill={bubble.tone === 'weary' ? '#6B6D80' : palette.ink}>
				{lines.map((line, i) => (
					<tspan key={i} x={left + width / 2} y={top + 13 + size * 0.95 + i * size * 1.2}>
						{line}
					</tspan>
				))}
			</text>
		</g>
	);
};

export const Developer: React.FC<{ dev: DevPose; index: number }> = ({ dev, index }) => {
	if (dev.show <= 0) return null;
	const hop = dev.bob > 0 ? -Math.abs(Math.sin(dev.bob * 9)) * 9 : 0;
	const s = PEOPLE_SCALE;
	const headTop = FLOOR - (-HEAD_Y + HEAD_R + 6) * s;
	return (
		<g data-testid="developer" data-id={dev.id}>
			<g transform={`translate(${dev.x} ${FLOOR + hop}) ${scaleAround({ x: 0, y: 0 }, dev.show * s * dev.face, dev.show * s)}`}>
				<Person dev={dev} hair={HAIR[index % HAIR.length]} />
			</g>
			{dev.label ? (
				<text x={dev.x} y={FLOOR + 40} textAnchor="middle" fontFamily={FONT_FAMILY} fontWeight={700} fontSize={26} fill={palette.ink} opacity={dev.show}>
					{dev.label}
				</text>
			) : null}
			{dev.bubble ? <Bubble bubble={dev.bubble} x={dev.x} y={headTop - 4} /> : null}
		</g>
	);
};
