import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import captions from '../../../AI Augmented Development Pitfalls/01-film-captions.json';

export const ScopeCaptions: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const milliseconds = frame / fps * 1000;
	const active = captions.find(({startMs, endMs}) => milliseconds >= startMs && milliseconds < endMs);
	return <>
		{active ? <div data-scope-caption style={{position: 'absolute', left: 90, right: 160, bottom: 215, padding: '21px 28px', borderRadius: 10, background: '#10232de8', color: '#fffefa', fontFamily: 'PitfallsPoppins, sans-serif', fontSize: 49, lineHeight: 1.22, fontWeight: 500, textAlign: 'center', boxShadow: '0 7px 25px #071b2c30'}}>{active.text}</div> : null}
		<div style={{position: 'absolute', left: 90, bottom: 150, color: '#f4f4edd9', fontFamily: 'PitfallsPoppins, sans-serif', fontSize: 25, letterSpacing: .6}}>AI-generated scenes &amp; voices</div>
	</>;
};
