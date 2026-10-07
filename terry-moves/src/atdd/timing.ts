import { Easing } from 'remotion';
import { between } from '../storyImpact/motion';
import { scenes } from './film';

const ease = Easing.inOut(Easing.cubic);
export const move = (seconds: number, from: number, duration = 0.7) => between(seconds, from, from + duration, ease);
export const cue = (scene: number, caption: number, word: string) => scenes[scene].captions[caption].wordCues[word] ?? scenes[scene].captions[caption].speechStart;
