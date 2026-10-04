// Export the actual caption spans; narration follows the authored film's
// timeline even when an animation beat or its reading time changes.
import { fullFilm } from '../terry-moves/src/storyImpact/fullFilm';
import { FPS } from '../terry-moves/src/storyImpact/film';
import { zhHantCaption } from '../terry-moves/src/storyImpact/zhHant';

const spans: { name: string; text: string; zhHant: string; from: number; to: number }[] = [];
for (const b of fullFilm.beats) {
	if (!b.caption) continue;
	const range = fullFilm.beatRange(b.name);
	let end = range.from + range.durationInFrames;
	const nextCaption = fullFilm.beats.slice(fullFilm.beats.indexOf(b) + 1).find((next) => next.caption !== undefined);
	if (nextCaption) end = fullFilm.beatRange(nextCaption.name).from;
	spans.push({
		name: b.name,
		text: b.caption.replace(/×/g, 'by').replace(/…/g, '').trim(),
		zhHant: zhHantCaption(b.caption).replace(/……/g, '').replace(/×/g, '乘上'),
		from: (range.from + Math.round((b.pause ?? 0) * FPS)) / FPS,
		to: end / FPS,
	});
}
const finale = fullFilm.beatRange('finale');
spans.push({
	name: 'finale',
	text: 'Stories should be romantic. Products should not.',
	zhHant: '故事應該浪漫。產品不應該。',
	from: finale.from / FPS + 0.6,
	to: (finale.from + finale.durationInFrames) / FPS,
});
process.stdout.write(JSON.stringify({ fps: FPS, durationInFrames: fullFilm.durationInFrames, spans }));
