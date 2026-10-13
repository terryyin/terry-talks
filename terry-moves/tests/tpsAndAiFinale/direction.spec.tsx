import { sceneById } from '../../src/tpsAndAiFinale/film';
import { filmAt, normalized, registerFilms } from '../tpsAndAiJit/frames';

const finaleAt = (seconds: number) => filmAt('TPSAndAIFinaleFilm', seconds).picture;
beforeAll(registerFilms);

it('restages learning and improvement as clear source-art close-ups, dissolving once into the second moment', () => {
	for (const [id, first, second] of [['respect', 'Learn', 'Teach'], ['improve', 'Prepare', 'Simplify']] as const) {
		const scene = sceneById(id);
		const change = scene.captionRanges[scene.captionRanges.length - 1].start;
		const before = finaleAt(change - 1 / 30);
		expect(before.querySelector('[data-illustration-view]')!.getAttribute('data-illustration-view')).toBe(first);
		expect(normalized(before.querySelector('[data-testid="learning-cue"]')!.textContent)).toBe(`${first} → ${second}`);
		const arriving = finaleAt(change);
		expect(arriving.querySelector('[data-illustration-view]')!.getAttribute('data-illustration-view')).toBe(second);
		expect(arriving.querySelector<HTMLElement>('[data-illustration-view]')!.style.opacity).toBe('0');
		expect(arriving.querySelector<HTMLElement>('[data-illustration-outgoing]')!.style.opacity).toBe('1');
		const held = finaleAt(change + 0.5);
		expect(held.querySelector<HTMLElement>('[data-illustration-view]')!.style.opacity).toBe('1');
		expect(held.querySelector('[data-illustration-outgoing]')).toBeNull();
		expect(finaleAt(scene.end - 1 / 30).querySelector('[data-illustration-view]')!.outerHTML).toBe(held.querySelector('[data-illustration-view]')!.outerHTML);
	}
});

it('keeps the four large reinforcing nodes visible and follows safeguards, freedom, capability and trust deterministically', () => {
	const scene = sceneById('cycle');
	const [first, second] = scene.captionRanges;
	const seeks = [[first.start, 'safeguards'], [(first.start + first.end) / 2, 'freedom'], [second.start, 'capability'], [(second.start + second.end) / 2, 'trust']] as const;
	for (const [seconds, expected] of seeks) {
		const picture = finaleAt(seconds);
		expect(picture.querySelectorAll('[data-cycle-node]')).toHaveLength(4);
		expect(picture.querySelectorAll('[data-cycle-node][data-current="true"]')).toHaveLength(1);
		expect(picture.querySelector('[data-cycle-node][data-current="true"]')!.getAttribute('data-cycle-node')).toBe(expected);
		expect(picture.querySelectorAll('[data-cycle-arrow]')).toHaveLength(4);
	}
	const ordered = [...seeks.map(([seconds]) => seconds), scene.end - 1 / 30];
	const forward = new Map(ordered.map((seconds) => [seconds, finaleAt(seconds).querySelector('[data-scene]')!.outerHTML]));
	for (const seconds of [...ordered].reverse()) expect(finaleAt(seconds).querySelector('[data-scene]')!.outerHTML).toBe(forward.get(seconds));
});
