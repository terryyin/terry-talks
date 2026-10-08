// Japanese translations accompany the English film's captions on its existing
// timeline. Keep them concise enough for one smaller line beneath the English.
export const JA_FONT_FAMILY = "'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Noto Sans JP', Meiryo, sans-serif";

export const JA_CAPTIONS: Record<string, string> = {
	"a software product is a space: what it does × how it's built.": 'ソフトウェア製品は空間：何をするか × どう作られているか。',
	'It moves through Time. The backlog holds stories waiting their turn.': '製品は時間とともに進み、バックログではストーリーが順番を待つ。',
	'A story is romantic: a wish for a better world.': 'ストーリーはロマンチック。よりよい世界への願い。',
	"It's focused on customer value.": '顧客価値に焦点を当てる。',
	"It's fuzzy. It doesn't care about our boundaries.": '曖昧で、私たちの境界にはおかまいなし。',
	'It carries an impact we want in the world…': '世界にもたらしたい変化を抱えて…',
	'…and it makes an impact on the product: SPLAT!': '…製品にも衝撃を与える。バシャッ！',
	'Behavior gets messy. Structure wobbles.': '振る舞いは乱れ、構造は揺らぐ。',
	'Developers assimilate the splash…': '開発者はこの飛び散った変化を取り込み…',
	'…into a coherent product, changed where it matters.': '…必要なところを変え、一貫した製品へと整える。',
	"A story's goal is an impact, with two values.": 'ストーリーの目標は、二つの価値を生む変化。',
	'Customer value: people feel the new behavior…': '顧客価値：人々が新しい振る舞いを実感し…',
	'…and bring new ideas. The backlog is reordered.': '…新しいアイデアをもたらし、バックログの順序が変わる。',
	// "Option" uses the financial right-without-obligation metaphor.
	'Option value, unseen by users: judgment spent on tests…': '利用者には見えないオプション価値：判断をテストに込め…',
	'…and on a structure that maps the domain.': '…ドメインを表す構造にも込める。',
	'The spent story goes to history. Available, but out of the way.': '役目を終えたストーリーは履歴へ。参照でき、邪魔にはならない。',
	'Ready for the next story.': '次のストーリーを迎える準備ができた。',
	'More stories come and go…': 'さらにストーリーがやって来ては去り…',
	'…and the product stays coherent. No scars.': '…製品は一貫性を保つ。傷跡は残らない。',
	'If a new idea fits the same domain…': '新しいアイデアが同じドメインに収まるなら…',
	'…so it comes cheap: the option pays off.': '…低コストで実現できる。オプションの価値が実を結ぶ。',
	'The product shows what is, not what was.': '製品が示すのは、過去ではなく現在。',
	'One story touches many features…': '一つのストーリーが多くの機能に関わり…',
	'…and one feature takes many layers working together.': '…一つの機能は、多くの層の連携で成り立つ。',
	'Story after story, value builds up. Not debt.': 'ストーリーを重ね、負債ではなく価値が積み上がる。',
};

// A missing translation must not duplicate the English on the smaller line.
export const jaCaption = (caption: string): string => JA_CAPTIONS[caption] ?? '';
