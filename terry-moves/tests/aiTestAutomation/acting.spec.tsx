import { renderToStaticMarkup } from 'react-dom/server';
import { AITestAutomationScene } from '../../src/aiTestAutomation/Scene';
import { cue, FilmScene, filmScript } from '../../src/aiTestAutomation/film';
import { articulatedArm, Point } from '../../src/aiTestAutomation/motion';

const distance = (a: Point, b: Point): number => Math.hypot(a.x - b.x, a.y - b.y);
const point = (value: string): Point => { const [x, y] = value.split(',').map(Number); return { x, y }; };
const markupAt = (seconds: number): string => renderToStaticMarkup(<AITestAutomationScene seconds={seconds}/>);
const scene = (id: FilmScene['id']): FilmScene => filmScript.scenes.find((entry) => entry.id === id)!;
const arms = (markup: string): { shoulder: Point; elbow: Point; hand: Point; target: Point }[] => [...markup.matchAll(/data-shoulder="([^"]+)" data-elbow="([^"]+)" data-hand="([^"]+)" data-target="([^"]+)"/g)].map((match) => ({ shoulder: point(match[1]), elbow: point(match[2]), hand: point(match[3]), target: point(match[4]) }));
const worldHand = (seconds: number, actorId: string, side: 'left' | 'right'): Point => {
	const document = new DOMParser().parseFromString(markupAt(seconds), 'text/html');
	const actor = document.querySelector(`[data-testid="${actorId}"]`)!;
	const [x, y, scale] = actor.getAttribute('transform')!.match(/-?[\d.]+/g)!.map(Number);
	const hand = point(actor.querySelectorAll('[data-testid="articulated-arm"]')[side === 'left' ? 0 : 1].getAttribute('data-hand')!);
	return { x: x + hand.x * scale, y: y + hand.y * scale };
};

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
		const hook = scene('hook');
		for (let seconds = hook.captionRanges[1].start; seconds < hook.captionRanges[1].start + 0.6; seconds += 1 / 30) {
			const { shoulder, elbow, hand } = arms(markupAt(seconds))[1];
			const winding = (elbow.x - shoulder.x) * (hand.y - shoulder.y) - (elbow.y - shoulder.y) * (hand.x - shoulder.x);
			expect(winding).toBeGreaterThan(0);
		}
	});

	it('defines the expected behavior before checking it, then reveals the code burden', () => {
		const purpose = scene('purpose');
		const expected = markupAt(purpose.captionRanges[0].speechStart + 0.5);
		expect(expected).toContain('SAVE KEEPS DATA');
		expect(expected).toContain('data-check-run="false"');
		const contact = cue(purpose, 1, 'show') + 0.2;
		expect(distance(worldHand(contact, 'engineer', 'right'), { x: 440, y: 805 })).toBeLessThan(0.01);
		expect(markupAt(cue(purpose, 1, 'does') + 0.05)).toContain('data-check-run="true"');
		expect(markupAt(cue(purpose, 1, 'does') + 0.05)).toContain('✓ DATA KEPT');
		const upkeep = scene('upkeep');
		expect(markupAt(upkeep.captionRanges[0].speechEnd)).toContain('data-code-first="true" data-overloaded="false"');
		expect(markupAt(upkeep.captionRanges[1].speechStart + 1)).toContain('ORIGINAL INTENT');
		expect(markupAt(upkeep.end - 0.5)).toContain('data-overloaded="true"');
		expect(markupAt(upkeep.end - 0.5)).toContain('data-mood="panicked"');
	});

	it('halts incoming code before withdrawing it and making repair the current work', () => {
		const stop = scene('stopFix');
		const first = cue(stop, 0, 'stop') + 0.05;
		expect(markupAt(first)).toContain('data-code-arrivals-halted="true" data-code-withdrawn="false" data-current-work="contain"');
		expect(distance(worldHand(cue(stop, 0, 'stop'), 'engineer', 'right'), { x: 622, y: 805 })).toBeLessThan(0.01);
		const withdrawn = markupAt(cue(stop, 2, 'complexity') + 0.6);
		expect(withdrawn).toContain('data-code-withdrawn="true" data-current-work="contain"');
		const currentWork = markupAt(cue(stop, 3, 'control'));
		expect(currentWork).toContain('data-current-work="repair"');
		expect(currentWork).toContain('data-testid="legacy-cabinet"');
		expect(currentWork).toContain('data-fixed="false"');
	});

	it('confirms a repair, explores a different variation and checks known behavior before redirecting a finding to repair', () => {
		const demonstration = scene('sandbox');
		const show = cue(demonstration, 2, 'show');
		expect(markupAt(show + 0.2)).toContain('data-observed-failure="false"');
		expect(distance(worldHand(show + 0.46, 'engineer', 'right'), { x: 542, y: 805 })).toBeLessThan(0.01);
		expect(markupAt(show + 0.6)).toContain('OBSERVED: DATA LOST');
		const checks = scene('investigate');
		expect(markupAt(checks.captionRanges[0].speechStart + 0.5)).toContain('data-save-repaired="false" data-save-confirmed="false"');
		expect(markupAt(checks.captionRanges[0].speechEnd + 0.1)).toContain('data-save-repaired="true" data-save-confirmed="false"');
		const confirmation = cue(checks, 1, 'confirm');
		const exploration = cue(checks, 1, 'explore');
		const regression = cue(checks, 2, 'check');
		[confirmation, exploration, regression].forEach((contact) => expect(distance(worldHand(contact, 'ai-companion', 'left'), { x: 815, y: 837 })).toBeLessThan(0.01));
		expect(markupAt(confirmation + 0.15)).toContain('data-save-confirmed="true" data-reload-bug="false"');
		expect(markupAt(confirmation + 0.15)).toContain('✓ FIX CONFIRMED');
		expect(markupAt(exploration + 0.2)).toContain('data-action="explore-reload"');
		expect(markupAt(exploration + 0.2)).toContain('× SECOND TAB: OLD DATA');
		expect(markupAt(regression + 0.2)).toContain('data-reload-bug="true" data-known-working="true"');
		expect(markupAt(regression + 0.2)).toContain('✓ RECORD FOUND');
		const relief = markupAt(cue(checks, 4, 'relief') + 0.2);
		expect(relief).toContain('data-current-work="repair-reload"');
		expect(relief).toContain('NEXT: FIX RELOAD');
		expect(relief).toContain('data-mood="relieved"');
		expect(relief).not.toContain('data-testid="test-card"');
		expect(relief).not.toContain('data-testid="test-code-spool"');
	});

	it('separates ordinary execution from new-feature intent and establishes a failing test before feature code', () => {
		const development = scene('selective');
		const ordinary = markupAt(development.captionRanges[1].speechStart + 0.5);
		expect(ordinary).toContain('data-testid="ordinary-test-code"');
		expect(ordinary).toContain('RUNS WITHOUT AI');
		expect(ordinary).not.toContain('data-testid="test-first-development"');
		expect(markupAt(cue(development, 2, 'tests') + 0.2)).toContain('data-has-test="true" data-has-feature="false" data-test-passing="false"');
		expect(markupAt(cue(development, 3, 'drive') + 0.2)).toContain('data-has-test="true" data-has-feature="true" data-test-passing="false"');
		expect(markupAt(development.captionRanges[3].speechEnd)).toContain('data-has-test="true" data-has-feature="true" data-test-passing="true"');
	});
});
