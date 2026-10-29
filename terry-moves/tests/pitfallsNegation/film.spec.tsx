import fs from 'node:fs';
import path from 'node:path';

const read = (...parts: string[]) => fs.readFileSync(path.join(__dirname, ...parts), 'utf8');
const filmSource = read('../../src/stories/RuleNegationFilm.tsx');
const stageSource = read('../../src/pitfallsNegation/Stage.tsx');
const assistantSource = read('../../src/pitfallsNegation/AssistantAbsence.tsx');
const closeSource = read('../../src/pitfallsNegation/CorrectiveClose.tsx');
const hookSource = read('../../src/pitfallsNegation/OpeningHook.tsx');
const artwork = JSON.parse(read('../../../AI Augmented Development Pitfalls/02-film-artwork.json'));

describe('RuleNegationFilm visible story wiring', () => {
	it('registers the design beat timeline with absence follow-through and matching close', () => {
		expect(filmSource).toContain('from={0}');
		expect(filmSource).toContain('from={2.5 * fps}');
		expect(filmSource).toContain('from={5.5 * fps}');
		expect(filmSource).toContain('from={9.5 * fps}');
		expect(filmSource).toContain('from={14.5 * fps}');
		expect(filmSource).toContain('from={19 * fps}');
		expect(filmSource).toContain('<AssistantAbsence');
		expect(filmSource).toContain('Done. Gate removed.');
		expect(filmSource).toContain('Describe what is true now.');
		expect(filmSource).toContain('Keep checks that protect current behavior.');
		expect(filmSource).toContain('Retire what only remembers the old rule.');
		expect(filmSource).toContain('NegationAssistantAbsence');
		expect(filmSource).toContain('NegationCorrectiveClose');
		expect(filmSource).toContain('id="RuleNegationFilm"');
	});

	it('discloses AI content under series label / 02 and lists active plates on disk', () => {
		expect(stageSource).toContain('/ 02');
		expect(stageSource).toContain('AI-generated scenes');
		expect(stageSource).toContain('assets/pitfalls-negation/');
		expect(stageSource).toContain('CanvasImage');
		expect(artwork.activeScenePlates).toEqual(['workplace', 'holdings-work']);
		for (const asset of artwork.assets) {
			expect(fs.existsSync(path.join(__dirname, '../../..', asset.path))).toBe(true);
			expect(asset.prompt.length).toBeGreaterThan(40);
		}
	});

	it('shows absence artifacts beyond gate removal and keeps vs retires in the close', () => {
		expect(hookSource).toContain('data-primary-caption');
		expect(assistantSource).toContain('data-absence-artifact="tests"');
		expect(assistantSource).toContain('data-absence-artifact="docs"');
		expect(assistantSource).toContain('No entry-required tests');
		expect(assistantSource).toContain('Docs: does not require entry');
		expect(closeSource).toContain('data-keep-check');
		expect(closeSource).toContain('Holding after refresh');
		expect(closeSource).toContain('data-retire-assertion');
		expect(closeSource).toContain('data-primary-caption');
	});
});
