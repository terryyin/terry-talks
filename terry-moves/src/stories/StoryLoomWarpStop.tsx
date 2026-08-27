import {Subtitle} from '../models/Subtitles';
import {WarpStopLoom} from '../parts/WarpStopLoom';
import {Story} from '../video_components/Story';

export const loomWarpStopSubtitles: Subtitle[] = [
	{
		leadingBlank: 0,
		duration: 4,
		text: '',
		actions: [
			{
				actor: 'stop-bar',
				actionType: 'oscillate',
				delta: [40, 0],
				persistUntilSubtitleId: 'break',
			},
		],
	},
	{
		id: 'break',
		leadingBlank: 0,
		duration: 4,
		text: '',
		actions: [
			{actor: 'warp', actionType: 'disappear', startDuration: 0.12},
			{actor: 'snapped-warp', actionType: 'appear', startDuration: 0.12},
			{actor: 'bar-sweeps', actionType: 'disappear', startDuration: 0.2},
			{
				actor: 'dropper',
				actionType: 'move',
				duration: 0.9,
				absolutePosition: [0, 72],
				offset: 0.15,
			},
			{
				actor: 'dropper-accent',
				actionType: 'appear',
				startDuration: 0.25,
				offset: 0.95,
			},
			{
				actor: 'dropper-accent',
				actionType: 'glow',
				duration: 1,
				offset: 1.1,
			},
		],
	},
];

export const StoryLoomWarpStop: React.FC = () => {
	return (
		<Story id="StoryLoomWarpStop" width={1280} height={720} subtitles={loomWarpStopSubtitles}>
			<WarpStopLoom />
		</Story>
	);
};
