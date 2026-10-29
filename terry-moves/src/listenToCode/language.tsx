import React, {createContext, useContext} from 'react';

export type ListenLanguage = 'en' | 'zh-Hant';
const Language = createContext<ListenLanguage>('en');

export const ListenLanguageProvider: React.FC<{
	readonly language: ListenLanguage;
	readonly children: React.ReactNode;
}> = ({language, children}) => <Language.Provider value={language}>{children}</Language.Provider>;

export const useListenLanguage = () => useContext(Language);
export const traditionalChineseFont = "'ListenNotoSansTC', sans-serif";
