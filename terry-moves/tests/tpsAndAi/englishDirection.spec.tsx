import { editionAt, englishAt, registerEditions } from './registeredFilmHarness';

beforeAll(registerEditions);

describe('the registered narrated English Jidoka edition', () => {
	it('plays retained narration only in English, keeps music quiet through speech and restores the closing hold', () => {
		for (const seconds of [0, 27, 56, 75, 83, 85.9]) {
			const english = englishAt(seconds).picture;
			const tracks = [...english.querySelectorAll('audio')];
			expect(tracks.map((audio) => audio.getAttribute('src')?.split('/').pop())).toEqual(['score.wav', 'narration-en.wav']);
			expect(tracks[1].getAttribute('data-volume')).toBe('1');
			expect(Number(tracks[0].getAttribute('data-volume'))).toBe(seconds <= 83 ? 0.22 : 0.75);
			for (const id of ['TPSAndAIFilmJa', 'TPSAndAIFilmZhHant', 'TPSAndAIFilmTh']) {
				const localized = editionAt(id, seconds).picture.querySelectorAll('audio');
				expect(localized).toHaveLength(1);
				expect(localized[0].getAttribute('src')).toContain('assets/tps-and-ai/score.wav');
				expect(localized[0].getAttribute('data-volume')).toBe('0.75');
			}
		}
		const returning = Number(englishAt(83.5).picture.querySelector('audio')!.getAttribute('data-volume'));
		expect(returning).toBeGreaterThan(0.22);
		expect(returning).toBeLessThan(0.75);
	});

	it('makes judgment, rules, checks and the closed STOP readable on their English caption boundaries', () => {
		const state = (seconds: number) => {
			const page = englishAt(seconds).picture;
			const opacity = (id: string) => page.querySelector<HTMLElement>(`[data-testid="${id}"]`)!.style.opacity;
			return { page, opacity };
		};
		const solved = state(51);
		expect(solved.opacity('solved-human-judgment')).toBe('1');
		expect(solved.page.querySelector('[data-testid="solved-human-judgment"]')!.textContent).toBe('SolveHuman judgment');
		for (const at of [51, 56 - 1 / 30]) {
			for (const id of ['preserved-known-rules', 'protective-simple-checks', 'known-rule-stop-path', 'clear-evidence']) expect(state(at).opacity(id)).toBe('0');
		}
		for (const at of [56, 60.9]) {
			const { page, opacity } = state(at);
			for (const id of ['preserved-known-rules', 'protective-simple-checks', 'known-rule-stop-path']) expect(opacity(id)).toBe('1');
			expect(page.querySelector('[data-testid="protective-simple-checks"]')!.textContent).toContain('Simple checks');
			expect(page.querySelector('[data-testid="closed-software-stop"]')!.getAttribute('data-work-blocked')).toBe('true');
			expect(opacity('clear-evidence')).toBe('0');
		}
		for (const at of [61, 65.9]) expect(state(at).opacity('clear-evidence')).toBe('1');
		for (const id of ['TPSAndAIFilmJa', 'TPSAndAIFilmZhHant', 'TPSAndAIFilmTh']) {
			const original = editionAt(id, 56).picture;
			expect(original.querySelector<HTMLElement>('[data-testid="protective-simple-checks"]')!.style.opacity).toBe('0');
			expect(original.querySelector('[data-testid="clear-evidence"]')).toBeNull();
		}
	});

	it('removes redundant English shells in sequence while needed behavior and self-protection remain stable', () => {
		const at = (seconds: number) => englishAt(seconds).picture;
		const shells = (seconds: number) => [...at(seconds).querySelectorAll('[data-testid^="redundant-shell-"]')].map((shell) => Number(shell.getAttribute('opacity')));
		expect(shells(68.8)).toEqual([0.35, 0.35, 0.35]);
		const outer = shells(69.1);
		expect(outer[0]).toBeGreaterThan(0); expect(outer[0]).toBeLessThan(0.35);
		expect(outer.slice(1)).toEqual([0.35, 0.35]);
		const middle = shells(69.8);
		expect(middle[0]).toBe(0); expect(middle[1]).toBeGreaterThan(0); expect(middle[1]).toBeLessThan(0.35); expect(middle[2]).toBe(0.35);
		const inner = shells(70.5);
		expect(inner.slice(0, 2)).toEqual([0, 0]); expect(inner[2]).toBeGreaterThan(0); expect(inner[2]).toBeLessThan(0.35);
		expect(shells(71.5)).toEqual([0, 0, 0]);
		const retained = (page: HTMLElement) => {
			const behavior = page.querySelector('[data-testid="necessary-behavior"]')!;
			return [behavior.outerHTML, behavior.nextElementSibling!.outerHTML, behavior.nextElementSibling!.nextElementSibling!.outerHTML];
		};
		for (const seconds of [68.8, 69.1, 69.8, 70.5, 71.5, 74.9]) {
			expect(retained(at(seconds))).toEqual(retained(at(66)));
			expect(at(seconds).textContent).toContain('Self-protection stays');
		}
		for (const id of ['TPSAndAIFilmJa', 'TPSAndAIFilmZhHant', 'TPSAndAIFilmTh']) expect(editionAt(id, 69.1).picture.querySelector('[data-testid^="redundant-shell-"]')).toBeNull();
	});

	it('settles the arriving English freedom title and holds the original painting before the exact credit', () => {
		const title = (seconds: number) => englishAt(seconds).picture.querySelector<HTMLElement>('[data-scene] > div')!;
		const arriving = title(75.3);
		expect(Number(arriving.style.opacity)).toBeGreaterThan(0);
		expect(Number(arriving.style.opacity)).toBeLessThan(1);
		expect(arriving.style.transform).not.toBe('translateY(0px)');
		const settled = title(76.5);
		expect(settled.style.opacity).toBe('1'); expect(settled.style.transform).toBe('translateY(0px)');
		for (const seconds of [82.9, 83, 85.9]) {
			expect(title(seconds).outerHTML).toBe(settled.outerHTML);
			expect(englishAt(seconds).picture.querySelector('img[src$="jidoka-frees-software-team.png"]')!.outerHTML).toBe(englishAt(75).picture.querySelector('img[src$="jidoka-frees-software-team.png"]')!.outerHTML);
		}
		expect(englishAt(83).picture.querySelector('[data-testid="film-credits"]')!.textContent).toBe('Idea and film from Terry');
		for (const id of ['TPSAndAIFilmJa', 'TPSAndAIFilmZhHant', 'TPSAndAIFilmTh']) expect(editionAt(id, 75).picture.querySelector<HTMLElement>('[data-scene] > div')!.style.opacity).toBe('');
	});

	it('repeats the actual English picture and audio mix after backward seeks across all changed transitions', () => {
		const times = [51, 55.9, 56, 56.3, 60.9, 61, 61.3, 68.8, 69.1, 69.8, 70.5, 71.5, 75, 75.3, 76.5, 83, 83.5, 85.9];
		const forward = new Map(times.map((seconds) => [seconds, englishAt(seconds).picture.innerHTML]));
		for (const seconds of [...times].reverse()) expect(englishAt(seconds).picture.innerHTML).toBe(forward.get(seconds));
	});

});
