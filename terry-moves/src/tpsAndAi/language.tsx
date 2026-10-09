import React, { createContext, useContext } from 'react';
import { sceneById } from './film';

export type FilmLanguage = 'en' | 'ja';
const FilmLanguageContext = createContext<FilmLanguage>('en');
export const useFilmLanguage = (): FilmLanguage => useContext(FilmLanguageContext);
export const JA_FONT_FAMILY = "'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', Meiryo, sans-serif";
export const JA_SERIF_FAMILY = "'Hiragino Mincho ProN', 'Yu Mincho', serif";

/** Viewer wording is paired here; scene geometry and choreography stay shared. */
const screenText = {
	jidoka: { en: 'Jidoka', ja: '自働化' },
	opening: { en: 'Free to Move On', ja: '次へ進む自由' },
	burden: { en: 'Bound to yesterday.', ja: '昨日に縛られる。' },
	house: { en: 'Toyota Production System', ja: 'トヨタ生産方式' },
	quality: { en: 'Best quality', ja: '最高の品質' },
	costAndLeadTime: { en: 'Lowest cost · Shortest lead time', ja: '最低のコスト・最短のリードタイム' },
	stopAt: { en: 'Stop at', ja: '異常で' },
	abnormality: { en: 'abnormality', ja: '止まる' },
	people: { en: 'People', ja: '人' },
	kaizen: { en: 'Kaizen', ja: '改善' },
	justInTime: { en: 'Just-in-Time', ja: 'ジャスト\nインタイム' },
	onlyWhat: { en: 'Only what', ja: '必要なもの' },
	isNeeded: { en: 'is needed', ja: 'だけ' },
	standardizedWork: { en: 'Standardized work · Heijunka', ja: '標準作業・平準化' },
	stability: { en: 'Stability', ja: '安定性' },
	loom: { en: 'Human wisdom, built in.', ja: '人の知恵を、仕組みに。' },
	radical: { en: 'ninben = person', ja: 'にんべん＝人' },
	checking: { en: 'CHECKING', ja: '確認中' },
	stop: { en: 'STOP', ja: '停止' },
	watching: { en: 'Watching…', ja: '見張り続ける…' },
	called: { en: 'Called by the stop.', ja: '停止したら呼ばれる。' },
	judgment: { en: 'Keep the judgment.', ja: '判断を仕組みに残す。' },
	solve: { en: 'Solve', ja: '解く' },
	humanJudgment: { en: 'Human judgment', ja: '人の判断' },
	preserve: { en: 'Preserve', ja: '残す' },
	knownRules: { en: 'Known rules', ja: '既知のルール' },
	protect: { en: 'Protect', ja: '守る' },
	simpleChecks: { en: 'Simple checks', ja: '単純なチェック' },
	clearEvidence: { en: 'Clear evidence', ja: '明確な証拠' },
	knownRule: { en: 'Known rule', ja: '既知のルール' },
	minimalism: { en: 'Keep less.', ja: '残すものを減らす。' },
	necessaryBehavior: { en: 'Necessary behavior', ja: '必要な振る舞い' },
	selfProtection: { en: 'Self-protection stays', ja: '自らを守る仕組みは残す' },
	freedom: { en: 'Free to move on.', ja: '次へ進む自由。' },
	credit: { en: sceneById('closing').creditLines![0], ja: '発案・映像制作：Terry' },
} as const;

export const useFilmText = () => {
	const language = useFilmLanguage();
	return (key: keyof typeof screenText): string => screenText[key][language];
};

export const FilmLanguageProvider: React.FC<React.PropsWithChildren<{ language: FilmLanguage }>> = ({ language, children }) => <FilmLanguageContext.Provider value={language}>{children}</FilmLanguageContext.Provider>;
