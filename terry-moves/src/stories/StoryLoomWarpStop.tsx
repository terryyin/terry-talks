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
	{id: 'break', leadingBlank: 0, duration: 2, text: ''},
];

export const StoryLoomWarpStop: React.FC = () => {
	return (
		<Story id="StoryLoomWarpStop" width={1280} height={720} subtitles={loomWarpStopSubtitles}>
			<WarpStopLoom />
		</Story>
	);
};
