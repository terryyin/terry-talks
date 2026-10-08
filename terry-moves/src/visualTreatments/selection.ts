// What the review record means for continuing a treatment: either the exact
// registered version Terry selected, or no selection (pending or revise).
// Never falls back to another candidate or to the newest version.
import { choiceLocation, TreatmentChoice, treatmentChoice, UnselectedChoice } from './choice';
import { TreatmentEntry, treatmentVersions } from './versions';

export type Selection =
	| { state: 'selected'; entry: TreatmentEntry }
	| { state: 'unselected'; choice: UnselectedChoice };

const versionOf = (id: string, registry: readonly TreatmentEntry[]): TreatmentEntry => {
	const entry = registry.find((candidate) => candidate.id === id);
	if (entry) return entry;
	throw new Error(`Treatment choice in ${choiceLocation} names version ${id}, which is not registered. `
		+ `Registered: ${registry.map((candidate) => candidate.id).join(', ')}. Correct the version id in ${choiceLocation}.`);
};

export const resolveChoice = (
	choice: TreatmentChoice = treatmentChoice,
	registry: readonly TreatmentEntry[] = treatmentVersions,
): Selection => {
	if (choice.decision === 'selected') return { state: 'selected', entry: versionOf(choice.version, registry) };
	if (choice.decision === 'revise') {
		const { timeline } = versionOf(choice.version, registry);
		const known = timeline.beats.map((b) => b.name);
		const unknown = choice.beats.filter((name) => !known.includes(name));
		if (choice.beats.length === 0 || unknown.length > 0) {
			throw new Error(`Treatment choice in ${choiceLocation} asks to revise ${choice.version} at beat(s) ${unknown.join(', ') || '(none named)'}, `
				+ `which it does not have. Its beats: ${known.join(', ')}.`);
		}
	}
	return { state: 'unselected', choice };
};
