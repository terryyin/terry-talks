// When things happen, in seconds into Bas's clip, aligned to his narration
// (transcript timestamps) and checked against the real clip.

export const CLIP_SECONDS = 113.5;

export const CUE = {
	// 0:00–0:29 component teams
	ballIn: 0.5,
	melt: 6.5,
	ourStandards: 8.5,
	messFrom: 15,
	messTo: 21.5,
	ourWay: 18.5,
	leaveFrom: 22.6,
	leaveTo: 26,
	gasp: 26.5,
	sheetIn: 28.2,
	sheetOut: 29.1,
	// 0:29–0:54 feature teams
	feature: 29,
	teamsIn: 30,
	dive: 33.4,
	splash: 34.2,
	finish: 36.6,
	overlapLabel: 37.5,
	testsTag: 44.5,
	noTestsTag: 50,
	// 0:54–1:03 the conversation
	step: 53,
	hey: 54,
	tests: 58,
	reply: 61.2,
	zap: 60.3,
	// 1:03–1:20 agreeing on shared practices
	facilitator: 63.4,
	painful: 63,
	agree: 68,
	card: 66.2,
	items: [69, 72, 75],
	repaint: 77.5,
	pulse: 80.5,
	// 1:26–1:35 the warning: a branch, not the ending
	neglectFrom: 86,
	neglectTo: 94.5,
	rewind: 95.2,
	// 1:35–end: facilitated, standards rise
	stories: [100.2, 102.9, 105.4],
	coherent: 108,
	joy: 109,
} as const;
