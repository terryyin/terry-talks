import { render } from '@testing-library/react';
import { fullFilm } from '@/storyImpact/fullFilm';
import { FPS } from '@/storyImpact/film';
import { Pose, SPACE, StoryPose, SplatPose, wallExtentOf } from '@/storyImpact/scene';
import {
	BACKLOG_LABEL,
	BEHAVIOR_LABEL_ANGLE,
	HISTORY_LABEL,
	historyLabelAt,
	historySpot,
	Point,
	PRODUCT_LABEL,
	productLabelAt,
	spentShape,
	trayBallCenter,
	traySpot,
	wallOutline,
} from '@/storyImpact/layout';
import { BacklogTray } from '@/storyImpact/pieces';
import { splatDrops } from '@/storyImpact/splat';
import { storyCenter } from '@/storyImpact/storyBall';
import { tagShown } from '@/storyImpact/outline';
import { IMPACT_BURST, pillWidth, VALUE_PILLS } from '@/storyImpact/values';
import { CAPTION_BOX } from '@/storyImpact/layout';

const { beatRange, durationInFrames, poseAt } = fullFilm;
const frames = Array.from({ length: durationInFrames }, (_, f) => f);
const poses = frames.map((f) => poseAt(f));

type Circle = { at: Point; r: number };
type Box = { left: number; right: number; top: number; bottom: number };
// A bold, centered label's box, estimated from its size and length, around
// its baseline point.
const labelBox = (at: Point, text: string, size: number): Box => {
	const width = text.length * size * 0.55;
	return { left: at.x - width / 2, right: at.x + width / 2, top: at.y - size * 0.8, bottom: at.y + size * 0.3 };
};
const covers = ({ at, r }: Circle, box: Box) => {
	const dx = Math.max(box.left - at.x, 0, at.x - box.right);
	const dy = Math.max(box.top - at.y, 0, at.y - box.bottom);
	return Math.hypot(dx, dy) < r;
};

// Balls on stage, each as a circle generous enough to hold its squash,
// stretch and ink outline.
const trayBalls = (pose: Pose): Circle[] =>
	pose.backlog.map((ball, i) => ({ at: trayBallCenter(ball, traySpot(pose.backlog.length, i, ball.size)), r: ball.size * (ball.scale ?? 1) * 1.3 + 3 }));
const storyBall = (story: StoryPose): Circle => ({ at: storyCenter(story), r: story.ball.size * 1.5 + 3 });
const spentBalls = (pose: Pose): Circle[] => {
	const history = pose.history ?? [];
	const room = pose.historyRoom ?? history.length;
	const reach = (size: number) => spentShape(size).rx * 1.15 + 3;
	const resting = history.map((ball, i) => {
		const spot = historySpot(room, i, ball.size);
		return { at: { x: spot.x, y: spot.y - (ball.hop ?? 0) }, r: reach(ball.size) };
	});
	return pose.spent ? [...resting, { at: pose.spent.at, r: reach(pose.spent.ball.size) }] : resting;
};
// A spent ball is wider than tall: its box, generous enough for its squash.
const spentBoxes = (pose: Pose): Box[] =>
	spentBalls(pose).map(({ at, r }) => {
		const ry = (r - 3) * (0.84 / 1.14) + 3;
		return { left: at.x - r, right: at.x + r, top: at.y - ry, bottom: at.y + ry };
	});
const overlaps = (a: Box, b: Box) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
const ballsOf = (pose: Pose): Circle[] => [...trayBalls(pose), ...(pose.story ? [storyBall(pose.story)] : []), ...spentBalls(pose)];

const insidePolygon = (p: Point, polygon: Point[]) =>
	polygon.reduce((inside, a, i) => {
		const b = polygon[(i + 1) % polygon.length];
		const crosses = a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x;
		return crosses ? !inside : inside;
	}, false);
const distanceToSegment = (p: Point, a: Point, b: Point) => {
	const t = Math.max(0, Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / ((b.x - a.x) ** 2 + (b.y - a.y) ** 2)));
	return Math.hypot(p.x - (a.x + t * (b.x - a.x)), p.y - (a.y + t * (b.y - a.y)));
};
const whollyInside = ({ at, r }: Circle, polygon: Point[]) =>
	insidePolygon(at, polygon) && polygon.every((a, i) => distanceToSegment(at, a, polygon[(i + 1) % polygon.length]) >= r);

const backlogLabelY = (pose: Pose): number | undefined => {
	if (!pose.showTime || pose.backlog.length === 0) return undefined;
	const { getByText, unmount } = render(
		<svg>
			<BacklogTray balls={pose.backlog} />
		</svg>,
	);
	const y = Number(getByText('Product Backlog').getAttribute('y'));
	unmount();
	return y;
};

// How fuzzy the story ball looks, and how much its ignored grid lines show.
const fuzziness = (story?: StoryPose) =>
	!story ? undefined : story.state === 'wishing' ? (story.fuzz ?? 0) : (story.fuzz ?? 1);
const marksShown = (story?: StoryPose) =>
	!story ? undefined : story.state === 'fuzzy' ? (story.marks ?? story.fuzz ?? 1) : 0;
const maxStep = (values: (number | undefined)[]) =>
	values.reduce<number>((m, v, i) => (i > 0 && v !== undefined && values[i - 1] !== undefined ? Math.max(m, Math.abs(v - values[i - 1]!)) : m), 0);

describe('StoryImpactFilm plays smoothly and reads at phone size', () => {
	test('example 2: the "Product Backlog" label moves by at most 2 px a frame', () => {
		const ys = poses.map(backlogLabelY);
		expect(ys.filter((y) => y !== undefined).length).toBeGreaterThan(durationInFrames / 2);
		expect(maxStep(ys)).toBeLessThanOrEqual(2);
	});

	test('no ball ever covers the "Product Backlog" label', () => {
		const label = labelBox(BACKLOG_LABEL.at, BACKLOG_LABEL.text, BACKLOG_LABEL.size);
		frames.forEach((f) => {
			const covering = ballsOf(poses[f]).filter((ball) => covers(ball, label));
			expect({ f, covering }).toEqual({ f, covering: [] });
		});
	});

	test('the spent ball drifts past the "Product" label on the wall without covering it', () => {
		// In the label's own (unrotated) frame, the spent ball as a circle as wide as it is.
		const a = (-BEHAVIOR_LABEL_ANGLE * Math.PI) / 180;
		frames
			.filter((f) => poses[f].spent)
			.forEach((f) => {
				const labelAt = productLabelAt(wallExtentOf(poses[f]));
				const label = labelBox(labelAt, PRODUCT_LABEL.text, PRODUCT_LABEL.size);
				const unrotated = ({ x, y }: Point): Point => {
					const [dx, dy] = [x - labelAt.x, y - labelAt.y];
					return { x: labelAt.x + dx * Math.cos(a) - dy * Math.sin(a), y: labelAt.y + dx * Math.sin(a) + dy * Math.cos(a) };
				};
				const { ball, at } = poses[f].spent!;
				const shape = spentShape(ball.size);
				const skin = { at: unrotated(at), r: (shape.rx + shape.ry) / 2 + 3 };
				expect({ f, covers: covers(skin, label) }).toEqual({ f, covers: false });
			});
	});

	test('no spent ball covers the "History" label on its way to History', () => {
		frames
			.filter((f) => poses[f].history || poses[f].spent)
			.forEach((f) => {
				const pose = poses[f];
				const room = pose.historyRoom ?? (pose.history ?? []).length;
				const label = labelBox(historyLabelAt(room), HISTORY_LABEL.text, HISTORY_LABEL.size);
				const covering = spentBoxes(pose).filter((ball) => overlaps(ball, label));
				expect({ f, covering }).toEqual({ f, covering: [] });
			});
	});

	test('the flying ball passes under the "Structure / how it\'s built" label', () => {
		// The labels' boxes (start-anchored), and the ball as a circle generous
		// enough for its fuzz and its stretch across its heading.
		const structure = { left: 510, right: 510 + 9 * 46 * 0.55, top: 134 - 46 * 0.8, bottom: 134 + 46 * 0.3 };
		const howBuilt = { left: 512, right: 512 + 14 * 34 * 0.55, top: 174 - 34 * 0.8, bottom: 174 + 34 * 0.3 };
		const flying = frames.filter((f) => poses[f].story?.state === 'flying');
		expect(flying.length).toBeGreaterThan(0);
		flying.forEach((f) => {
			const story = poses[f].story!;
			const ball = { at: storyCenter(story), r: story.ball.size * 1.2 + 3 };
			expect({ f, covers: covers(ball, structure) || covers(ball, howBuilt) }).toEqual({ f, covers: false });
		});
	});

	test('example 3: every splat droplet lies inside the product wall', () => {
		// Each splat in the film, on the wall as it is then.
		const splats = poses.flatMap((p) => (p.splat ? [{ splat: p.splat, wall: wallExtentOf(p) }] : []));
		expect(splats.length).toBeGreaterThan(0);
		// Any story's splat, wherever it hits the largest wall.
		for (let col = 0; col <= SPACE.columns; col += 0.5) {
			for (let row = 0; row <= SPACE.rows; row += 0.5) {
				for (let seed = 1; seed <= 30; seed += 1) {
					const splat: SplatPose = { center: { col, row }, radius: 1, color: '', seed, drip: 1, seeped: false };
					splats.push({ splat, wall: SPACE });
				}
			}
		}
		splats.forEach(({ splat, wall }) =>
			splatDrops(splat, wall).forEach((drop) =>
				expect({ splat, drop, inside: whollyInside(drop, wallOutline(wall)) }).toEqual({ splat, drop, inside: true }),
			),
		);
	});

	test('the flying ball turns fuzzy, and its ignored grid lines fade, smoothly', () => {
		expect(maxStep(poses.map((p) => fuzziness(p.story)))).toBeLessThanOrEqual(0.4);
		expect(maxStep(poses.map((p) => marksShown(p.story)))).toBeLessThanOrEqual(0.4);
	});

	test('the value pills and the impact burst cover no label, no tray ball, and not the caption', () => {
		const pill = (kind: 'customer' | 'option'): Box => {
			const { at, text } = VALUE_PILLS[kind];
			const w = pillWidth(text);
			return { left: at.x - w / 2, right: at.x + w / 2, top: at.y - VALUE_PILLS.height / 2, bottom: at.y + VALUE_PILLS.height / 2 };
		};
		const burst: Box = {
			left: IMPACT_BURST.at.x - IMPACT_BURST.rx,
			right: IMPACT_BURST.at.x + IMPACT_BURST.rx,
			top: IMPACT_BURST.at.y - IMPACT_BURST.ry,
			bottom: IMPACT_BURST.at.y + IMPACT_BURST.ry,
		};
		const structure = { left: 510, right: 510 + 9 * 46 * 0.55, top: 134 - 46 * 0.8, bottom: 174 + 34 * 0.3 };
		const labels = [structure, labelBox(BACKLOG_LABEL.at, BACKLOG_LABEL.text, BACKLOG_LABEL.size), { ...CAPTION_BOX }];
		[pill('customer'), pill('option'), burst].forEach((box) => {
			expect(box.left).toBeGreaterThanOrEqual(0);
			expect(box.right).toBeLessThanOrEqual(1080);
			labels.forEach((label) => expect({ box, label, overlaps: overlaps(box, label) }).toEqual({ box, label, overlaps: false }));
		});
		frames
			.filter((f) => poses[f].values)
			.forEach((f) => {
				const covering = trayBalls(poses[f]).filter((ball) => covers(ball, burst) && (poses[f].values!.burst ?? 0) > 0);
				expect({ f, covering }).toEqual({ f, covering: [] });
			});
	});

	test('"a feature" arrives with its outline, early in its beat', () => {
		const { from, durationInFrames: length } = beatRange('feature-outline');
		const feature = Array.from({ length }, (_, i) => poseAt(from + i).outlines!.find((o) => o.label === 'a feature')!);
		const shownAt = feature.findIndex((o) => tagShown(o) >= 1);
		const drawnAt = feature.findIndex((o) => o.draw >= 1);
		expect(shownAt).toBeGreaterThan(0);
		expect(shownAt).toBeLessThan(drawnAt);
		expect(shownAt / FPS).toBeLessThan(1.5);
	});
});
