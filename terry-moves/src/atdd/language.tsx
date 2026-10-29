import React, { createContext, useContext } from 'react';
import translation from '../../../ATDD/zh-Hant.json';
import { scenes } from './film';

export type ATDDLanguage = 'en' | 'zh-Hant';
const Language = createContext<ATDDLanguage>('en');

export const ATDDLanguageProvider: React.FC<{ language: ATDDLanguage; children: React.ReactNode }> = ({ language, children }) => <Language.Provider value={language}>{children}</Language.Provider>;
export const useATDDLanguage = () => useContext(Language);

const labels: Record<string, string> = translation.screenText;
export const screenText = (text: string, language: ATDDLanguage) => language === 'zh-Hant' ? labels[text] ?? text : text;

// Preserve numbers, symbols and authored SVG elements. Sheet rows have a
// separate optional star, so translate primitive children before joining them.
export const screenChildren = (children: React.ReactNode, language: ATDDLanguage): React.ReactNode => {
	if (typeof children === 'string') return screenText(children, language);
	if (Array.isArray(children)) return children.map((child) => screenChildren(child, language));
	return children;
};

export const ScreenText: React.FC<{ children: string }> = ({ children }) => <>{screenText(children, useATDDLanguage())}</>;

// The approved recording continues to own every caption window and visual cue.
// The language edition supplies only the text at the same scene/caption index.
export const captionText = (sceneIndex: number, original: string, language: ATDDLanguage) => {
	if (language === 'en' || !original) return original;
	const scene = scenes[sceneIndex];
	const captionIndex = scene.captions.findIndex(({ text }) => text === original);
	return translation.narration.find(({ sceneId }) => sceneId === scene.id)?.captions[captionIndex]?.text ?? original;
};

export const NARRATION_ZH_HANT = 'assets/atdd/narration-zh-hant.wav';
