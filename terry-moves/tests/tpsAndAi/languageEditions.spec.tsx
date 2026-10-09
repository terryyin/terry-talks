import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RemotionRoot } from '../../src/Root';

type Registration = {
	id: string;
	component: React.ComponentType;
	defaultProps?: Record<string, unknown>;
	durationInFrames: number;
	fps: number;
	width: number;
	height: number;
};
type SequenceCue = { from: number; durationInFrames: number; name?: string; components: unknown[] };
type Transport = {
	frame: number;
	config: Omit<Registration, 'component' | 'defaultProps'>;
	registrations: Registration[];
	sequences: SequenceCue[];
};

// Replace Remotion's registration/player/media boundaries. The Root, selected
// film components, language provider, scene components and caption wiring run.
// Sequence children receive their local frame, as they do in the real player.
jest.mock('remotion', () => {
	const React = jest.requireActual<typeof import('react')>('react');
	const offset = React.createContext(0);
	const transport: Transport = {
		frame: 0,
		config: { id: '', durationInFrames: 2580, fps: 30, width: 1080, height: 1080 },
		registrations: [],
		sequences: [],
	};
	return {
		...jest.requireActual('remotion'),
		__editionTestTransport: transport,
		Composition: (registration: Registration) => { transport.registrations.push(registration); return null; },
		Folder: ({ children }: React.PropsWithChildren) => <>{children}</>,
		Sequence: ({ from = 0, durationInFrames = Infinity, name, children }: React.PropsWithChildren<{ from?: number; durationInFrames?: number; name?: string }>) => {
			const absoluteFrom = React.useContext(offset) + from;
			transport.sequences.push({
				from: absoluteFrom,
				durationInFrames,
				name,
				components: React.Children.toArray(children).map((child) => React.isValidElement(child) ? child.type : typeof child),
			});
			if (transport.frame < absoluteFrom || transport.frame >= absoluteFrom + durationInFrames) return null;
			return <offset.Provider value={absoluteFrom}>{children}</offset.Provider>;
		},
		useCurrentFrame: () => transport.frame - React.useContext(offset),
		useVideoConfig: () => transport.config,
		Img: (props: React.ComponentProps<'img'>) => React.createElement('img', props),
		Audio: ({ src }: { src: string }) => React.createElement('audio', { src }),
		OffthreadVideo: (props: React.ComponentProps<'video'>) => React.createElement('video', props),
		Freeze: ({ frame, children }: React.PropsWithChildren<{ frame: number }>) => <div data-freeze-frame={frame}>{children}</div>,
	};
});

const transport = (jest.requireMock('remotion') as { __editionTestTransport: Transport }).__editionTestTransport;
const registration = (id: string): Registration => {
	const matching = transport.registrations.filter((entry) => entry.id === id);
	expect(matching).toHaveLength(1);
	return matching[0];
};
const editionAt = (id: string, seconds: number) => {
	const selected = registration(id);
	const { component: Component, defaultProps, ...config } = selected;
	transport.config = config;
	transport.frame = Math.round(seconds * config.fps);
	transport.sequences = [];
	const picture = document.createElement('div');
	picture.innerHTML = renderToStaticMarkup(<Component {...defaultProps} />);
	return { picture, sequences: [...transport.sequences] };
};
const englishAt = (seconds: number) => editionAt('TPSAndAIFilm', seconds);
const japaneseAt = (seconds: number) => editionAt('TPSAndAIFilmJa', seconds);
const normalized = (text: string | null) => text?.replace(/\s+/g, ' ').trim();

beforeAll(() => { renderToStaticMarkup(<RemotionRoot />); });

describe('the registered English and Japanese Jidoka editions', () => {
	it('makes both complete films selectable from the real Root with the accepted shared clock and square format', () => {
		for (const id of ['TPSAndAIFilm', 'TPSAndAIFilmJa']) {
			expect(registration(id)).toMatchObject({ id, durationInFrames: 2580, fps: 30, width: 1080, height: 1080 });
		}
		expect(englishAt(0).sequences.map(({ from, durationInFrames }) => [from, durationInFrames])).toEqual([
			[0, 270], [270, 300], [570, 240], [810, 360], [1170, 360],
			[1530, 450], [1980, 270], [2250, 240], [2490, 90],
		]);
	});

	it.each([
		['hook', 0], ['burden', 9], ['house', 19], ['loom', 27],
		['contrast', 40], ['contrast', 50], ['judgment', 65],
		['minimalism', 74], ['freedom', 75], ['closing', 83],
	] as const)('runs the same authored scenes and retained media in both languages at %s, %s seconds', (scene, seconds) => {
		const english = englishAt(seconds);
		const japanese = japaneseAt(seconds);
		expect(japanese.sequences).toEqual(english.sequences);
		for (const { picture } of [english, japanese]) {
			expect([...picture.querySelectorAll('[data-scene]')].map((node) => node.getAttribute('data-scene'))).toEqual([scene]);
		}
		const media = (picture: HTMLElement) => [...picture.querySelectorAll('img,video,audio')].map((node) => ({
			tag: node.tagName, src: node.getAttribute('src'), style: node.getAttribute('style'), muted: node.hasAttribute('muted'), loop: node.hasAttribute('loop'),
		}));
		expect(media(japanese.picture)).toEqual(media(english.picture));
		expect(japanese.picture.querySelector('audio')!.getAttribute('src')).toContain('assets/tps-and-ai/score.wav');
		if (scene === 'loom') {
			expect(japanese.picture.querySelector('[data-source-frame]')!.getAttribute('data-source-frame')).toBe(english.picture.querySelector('[data-source-frame]')!.getAttribute('data-source-frame'));
		}
	});

	it.each([
		{ scene: 'hook', seconds: 0, english: ['Jidoka', 'Free to Move On', 'STOP'], japanese: ['自働化', '次へ進む自由', '停止'] },
		{ scene: 'burden', seconds: 9, english: ['Bound to yesterday.'], japanese: ['昨日に縛られる。'] },
		{
			scene: 'house', seconds: 19,
			english: ['Toyota Production System', 'Best quality', 'Lowest cost · Shortest lead time', 'Jidoka', 'Stop at', 'abnormality', 'People', 'Kaizen', 'Just-in-Time', 'Only what', 'is needed', 'Standardized work · Heijunka', 'Stability'],
			japanese: ['トヨタ生産方式', '最高の品質', '最低のコスト・最短のリードタイム', '自働化', '異常で', '止まる', '人', '改善', 'ジャスト', 'インタイム', '必要なもの', 'だけ', '標準作業・平準化', '安定性'],
		},
		{ scene: 'loom', seconds: 36, english: ['Human wisdom, built in.'], japanese: ['人の知恵を、仕組みに。', 'にんべん＝人'] },
		{ scene: 'judgment', seconds: 65, english: ['Keep the judgment.', 'Solve', 'Human judgment', 'Preserve', 'Known rules', 'Protect', 'Simple checks', 'Clear evidence', 'Known rule', 'STOP'], japanese: ['判断を仕組みに残す。', '解く', '人の判断', '残す', '既知のルール', '守る', '単純なチェック', '明確な証拠', '停止'] },
		{ scene: 'minimalism', seconds: 74, english: ['Keep less.', 'Necessary behavior', 'Self-protection stays'], japanese: ['残すものを減らす。', '必要な振る舞い', '自らを守る仕組みは残す'] },
		{ scene: 'freedom', seconds: 75, english: ['Free to move on.'], japanese: ['次へ進む自由。'] },
		{ scene: 'closing', seconds: 83, english: ['Free to move on.', 'Idea and film from Terry'], japanese: ['次へ進む自由。', '発案・映像制作：Terry'] },
	])('shows the authored viewer wording for $scene through the selected language component', ({ scene, seconds, english, japanese }) => {
		const englishScene = englishAt(seconds).picture.querySelector(`[data-scene="${scene}"]`)!;
		const japaneseScene = japaneseAt(seconds).picture.querySelector(`[data-scene="${scene}"]`)!;
		english.forEach((text) => expect(englishScene.textContent).toContain(text));
		japanese.forEach((text) => expect(japaneseScene.textContent).toContain(text));
		english.forEach((text) => expect(japaneseScene.textContent).not.toContain(text));
		expect(englishScene.textContent).not.toMatch(/[\u3040-\u30ff\u3400-\u9fff]/u);
	});

	it.each([
		{ seconds: 40, state: 'watching', englishHeading: 'Watching…', japaneseHeading: '見張り続ける…', englishStatus: 'CHECKING', japaneseStatus: '確認中' },
		{ seconds: 50, state: 'stopped', englishHeading: 'Called by the stop.', japaneseHeading: '停止したら呼ばれる。', englishStatus: 'STOP', japaneseStatus: '停止' },
	])('keeps the visible $state screen and heading in the selected language', ({ seconds, state, englishHeading, japaneseHeading, englishStatus, japaneseStatus }) => {
		const english = englishAt(seconds).picture;
		const japanese = japaneseAt(seconds).picture;
		expect(english.querySelector('[data-scene="contrast"]')!.textContent).toContain(englishHeading);
		expect(japanese.querySelector('[data-scene="contrast"]')!.textContent).toContain(japaneseHeading);
		for (const [picture, text] of [[english, englishStatus], [japanese, japaneseStatus]] as const) {
			const painting = picture.querySelector<HTMLElement>(`[data-testid="paired-${state}"]`)!;
			expect(painting.style.opacity).toBe('1');
			expect(painting.textContent).toBe(text);
		}
	});

	it.each([
		[0, 'How do you know your organization is using AI well?', '組織がAIをうまく使えているか、 どうすればわかる？'],
		[9, 'Too often, software ties its creators down.', 'ソフトウェアは、しばしば 作り手を縛りつける。'],
		[19, 'TPS is the Toyota Production System.', 'TPSは、トヨタ生産方式。'],
		[27, 'Jidoka: automation with a human touch.', '自働化とは、 人の知恵を加えた自動化。'],
		[39, 'Instead of watching the loom—or watching your computer work…', '織機や、コンピューターの仕事を 見張り続ける代わりに…'],
		[51, 'Solve the problem. Preserve the judgment.', '問題を解く。 その判断を、仕組みに残す。'],
		[66, 'Keep as little as possible.', '残すものは、最小限に。'],
		[75, 'Build knowledge into the product.', '知識を、プロダクトに組み込む。'],
	] as const)('selects the incoming caption through each registered film at %s seconds', (seconds, english, japanese) => {
		for (const [picture, language, expected] of [[englishAt(seconds).picture, 'en', english], [japaneseAt(seconds).picture, 'ja', japanese]] as const) {
			const caption = picture.querySelector('[data-testid="film-caption"]')!;
			expect(caption.getAttribute('lang')).toBe(language);
			expect(normalized(caption.textContent)).toBe(expected);
		}
	});

	it('holds the localized closing credit with no caption through the last frame in both editions', () => {
		for (const seconds of [83, 85, 2579 / 30]) {
			for (const [picture, credit] of [[englishAt(seconds).picture, 'Idea and film from Terry'], [japaneseAt(seconds).picture, '発案・映像制作：Terry']] as const) {
				expect(picture.querySelector('[data-testid="film-caption"]')!.textContent).toBe('');
				expect(picture.querySelector('[data-testid="film-credits"]')!.textContent).toBe(credit);
			}
		}
	});
});
