import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import captions from '../../../AI Augmented Development Pitfalls/02-film-captions.json';

export const NegationCaptions: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const milliseconds = frame / fps * 1000;
	const active = captions.find(({startMs, endMs}) => milliseconds >= startMs && milliseconds < endMs);
	const hasPrimaryText = frame < 2.5 * fps || frame >= 19 * fps;
	return active && !hasPrimaryText ? <div data-negation-caption style={{position: 'absolute', left: 90, right: 180, top: 1300, padding: '14px 22px', borderRadius: 10, background: '#10232de8', color: '#fffefa', fontFamily: 'PitfallsPoppins, sans-serif', fontSize: 46, lineHeight: 1.22, fontWeight: 500, textAlign: 'center', textWrap: 'balance', whiteSpace: 'pre-line', boxShadow: '0 7px 25px #071b2c30'}}>{active.text}</div>
		: null;
};
