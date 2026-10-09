import React, { createContext, useContext } from 'react';
import { sceneById } from './film';

export type FilmLanguage = 'en' | 'ja' | 'zh-Hant' | 'th';
const FilmLanguageContext = createContext<FilmLanguage>('en');
export const useFilmLanguage = (): FilmLanguage => useContext(FilmLanguageContext);
export const JA_FONT_FAMILY = "'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', Meiryo, sans-serif";
export const ZH_HANT_FONT_FAMILY = "'Heiti TC', 'PingFang TC', 'Noto Sans TC', sans-serif";
export const ZH_HANT_SERIF_FAMILY = "'Songti TC', 'Noto Serif TC', serif";
export const JA_SERIF_FAMILY = "'Hiragino Mincho ProN', 'Yu Mincho', serif";

const localizedFonts = {
	ja: { sans: JA_FONT_FAMILY, serif: JA_SERIF_FAMILY },
	'zh-Hant': { sans: ZH_HANT_FONT_FAMILY, serif: ZH_HANT_SERIF_FAMILY },
	th: { sans: "Thonburi, 'Noto Sans Thai', sans-serif", serif: "Sathu, Thonburi, 'Noto Serif Thai', serif" },
};
/** English keeps each scene's original typography; translated text uses its locale's pair. */
export const useLocalizedFilmFonts = () => {
	const language = useFilmLanguage();
	return language === 'en' ? undefined : localizedFonts[language];
};

/** Viewer wording is kept together here; scene geometry and choreography stay shared. */
const screenText = {
	jidoka: { en: 'Jidoka', ja: '自働化', 'zh-Hant': '自働化', th: "Jidoka" },
	opening: { en: 'Free to Move On', ja: '次へ進む自由', 'zh-Hant': '自由前進', th: "อิสระที่จะไปต่อ" },
	burden: { en: 'Bound to yesterday.', ja: '昨日に縛られる。', 'zh-Hant': '被昨天綁住。', th: "ผูกมัดกับเมื่อวาน" },
	house: { en: 'Toyota Production System', ja: 'トヨタ生産方式', 'zh-Hant': '豐田生產方式', th: "ระบบการผลิตโตโยต้า" },
	quality: { en: 'Best quality', ja: '最高の品質', 'zh-Hant': '最佳品質', th: "คุณภาพสูงสุด" },
	costAndLeadTime: { en: 'Lowest cost · Shortest lead time', ja: '最低のコスト・最短のリードタイム', 'zh-Hant': '最低成本・最短前置時間', th: "ต้นทุนต่ำสุด · เวลานำสั้นสุด" },
	stopAt: { en: 'Stop at', ja: '異常で', 'zh-Hant': '遇到異常', th: "หยุดเมื่อ" },
	abnormality: { en: 'abnormality', ja: '止まる', 'zh-Hant': '就停止', th: "ผิดปกติ" },
	people: { en: 'People', ja: '人', 'zh-Hant': '人', th: "คน" },
	kaizen: { en: 'Kaizen', ja: '改善', 'zh-Hant': '改善', th: "ปรับปรุง" },
	justInTime: { en: 'Just-in-Time', ja: 'ジャスト\nインタイム', 'zh-Hant': '即時生產', th: "Just-in-Time" },
	onlyWhat: { en: 'Only what', ja: '必要なもの', 'zh-Hant': '只生產', th: "ผลิตเฉพาะ" },
	isNeeded: { en: 'is needed', ja: 'だけ', 'zh-Hant': '需要的東西', th: "ที่จำเป็น" },
	standardizedWork: { en: 'Standardized work · Heijunka', ja: '標準作業・平準化', 'zh-Hant': '標準作業・平準化', th: "งานมาตรฐาน · ปรับระดับการผลิต" },
	stability: { en: 'Stability', ja: '安定性', 'zh-Hant': '穩定性', th: "เสถียรภาพ" },
	loom: { en: 'Human wisdom, built in.', ja: '人の知恵を、仕組みに。', 'zh-Hant': '把人的智慧融入機制。', th: "ฝังปัญญาของคนไว้" },
	radical: { en: 'ninben = person', ja: 'にんべん＝人', 'zh-Hant': '人字旁＝人', th: "亻 = คน" },
	checking: { en: 'CHECKING', ja: '確認中', 'zh-Hant': '檢查中', th: "ตรวจสอบ" },
	stop: { en: 'STOP', ja: '停止', 'zh-Hant': '停止', th: "หยุด" },
	watching: { en: 'Watching…', ja: '見張り続ける…', 'zh-Hant': '一直盯著……', th: "เฝ้าดู…" },
	called: { en: 'Called by the stop.', ja: '停止したら呼ばれる。', 'zh-Hant': '停止時，再呼喚你。', th: "หยุดแล้วเรียกคุณ" },
	judgment: { en: 'Keep the judgment.', ja: '判断を仕組みに残す。', 'zh-Hant': '把判斷留在機制裡。', th: "เก็บวิจารณญาณไว้" },
	solve: { en: 'Solve', ja: '解く', 'zh-Hant': '解決', th: "แก้" },
	humanJudgment: { en: 'Human judgment', ja: '人の判断', 'zh-Hant': '人的判斷', th: "ดุลยพินิจของคน" },
	preserve: { en: 'Preserve', ja: '残す', 'zh-Hant': '保留', th: "เก็บไว้" },
	knownRules: { en: 'Known rules', ja: '既知のルール', 'zh-Hant': '已知規則', th: "กฎที่รู้แล้ว" },
	protect: { en: 'Protect', ja: '守る', 'zh-Hant': '保護', th: "ป้องกัน" },
	simpleChecks: { en: 'Simple checks', ja: '単純なチェック', 'zh-Hant': '簡單檢查', th: "ตรวจแบบง่าย" },
	clearEvidence: { en: 'Clear evidence', ja: '明確な証拠', 'zh-Hant': '清楚證據', th: "หลักฐานชัดเจน" },
	knownRule: { en: 'Known rule', ja: '既知のルール', 'zh-Hant': '已知規則', th: "กฎที่รู้แล้ว" },
	minimalism: { en: 'Keep less.', ja: '残すものを減らす。', 'zh-Hant': '只留必要的。', th: "เหลือให้น้อย" },
	necessaryBehavior: { en: 'Necessary behavior', ja: '必要な振る舞い', 'zh-Hant': '必要行為', th: "การทำงานจำเป็น" },
	selfProtection: { en: 'Self-protection stays', ja: '自らを守る仕組みは残す', 'zh-Hant': '保留自我保護機制', th: "คงกลไกป้องกันตัวเอง" },
	freedom: { en: 'Free to move on.', ja: '次へ進む自由。', 'zh-Hant': '自由前進。', th: "อิสระที่จะไปต่อ" },
	credit: { en: sceneById('closing').creditLines![0], ja: '発案・映像制作：Terry', 'zh-Hant': '發想與影片製作：Terry', th: "แนวคิดและภาพยนตร์: Terry" },
} as const;

export const useFilmText = () => {
	const language = useFilmLanguage();
	return (key: keyof typeof screenText): string => screenText[key][language];
};

export const FilmLanguageProvider: React.FC<React.PropsWithChildren<{ language: FilmLanguage }>> = ({ language, children }) => <FilmLanguageContext.Provider value={language}>{children}</FilmLanguageContext.Provider>;
