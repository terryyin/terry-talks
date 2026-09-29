import React from 'react';
import { CustomerPose, palette } from './scene';
import { Face } from './face';
import { BULB, CUSTOMER, customerHead, OUTLINE, scaleAround } from './layout';

// A flat cartoon customer in front of the product: round head, tidy hair, a
// coral shirt. They look up at the product, nod, and get an idea (a light
// bulb). Pure function of the pose.

const SKIN = '#FFD7B5';
const HAIR = '#5A3E36';
const SHIRT = '#F97360';
const BULB_GLASS = '#FFE066';
const BULB_BASE = '#B8B8C8';

const Bulb: React.FC<{ scale: number }> = ({ scale }) => {
	const { at, r } = BULB;
	const rays = Array.from({ length: 7 }, (_, i) => (-160 + i * (140 / 6)) * (Math.PI / 180));
	return (
		<g data-testid="light-bulb" transform={scaleAround({ x: at.x, y: at.y + r }, scale, scale)}>
			<g stroke={palette.ink} strokeWidth={5} strokeLinecap="round">
				{rays.map((a, i) => (
					<line key={i} x1={at.x + Math.cos(a) * (r + 10)} y1={at.y + Math.sin(a) * (r + 10)} x2={at.x + Math.cos(a) * (r + 22)} y2={at.y + Math.sin(a) * (r + 22)} />
				))}
			</g>
			<rect x={at.x - 10} y={at.y + r - 6} width={20} height={16} rx={4} fill={BULB_BASE} stroke={palette.ink} strokeWidth={4} />
			<circle cx={at.x} cy={at.y} r={r} fill={BULB_GLASS} stroke={palette.ink} strokeWidth={5} />
			<path d={`M${at.x - 6},${at.y + 8} q6,-14 12,0`} fill="none" stroke={palette.ink} strokeWidth={3} strokeLinecap="round" />
			<ellipse cx={at.x - 7} cy={at.y - 8} rx={5} ry={3} transform={`rotate(-35 ${at.x - 7} ${at.y - 8})`} fill={palette.white} />
		</g>
	);
};

export const Customer: React.FC<{ customer: CustomerPose }> = ({ customer }) => {
	const { show = 1, nod = 0, bulb } = customer;
	if (show <= 0) return null;
	const { x, feet, headR: r } = CUSTOMER;
	const head = customerHead();
	const neck = { x, y: feet - 98 };
	// Facing the product (to the left), the head dips forward and down.
	const tilt = `rotate(${-16 * nod} ${neck.x} ${neck.y}) translate(0 ${4 * nod})`;
	const shoulders = feet - 100;
	const hem = feet - 30;
	const body = `M${x - 32},${shoulders + 8} Q${x - 32},${shoulders} ${x - 22},${shoulders} L${x + 22},${shoulders} Q${x + 32},${shoulders} ${x + 32},${shoulders + 8} L${x + 40},${hem - 6} Q${x + 40},${hem} ${x + 32},${hem} L${x - 32},${hem} Q${x - 40},${hem} ${x - 40},${hem - 6} Z`;
	return (
		<g data-testid="customer" transform={show === 1 ? undefined : scaleAround({ x, y: feet }, show, show)}>
			<ellipse cx={x + 4} cy={feet} rx={50} ry={9} fill={palette.ink} opacity={0.15} />
			<rect x={x - 22} y={feet - 36} width={16} height={36} rx={7} fill={palette.ink} />
			<rect x={x + 6} y={feet - 36} width={16} height={36} rx={7} fill={palette.ink} />
			{[-1, 1].map((side) => (
				<g key={side}>
					<path d={`M${x + side * 30},${shoulders + 14} L${x + side * 44},${hem - 12}`} stroke={palette.ink} strokeWidth={17} strokeLinecap="round" />
					<path d={`M${x + side * 30},${shoulders + 14} L${x + side * 44},${hem - 12}`} stroke={SHIRT} strokeWidth={7} strokeLinecap="round" />
					<circle cx={x + side * 45} cy={hem - 8} r={8} fill={SKIN} stroke={palette.ink} strokeWidth={4} />
				</g>
			))}
			<path d={body} fill={SHIRT} stroke={palette.ink} strokeWidth={6} strokeLinejoin="round" />
			<g data-testid="customer-head" data-nod={nod} transform={nod === 0 ? undefined : tilt}>
				<circle cx={head.x} cy={head.y} r={r} fill={SKIN} stroke={palette.ink} strokeWidth={OUTLINE - 1} />
				<path
					d={`M${head.x - r + 2},${head.y - 4} Q${head.x - r + 4},${head.y - r - 8} ${head.x + 4},${head.y - r - 2} Q${head.x + r + 6},${head.y - r + 4} ${head.x + r - 2},${head.y - 2} Q${head.x + 10},${head.y - r + 10} ${head.x - 14},${head.y - r + 16} Q${head.x - r + 10},${head.y - 20} ${head.x - r + 2},${head.y - 4} Z`}
					fill={HAIR}
					stroke={palette.ink}
					strokeWidth={4}
					strokeLinejoin="round"
				/>
				<Face x={head.x - 7} y={head.y + 4} r={r * 0.9} mood={bulb > 0 ? 'gleeful' : 'smile'} />
			</g>
			{bulb > 0 ? <Bulb scale={bulb} /> : null}
		</g>
	);
};
