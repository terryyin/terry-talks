// Traditional Chinese subtitles for the story-impact film. Only the captions
// are translated; the picture (labels, pills, title, end card) stays in
// English. The timeline is the English one, so every English caption needs a
// translation here (a spec checks this when captions change).

export const ZH_HANT_FONT_FAMILY = "'PingFang TC', 'Heiti TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif";

export const ZH_HANT_CAPTIONS: Record<string, string> = {
	"a software product is a space: what it does × how it's built.": '軟體產品是一個空間：它做什麼 × 它怎麼構成。',
	'It moves through Time. The backlog holds stories waiting their turn.': '它隨時間前進。待辦清單裡的故事排隊等候。',
	'A story is romantic: a wish for a better world.': '故事是浪漫的：一個讓世界更美好的願望。',
	"It's focused on customer value.": '它聚焦於客戶價值。',
	"It's fuzzy. It doesn't care about our boundaries.": '它很模糊，不在乎我們的邊界。',
	'It carries an impact we want in the world…': '它承載著我們想在世界上造成的影響……',
	'…and it makes an impact on the product: SPLAT!': '……也對產品造成影響：啪！',
	'Behavior gets messy. Structure wobbles.': '行為變得混亂，結構搖搖晃晃。',
	'Developers assimilate the splash…': '開發者把這片潑濺消化吸收……',
	'…into a coherent product, changed where it matters.': '……化為一致的產品，只在該改之處改變。',
	"A story's goal is an impact, with two values.": '故事的目標是造成影響，帶來兩種價值。',
	'Customer value: people feel the new behavior…': '客戶價值：人們感受到新的行為……',
	'…and bring new ideas. The backlog is reordered.': '……並帶來新點子。待辦清單重新排序。',
	'Option value, unseen by users: judgment spent on tests…': '選擇權價值，使用者看不見：判斷已花在測試上……',
	'…and on a structure that maps the domain.': '……也花在映射領域的結構上。',
	'The spent story goes to history. Available, but out of the way.': '用完的故事進入歷史。隨時可查，但不礙事。',
	'Ready for the next story.': '準備好迎接下一個故事。',
	'More stories come and go…': '更多故事來來去去……',
	'…and the product stays coherent. No scars.': '……產品始終保持一致。沒有傷疤。',
	'If a new idea fits the same domain…': '如果新點子屬於同一個領域……',
	'…so it comes cheap: the option pays off.': '……所以成本很低：選擇權兌現了。',
	'The product shows what is, not what was.': '產品呈現的是現在，而不是過去。',
	'One story touches many features…': '一個故事會觸及許多功能……',
	'…and one feature takes many layers working together.': '……而一個功能需要多個架構層協作。',
	'Story after story, value builds up. Not debt.': '一個又一個故事，累積的是價值，不是債務。',
};

// An untranslated caption falls back to English rather than going blank.
export const zhHantCaption = (caption: string): string => (caption === '' ? '' : (ZH_HANT_CAPTIONS[caption] ?? caption));
