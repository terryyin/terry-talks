import { renderToStaticMarkup } from 'react-dom/server';
import { AITestAutomationScene } from '../../src/aiTestAutomation/Scene';
import { filmScript } from '../../src/aiTestAutomation/film';
import { articulatedArm, Point } from '../../src/aiTestAutomation/motion';

const distance = (a: Point, b: Point): number => Math.hypot(a.x - b.x, a.y - b.y);
const point = (value: string): Point => { const [x, y] = value.split(',').map(Number); return { x, y }; };
const markupAt = (seconds: number): string => renderToStaticMarkup(<AITestAutomationScene seconds={seconds}/>);
const arms = (markup: string): { shoulder: Point; elbow: Point; hand: Point; target: Point }[] => [...markup.matchAll(/data-shoulder="([^"]+)" data-elbow="([^"]+)" data-hand="([^"]+)" data-target="([^"]+)"/g)].map((match) => ({ shoulder: point(match[1]), elbow: point(match[2]), hand: point(match[3]), target: point(match[4]) }));

describe('legacy workshop physical acting and causal sequence', () => {
	it('keeps both limb segments rigid and unreachable requests inside the reach circle', () => {
		const shoulder = { x: 40, y: -220 };
		[{ x: 95, y: -170 }, { x: 130, y: -230 }, { x: 2000, y: 1000 }, shoulder].forEach((target) => {
			const solved = articulatedArm(shoulder, target, 67, 68, -1);
			expect(distance(shoulder, solved.elbow)).toBeCloseTo(67, 8);
			expect(distance(solved.elbow, solved.hand)).toBeCloseTo(68, 8);
			expect(distance(shoulder, solved.hand)).toBeLessThanOrEqual(135);
		});
	});

	it('stages the film within reach and preserves segment lengths through gestures', () => {
		for (let seconds = 0; seconds < filmScript.duration; seconds += 0.25) {
			const sampledArms = arms(markupAt(seconds));
			expect(sampledArms.length).toBeGreaterThanOrEqual(4);
			sampledArms.forEach(({ shoulder, elbow, hand, target }) => {
				const human = shoulder.y < -200;
				expect(distance(shoulder, elbow)).toBeCloseTo(human ? 67 : 48, 8);
				expect(distance(elbow, hand)).toBeCloseTo(human ? 68 : 46, 8);
				expect(distance(hand, target)).toBeLessThan(0.01);
			});
		}
		for (let seconds = 2.14; seconds < 2.9; seconds += 1 / 30) {
			const { shoulder, elbow, hand } = arms(markupAt(seconds))[1];
			const winding = (elbow.x - shoulder.x) * (hand.y - shoulder.y) - (elbow.y - shoulder.y) * (hand.x - shoulder.x);
			expect(winding).toBeGreaterThan(0);
		}
	});

	it('repeats the same mismatch after reset and only shows success after confirmation and repair', () => {
		expect(markupAt(35.9)).toContain('OBSERVED: DATA LOST');
		expect(markupAt(36.7)).toContain('SAME START. SAME CHECK.');
		expect(markupAt(37.8)).toContain('OBSERVED: DATA LOST');
		expect(markupAt(39.3)).toContain('REPRODUCE + CONFIRM');
		expect(markupAt(40.1)).toContain('data-repaired="false" data-retested="false"');
		expect(markupAt(40.6)).toContain('data-repaired="true" data-retested="false"');
		expect(markupAt(41.0)).toContain('data-repaired="true" data-retested="true"');
	});

	it('separates ordinary execution from new-feature intent and establishes a failing test before feature code', () => {
		const ordinary = markupAt(48.0);
		expect(ordinary).toContain('data-testid="ordinary-test-code"');
		expect(ordinary).toContain('RUNS WITHOUT AI');
		expect(ordinary).not.toContain('data-testid="test-first-development"');
		expect(markupAt(50.7)).toContain('data-has-test="true" data-has-feature="false" data-test-passing="false"');
		expect(markupAt(51.8)).toContain('data-has-test="true" data-has-feature="true" data-test-passing="false"');
		expect(markupAt(52.8)).toContain('data-has-test="true" data-has-feature="true" data-test-passing="true"');
	});
});
