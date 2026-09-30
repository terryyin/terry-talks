import React from 'react';
import { palette, seeded } from '../storyImpact/scene';
import { OUTLINE, Point, roundedPath, scaleAround, SHADOW, smoothBlob } from '../storyImpact/layout';
import { mixHex } from './pose';
import type { Finish, PatchPose } from './pose';

// Splashes on the product, each carrying its team's finish. Team 1's is
// tidy with a grid of test ticks, team 2's scrappy with scribbles; the shared
// finish is the tidy one, agreed by everybody. Where two splashes overlap the
// paint clashes. Pure function of the patch poses.

const CLASH = '#7A4B9E';

export const FinishDefs: React.FC = () => (
	<defs>
		<pattern id="ft-ticks" width={44} height={44} patternUnits="userSpaceOnUse">
			<path d="M9,24 l7,8 l14,-16" fill="none" stroke={palette.white} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
		</pattern>
		<pattern id="ft-scrawl" width={58} height={40} patternUnits="userSpaceOnUse">
			<path d="M4,30 L14,8 L22,32 L32,6 L40,30 L52,10" fill="none" stroke={palette.ink} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
			<circle cx={46} cy={34} r={3} fill={palette.ink} opacity={0.4} />
		</pattern>
		<pattern id="ft-clash" width={22} height={22} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
			<path d="M0,0 V22" stroke={palette.ink} strokeWidth={6} opacity={0.5} />
		</pattern>
	</defs>
);

const points = (p: PatchPose, finish: Finish): Point[] => {
	const lobes = finish === 'scrappy' ? 30 : 20;
	return Array.from({ length: lobes }, (_, i) => {
		const angle = (i / lobes) * Math.PI * 2;
		const bump = finish === 'scrappy' ? (i % 2 === 0 ? 0.13 * seeded(p.seed + i) : -0.08 * seeded(p.seed + i + 40)) : i % 2 === 0 ? 0.07 * seeded(p.seed + i) : 0;
		const d = p.r * (1 + bump);
		return { x: p.cx + Math.cos(angle) * d, y: p.cy + Math.sin(angle) * d };
	});
};

export const patchPath = (p: PatchPose, finish: Finish = p.finish): string =>
	finish === 'scrappy' ? roundedPath(points(p, finish), 3) : smoothBlob(points(p, finish));

const drops = (p: PatchPose) =>
	Array.from({ length: 7 }, (_, i) => {
		const angle = -0.5 + i * 0.95 + seeded(p.seed + 60 + i) * 0.5;
		const d = p.r * (1.2 + 0.18 * seeded(p.seed + 70 + i));
		return { x: p.cx + Math.cos(angle) * d, y: p.cy + Math.sin(angle) * d, r: p.r * (0.04 + 0.03 * seeded(p.seed + 80 + i)) };
	});

const Look: React.FC<{ p: PatchPose; finish: Finish; color: string; ink: number; shown: number }> = ({ p, finish, color, ink, shown }) => {
	const d = patchPath(p, finish);
	return (
		<g>
			<path d={d} fill={color} stroke={palette.ink} strokeWidth={OUTLINE - 1} strokeOpacity={ink} strokeLinejoin="round" strokeDasharray={finish === 'scrappy' ? '14 8' : undefined} />
			<path d={d} fill={finish === 'scrappy' ? 'url(#ft-scrawl)' : 'url(#ft-ticks)'} opacity={shown} />
		</g>
	);
};

const Patch: React.FC<{ p: PatchPose; coherent: number }> = ({ p, coherent }) => {
	const ink = 1 - coherent * 0.7;
	const color = mixHex(p.color, '#FFE3A3', coherent * 0.3);
	const scrappy = p.finish === 'scrappy';
	// Curling up: the patch peels, tilts and shrinks.
	const curl = p.curl > 0 ? `rotate(${p.curl * (p.seed % 2 ? 13 : -13)} ${p.cx} ${p.cy}) translate(0 ${p.curl * -10})` : '';
	const spread = p.repaint * p.r * 1.25;
	const clip = `ft-repaint-${p.id}`;
	return (
		<g data-testid="patch" data-team={p.team} data-id={p.id} transform={`${scaleAround({ x: p.cx, y: p.cy }, p.grow, p.grow)} ${curl}`} opacity={1 - p.curl * 0.4}>
			<path d={patchPath(p)} transform={`translate(${SHADOW.x} ${SHADOW.y})`} fill={palette.paperShadow} opacity={0.8} />
			{scrappy && p.repaint > 0 ? (
				<>
					<clipPath id={clip}>
						<circle cx={p.cx} cy={p.cy} r={spread} />
					</clipPath>
					{p.repaint < 1 ? <Look p={p} finish="scrappy" color={color} ink={ink} shown={p.finishShown} /> : null}
					<g clipPath={`url(#${clip})`}>
						<Look p={p} finish="shared" color={color} ink={ink} shown={1} />
					</g>
				</>
			) : (
				<Look p={p} finish={p.finish} color={color} ink={ink} shown={p.finishShown} />
			)}
			<ellipse cx={p.cx - p.r * 0.4} cy={p.cy - p.r * 0.45} rx={p.r * 0.14} ry={p.r * 0.08} transform={`rotate(-35 ${p.cx - p.r * 0.4} ${p.cy - p.r * 0.45})`} fill={palette.white} opacity={0.7} />
			{drops(p).map((drop, i) => (
				<circle key={i} cx={drop.x} cy={drop.y} r={drop.r} fill={color} stroke={palette.ink} strokeWidth={3} strokeOpacity={ink} />
			))}
		</g>
	);
};

// The paint where two splashes overlap: it clashes until the practices agree.
const Clash: React.FC<{ a: PatchPose; b: PatchPose }> = ({ a, b }) => {
	const grown = Math.min(a.grow, b.grow);
	if (grown <= 0) return null;
	const agreed = b.repaint;
	return (
		<g data-testid="clash" transform={scaleAround({ x: (a.cx + b.cx) / 2, y: (a.cy + b.cy) / 2 }, grown, grown)}>
			<clipPath id="ft-overlap">
				<path d={patchPath(a)} />
			</clipPath>
			<g clipPath="url(#ft-overlap)">
				<path d={patchPath(b, agreed >= 1 ? 'shared' : b.finish)} fill={CLASH} opacity={0.88 - agreed * 0.45} />
				<path d={patchPath(b, agreed >= 1 ? 'shared' : b.finish)} fill="url(#ft-clash)" opacity={1 - agreed} />
			</g>
		</g>
	);
};

export const Patches: React.FC<{ patches: PatchPose[]; coherent: number }> = ({ patches, coherent }) => {
	const one = patches.find((p) => p.team === 1);
	const two = patches.find((p) => p.team === 2);
	return (
		<g data-testid="patches">
			<FinishDefs />
			{patches.map((p) => (
				<Patch key={p.id} p={p} coherent={coherent} />
			))}
			{one && two ? <Clash a={one} b={two} /> : null}
		</g>
	);
};
