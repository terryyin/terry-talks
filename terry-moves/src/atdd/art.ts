import { palette as seriesPalette } from '../storyImpact/scene';

// The series' warm paper and ink, with calmer diagram and status accents.
export const palette = {
	...seriesPalette,
	structure: '#376CAD',
	behavior: '#28855D',
	cellSky: '#D4E4F3',
	cellMint: '#D3E9DD',
} as const;
export const RED = '#CC5752';
export const WAIT = '#AC7E45';
export const TEAM_COLORS = ['#B396D3', '#75BCAF', '#E1A16C', '#DA96AD', '#E6C267'];
export const STROKE = { flow: 5.5, panel: 4.5, detail: 2.5, emphasis: 8 } as const;
export const SHADOW = { x: 5, y: 5, opacity: 0.55 } as const;
