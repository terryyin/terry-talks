import React from 'react';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { ATDDScene, DiagramBoard } from '../../src/atdd/Scene';
import { cue } from '../../src/atdd/diagrams';
import { durationInFrames, film, FPS, scenes } from '../../src/atdd/film';
import { baselineStaging } from './stagingFixtures';
import { palette, RED, STROKE, TEAM_COLORS, WAIT } from '../../src/atdd/art';

// Baseline oracle: c379fd4's ATDD/diagram-analysis.md and film-script.json.
// Native render/playback owns actual media decoding and typography.
const svg = (element: React.ReactElement) => new DOMParser().parseFromString(renderToStaticMarkup(element), 'image/svg+xml');
const sceneAt = (seconds: number) => svg(<ATDDScene seconds={seconds} staging={baselineStaging} />);
const text = (document: Document, label: string) => Array.from(document.querySelectorAll('text')).find((node) => node.textContent === label)!;
const sheets = (document: Document) => Array.from(document.querySelectorAll('text')).filter((node) => node.textContent === 'Scenario A').map((node) => node.parentElement!);
const statuses = (sheet: Element) => ['Given', 'Select', 'Update', 'Then'].map((label) => Array.from(sheet.querySelectorAll('text')).find((node) => node.textContent === label || node.textContent === `${label}*`)!.parentElement!.querySelector('circle')!.getAttribute('fill'));
const participants = (document: Document) => TEAM_COLORS.map((color) => document.querySelector(`rect[fill="${color}"][width="36"]`)!.parentElement!);

describe('the source-linked ATDD baseline on the current runtime', () => {
	it('retains the saved script, fourteen scene beats, and measured 4471-frame timing', () => {
		const source = readFileSync(`${__dirname}/../../../ATDD/film-script.json`);
		expect(createHash('sha256').update(source).digest('hex')).toBe('1a672d63b2f30e1c7b0ec5d40ccbbea957ac5589daa0c1234a1bc04bb6a9ecea');
		expect(scenes.map(({ id }) => id)).toEqual(['tree', 'grow', 'scenarios', 'given', 'selection', 'shortcut', 'update', 'local', 'then', 'split', 'rejoin', 'done', 'then-first', 'scope']);
		expect(FPS).toBe(30);
		expect(durationInFrames).toBe(4471);
		expect(film.coverDuration).toBe(1.2);
		expect(film.duration).toBe(durationInFrames / FPS);
	});

	it('reproduces the uneven tree and its two distinct test probes on the exported board', () => {
		const board = svg(<DiagramBoard diagram="tree" staging={baselineStaging} />);
		expect(board.querySelectorAll(`rect[fill="${palette.panel}"][stroke="${palette.structure}"]`)).toHaveLength(9);
		expect(board.querySelectorAll(`path[stroke-width="${STROKE.detail}"]`)).toHaveLength(8);
		['User result', 'Front end', 'Back end', 'End-to-end', 'Internal'].forEach((label) => expect(text(board, label)).toBeDefined());
		expect(Array.from(board.querySelectorAll('text')).filter((node) => node.textContent === 'T')).toHaveLength(2);
		const boxes = Array.from(board.querySelectorAll(`rect[fill="${palette.panel}"][stroke="${palette.structure}"]`));
		const lowest = Math.max(...boxes.map((box) => Number(box.getAttribute('y'))));
		expect(boxes.filter((box) => Number(box.getAttribute('y')) === lowest)).toHaveLength(2);
		expect(boxes.filter((box) => Number(box.getAttribute('y')) === lowest).every((box) => Number(box.getAttribute('x')) > 540)).toBe(true);
	});

	it('keeps six successive sheets on the clockwise circle, with local loops and the integrated fork', () => {
		const board = svg(<DiagramBoard diagram="circle" staging={baselineStaging} />);
		const steps = sheets(board);
		expect(steps).toHaveLength(6);
		expect(steps.map(statuses)).toEqual([
			[palette.behavior, palette.paper, palette.paper, palette.paper],
			[palette.behavior, RED, palette.paper, palette.paper],
			[palette.behavior, palette.behavior, palette.behavior, palette.paper],
			[palette.behavior, palette.behavior, palette.behavior, RED],
			[palette.behavior, palette.behavior, palette.behavior, palette.paper],
			[palette.behavior, palette.behavior, palette.behavior, palette.behavior],
		]);
		const arcs = Array.from(board.querySelectorAll('path[d]')).filter((path) => / A280 280 0 0 1 /.test(path.getAttribute('d')!));
		expect(arcs).toHaveLength(6);
		expect(arcs.every((path) => path.getAttribute('marker-end')?.startsWith('url(#'))).toBe(true);
		expect(text(board, 'Backlog')).toBeDefined();
		expect(text(board, 'Local TDD')).toBeDefined();
		expect(Array.from(board.querySelectorAll('text')).filter((node) => node.textContent === 'REFACTOR')).toHaveLength(2);
	});

	it('shows the green prefix, temporary shortcut, failed result and all-green reunion at their source cues', () => {
		const first = sheets(sceneAt(cue(3, 0, 'pass') + 0.3));
		expect(statuses(first[0])).toEqual([palette.behavior, palette.paper, palette.paper, palette.paper]);
		const selection = sheets(sceneAt(cue(4, 0, 'fails') + 0.3));
		expect(statuses(selection[1])).toEqual([palette.behavior, RED, palette.paper, palette.paper]);
		const shortcut = sceneAt(cue(5, 1, 'again') + 0.5);
		expect(shortcut.querySelector(`circle[stroke="${WAIT}"]`)).not.toBeNull();
		expect(text(shortcut, 'Select*')).toBeDefined();
		expect(statuses(sheets(shortcut)[2]).slice(0, 2)).toEqual([palette.behavior, palette.behavior]);
		const failed = sheets(sceneAt(cue(8, 0, 'wrong') + 0.3));
		expect(statuses(failed[3])).toEqual([palette.behavior, palette.behavior, palette.behavior, RED]);
		const completed = sheets(sceneAt(cue(10, 0, 'pass') + 0.3));
		expect(statuses(completed[4])[3]).toBe(palette.paper);
		expect(statuses(completed[5])).toEqual([palette.behavior, palette.behavior, palette.behavior, palette.behavior]);
	});

	it('preserves all five colored identities through the 3/2 split and reunion', () => {
		const split = sceneAt(cue(9, 1, 'two') + 1.3);
		const people = participants(split);
		expect(people.map((person) => person.querySelector('text')!.textContent)).toEqual(['1', '2', '3', '4', '5']);
		expect(text(split, '3 · Front-end TDD')).toBeDefined();
		expect(text(split, '2 · Finish Scenario A')).toBeDefined();
		const locations = people.map((person) => person.getAttribute('transform')!.match(/translate\(([-\d.]+) ([-\d.]+)\)/)!.slice(1).map(Number));
		expect(locations.slice(0, 3).every(([x, y]) => x > Math.max(...locations.slice(3).map(([finishX]) => finishX)) && y < Math.min(...locations.slice(3).map(([, finishY]) => finishY)))).toBe(true);
		expect(locations.slice(3).every(([x, y]) => x < 250 && y > 580)).toBe(true);
		const reunited = participants(sceneAt(cue(10, 0, 'reunite') + 1.6));
		expect(reunited.map((person) => person.querySelector('text')!.textContent)).toEqual(['1', '2', '3', '4', '5']);
		const heights = reunited.map((person) => Number(person.getAttribute('transform')!.match(/translate\(([-\d.]+) ([-\d.]+)\)/)![2]));
		expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(5);
		expect(heights.every((y) => y > 315 && y < 325)).toBe(true);
	});

	it('uses both diagram miniatures on the cover and closing and discloses synthetic narration', () => {
		[0, (durationInFrames - 1) / FPS].forEach((seconds) => {
			const frame = sceneAt(seconds);
			['ATDD', 'Work through', 'one scenario', 'User result', 'Front end', 'Back end'].forEach((label) => expect(text(frame, label)).toBeDefined());
			expect(sheets(frame).length).toBeGreaterThanOrEqual(6);
		});
		expect(text(sceneAt(0), 'From the original whiteboard presentation')).toBeDefined();
		expect(text(sceneAt((durationInFrames - 1) / FPS), 'CEDAR · AI-GENERATED NARRATION')).toBeDefined();
	});

	it('renders all actual scene beats with their measured captions and finite SVG geometry', () => {
		scenes.forEach((scene) => {
			const caption = scene.captions[0];
			const seconds = (caption.start + caption.end) / 2;
			const rendered = renderToStaticMarkup(<ATDDScene seconds={seconds} staging={baselineStaging} />);
			expect(rendered).not.toMatch(/NaN|Infinity/);
			expect(sceneAt(seconds).documentElement.textContent).toContain(caption.text);
		});
	});
});
