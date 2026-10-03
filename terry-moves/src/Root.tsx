import { StoryProductDeveloper } from './stories/StoryProductDeveloper';
import { StoryFailureVsFailure } from './stories/StoryFailureVsFailure';
import { StoryBooleanParameters } from './stories/StoryBooleanParameters';
import { StoryBooleanReturns } from './stories/StoryBooleanReturns';
import { StoryLeSSComplete } from './stories/StoryLeSSComplete';
import { StoryScalingScrum } from './stories/StoryScalingScrum';
import { StoryWhyWhyLeSS } from './stories/StoryWhyWhyLeSS';
import { StoryTransparent } from './stories/StoryTransparent';
import { StoryGameOfLife } from './stories/StoryGameOfLife';
import { StoryBooleanData } from './stories/StoryBooleanData';
import { StoryInterationSprint } from './stories/StoryIternationSprint';
import { StorySimpleExample } from './stories/StorySimpleExample';
import { StoryLoomWarpStop } from './stories/StoryLoomWarpStop';
import { StoryLeSSInAction } from './stories/StoryLeSSInAction';
import { StoryImpactStoryboard } from './stories/StoryImpactStoryboard';
import { StoryImpactOneSplash } from './stories/StoryImpactOneSplash';
import { StoryImpactFilm, StoryImpactFilmZhHant } from './stories/StoryImpactFilm';
import { FeatureTeamsFilm } from './stories/FeatureTeamsFilm';
import { ProblemDecompositionFilm } from './stories/ProblemDecompositionFilm';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<StorySimpleExample />
			<StoryLoomWarpStop />
			<StoryFailureVsFailure />
			<StoryBooleanParameters />
			<StoryBooleanData />
			<StoryBooleanReturns />
			<StoryLeSSComplete />
			<StoryScalingScrum />
			<StoryInterationSprint />
			<StoryWhyWhyLeSS />
			<StoryProductDeveloper />
			<StoryTransparent />
			<StoryGameOfLife />
			<StoryLeSSInAction />
			<StoryImpactStoryboard />
			<StoryImpactOneSplash />
			<StoryImpactFilm />
			<StoryImpactFilmZhHant />
			<FeatureTeamsFilm />
			<ProblemDecompositionFilm />
		</>
	);
};
