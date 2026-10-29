import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import translation from '../../../ATDD/zh-Hant.json';
import { ATDDScene, DiagramBoard } from '../../src/atdd/Scene';
import { ATDDLanguage, ATDDLanguageProvider, captionText } from '../../src/atdd/language';
import { durationInFrames, FPS, scenes } from '../../src/atdd/film';
import { cue } from '../../src/atdd/timing';
import { captionLines } from '../../src/storyImpact/caption';
import { ZH_HANT_FONT_FAMILY } from '../../src/storyImpact/zhHant';

const svg = (element: React.ReactElement, language: ATDDLanguage = 'en') => new DOMParser().parseFromString(renderToStaticMarkup(<ATDDLanguageProvider language={language}>{element}</ATDDLanguageProvider>), 'image/svg+xml');
const labels = (document: Document) => Array.from(document.querySelectorAll('text:not([data-testid="caption"])'));
const labelsBySource: Record<string, string> = translation.screenText;
const times = [0, (durationInFrames - 1) / FPS, ...scenes.flatMap(({ captions }) => captions.map(({ start, end }) => (start + end) / 2)), cue(7, 0, 'red') + 0.1, cue(7, 0, 'green') + 0.1];
const frames = [...times.map((seconds) => <ATDDScene key={seconds} seconds={seconds} />), <DiagramBoard key="tree" diagram="tree" />, <DiagramBoard key="circle" diagram="circle" />];

describe('the Traditional Chinese ATDD edition', () => {
	it('covers every approved scene/caption window with written and spoken Chinese', () => {
		expect(translation.language).toBe('zh-Hant');
		expect(translation.narration.map(({ sceneId }) => sceneId)).toEqual(scenes.map(({ id }) => id));
		translation.narration.forEach(({ captions }, sceneIndex) => {
			expect(captions).toHaveLength(scenes[sceneIndex].captions.length);
			captions.forEach(({ text, spoken }, captionIndex) => {
				expect(text).toMatch(/[\u3400-\u9fff]/);
				expect(spoken).toMatch(/[\u3400-\u9fff]/);
				expect(captionText(sceneIndex, scenes[sceneIndex].captions[captionIndex].text, 'zh-Hant')).toBe(text);
				expect(Math.max(...captionLines(text).map((line) => [...line].length))).toBeLessThanOrEqual(20);
			});
		});
	});

	it('translates the cover, all scene labels, sheet rows, nested waiting label and closing credit', () => {
		frames.forEach((element) => {
			const english = labels(svg(element));
			const chinese = labels(svg(element, 'zh-Hant'));
			expect(chinese).toHaveLength(english.length);
			english.forEach((node, index) => {
				const original = node.textContent!;
				if (/^[A-EGWT\d·…*]*$/.test(original)) {
					expect(chinese[index].textContent).toBe(original);
					return;
				}
				const key = original.endsWith('*') ? original.slice(0, -1) : original;
				expect(labelsBySource[key]).toBeDefined();
				expect(chinese[index].textContent).toBe(`${labelsBySource[key]}${original.endsWith('*') ? '*' : ''}`);
			});
		});
	});

	it('uses the shared Chinese font while preserving the approved drawing, camera and timing', () => {
		const drawing = (document: Document) => {
			document.querySelectorAll('text').forEach((node) => {
				node.textContent = '';
				node.removeAttribute('font-family');
			});
			return document.documentElement.outerHTML;
		};
		frames.forEach((element) => {
			const chinese = svg(element, 'zh-Hant');
			chinese.querySelectorAll('text').forEach((node) => expect(node.getAttribute('font-family')).toBe(ZH_HANT_FONT_FAMILY));
			expect(drawing(chinese)).toBe(drawing(svg(element)));
		});
		expect(FPS).toBe(30);
		expect(durationInFrames).toBe(4471);
	});

	it('renders each translated caption in its existing window and keeps English as the default', () => {
		scenes.forEach(({ captions }, sceneIndex) => captions.forEach(({ text, start, end }, captionIndex) => {
			const element = <ATDDScene seconds={(start + end) / 2} />;
			expect(svg(element, 'zh-Hant').querySelector('[data-testid="caption"]')?.textContent).toBe(translation.narration[sceneIndex].captions[captionIndex].text);
			expect(renderToStaticMarkup(element)).toBe(renderToStaticMarkup(<ATDDLanguageProvider language="en">{element}</ATDDLanguageProvider>));
			expect(captionText(sceneIndex, text, 'en')).toBe(text);
		}));
	});
});
