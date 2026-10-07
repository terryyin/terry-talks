import { TEAM_COLORS } from './art';
import { PERSON_FOOTPRINT } from './pieces';

// Identity belongs to the story. Authored scale changes the occupied space,
// including the animated hands, rather than just stretching a fixed landmark.
export const crew = (scales: number[], ids = TEAM_COLORS.map((_, id) => id)) => {
	const people = ids.map((id) => ({ id, scale: scales[id], width: (PERSON_FOOTPRINT.right - PERSON_FOOTPRINT.left) * scales[id] }));
	const gap = 8;
	const width = people.reduce((total, person) => total + person.width, 0) + gap * (people.length - 1);
	let left = -width / 2;
	return {
		width,
		top: Math.min(...people.map(({ scale }) => PERSON_FOOTPRINT.top * scale)),
		bottom: Math.max(...people.map(({ scale }) => PERSON_FOOTPRINT.bottom * scale)),
		people: people.map((person) => {
			const offset = left + person.width / 2;
			left += person.width + gap;
			return { ...person, offset };
		}),
	};
};
