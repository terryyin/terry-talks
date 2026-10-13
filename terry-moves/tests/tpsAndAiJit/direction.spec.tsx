import { jitAt, normalized, registerFilms } from './frames';

beforeAll(registerFilms);

const heading = (seconds: number) => jitAt(seconds).picture.querySelector<HTMLElement>('[data-directed-heading]')!;
const focus = (seconds: number) => jitAt(seconds).picture.querySelector<HTMLElement>('[data-focus]')!;
const framing = (node: HTMLElement) => [node.style.left, node.style.top, node.style.width, node.style.height, node.querySelector('img')!.style.left, node.querySelector('img')!.style.top];

it('preserves the complete frame-zero cover and lets chapter headings arrive once before their reading holds', () => {
	const cover = jitAt(0).picture;
	expect(cover.querySelector('[data-directed-heading]')).toBeNull();
	expect([...cover.querySelectorAll('[data-scene="hook"] > div')].map((node) => normalized(node.textContent))).toEqual(['Just in time', 'Trust the team to meet real needs, on time.']);
	for (const [start, held, end] of [[15, 15.6, 18.9], [27, 27.6, 37.9], [38, 38.6, 49.9], [50, 50.6, 61.9]] as const) {
		const arriving = heading(start + 0.1);
		expect(Number(arriving.style.opacity)).toBeGreaterThan(0);
		expect(Number(arriving.style.opacity)).toBeLessThan(1);
		expect(arriving.style.translate).not.toBe('0px 0px');
		const settled = heading(held);
		expect(settled.style).toMatchObject({ opacity: '1', translate: '0px 0px' });
		expect(heading(end).outerHTML).toBe(settled.outerHTML);
	}
	const first = jitAt(62.1).picture.querySelectorAll<HTMLElement>('[data-directed-heading]');
	expect(Number(first[0].style.opacity)).toBeGreaterThan(0);
	expect(first[1].style.opacity).toBe('0');
	expect(jitAt(63).picture.querySelectorAll('[data-directed-heading]')).toHaveLength(2);
	const settled = jitAt(63).picture.querySelector('[data-scene="integration"] > div')!.outerHTML;
	expect(jitAt(77.9).picture.querySelector('[data-scene="integration"] > div')!.outerHTML).toBe(settled);
});

it('travels between compatible panorama crops, dissolves the shaped crop and holds each settled view across direct seeks', () => {
	const outgoing = jitAt(64).picture.querySelector<HTMLElement>('[data-panorama-outgoing]')!;
	expect(outgoing.getAttribute('data-panorama-outgoing')).toBe('need');
	expect(framing(outgoing)).toEqual(framing(focus(64 - 1 / 30)));
	expect(outgoing.style.opacity).toBe('1');
	expect(focus(64).style.opacity).toBe('0');
	const dissolve = jitAt(64.3).picture;
	expect(Number(dissolve.querySelector<HTMLElement>('[data-focus]')!.style.opacity)).toBeCloseTo(0.5);
	expect(Number(dissolve.querySelector<HTMLElement>('[data-panorama-outgoing]')!.style.opacity)).toBeCloseTo(0.5);
	expect(jitAt(64.6).picture.querySelector('[data-panorama-outgoing]')).toBeNull();
	for (const [start, end] of [[67, 69], [69, 73], [73, 78]] as const) {
		const before = framing(focus(start - 1 / 30));
		const initial = framing(focus(start));
		const moving = framing(focus(start + 0.3));
		const held = framing(focus(start + 0.6));
		expect(initial).toEqual(before);
		expect(moving).not.toEqual(initial);
		expect(moving).not.toEqual(held);
		expect(framing(focus(end - 1 / 30))).toEqual(held);
	}
	expect(framing(focus(78))).toEqual(framing(focus(78 - 1 / 30)));
	expect(framing(focus(78.3))).not.toEqual(framing(focus(78)));
	expect(framing(focus(85.9))).toEqual(framing(focus(78.6)));
	const seeks = [62, 64.3, 64.6, 67, 67.3, 69.3, 73.3, 78, 78.3, 85.9];
	const forward = new Map(seeks.map((seconds) => [seconds, jitAt(seconds).picture.querySelector('[data-scene]')!.outerHTML]));
	for (const seconds of [...seeks].reverse()) expect(jitAt(seconds).picture.querySelector('[data-scene]')!.outerHTML).toBe(forward.get(seconds));
});
