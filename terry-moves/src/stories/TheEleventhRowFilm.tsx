import {Audio} from '@remotion/media';
import {Composition, Folder, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgentPatch} from '../pitfallsScopeRemake/AgentPatch';
import captions from '../pitfallsScopeRemake/captions.json';
import {ImportFailure} from '../pitfallsScopeRemake/ImportFailure';
import {ink} from '../pitfallsScopeRemake/ReviewLayout';
import {RewriteStory} from '../pitfallsScopeRemake/RewriteStory';
import {StoryAndPrompt} from '../pitfallsScopeRemake/StoryAndPrompt';

const NarrationCaptions = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const milliseconds = frame * 1000 / fps;
	const cue = captions.find(({startMs, endMs}) => milliseconds >= startMs && milliseconds < endMs);
	// The final spoken line stays visible on the closing panel.
	return cue && frame < 19.8 * fps ? <div style={{position: 'absolute', top: 1350, left: 92, right: 134, textAlign: 'center', font: '600 52px/1.18 Arial, sans-serif', textWrap: 'balance'}}>
		<span style={{display: 'inline-block', background: ink, color: 'white', borderRadius: 12, padding: '14px 25px'}}>{cue.text}</span>
	</div> : null;
};

const TheEleventhRow = () => {
	const {fps} = useVideoConfig();
	return <>
		<Audio name="Continuous narration" src={staticFile('assets/pitfalls-scope-remake/narration.wav')} premountFor={fps}/>
		<ImportFailure name="01 · A valid file gets rejected" from={0} durationInFrames={4.4 * fps} premountFor={fps} heading="The eleventh row"/>
		<StoryAndPrompt name="02 · The ticket and the prompt" from={4.4 * fps} durationInFrames={9.6 * fps} premountFor={fps} promptAt={6.5}/>
		<AgentPatch name="03 · The agent adds the check" from={14 * fps} durationInFrames={2.7 * fps} premountFor={fps} heading="The agent adds a check."/>
		<RewriteStory name="04 · Give the example a label" from={16.7 * fps} durationInFrames={7.3 * fps} premountFor={fps} limitsAt={3.1}/>
		<NarrationCaptions/>
	</>;
};

export const TheEleventhRowFilm = () => <>
	<Composition id="TheEleventhRowFilm" component={TheEleventhRow} width={1080} height={1920} fps={30} durationInFrames={720}/>
	<Folder name="The-Eleventh-Row-Scenes">
		<Composition id="EleventhRowImportFailure" component={ImportFailure} width={1080} height={1920} fps={30} durationInFrames={132} defaultProps={{heading: 'The eleventh row'}}/>
		<Composition id="EleventhRowStoryAndPrompt" component={StoryAndPrompt} width={1080} height={1920} fps={30} durationInFrames={288} defaultProps={{promptAt: 6.5}}/>
		<Composition id="EleventhRowAgentPatch" component={AgentPatch} width={1080} height={1920} fps={30} durationInFrames={81} defaultProps={{heading: 'The agent adds a check.'}}/>
		<Composition id="EleventhRowRewriteStory" component={RewriteStory} width={1080} height={1920} fps={30} durationInFrames={219} defaultProps={{limitsAt: 3.1}}/>
	</Folder>
</>;
