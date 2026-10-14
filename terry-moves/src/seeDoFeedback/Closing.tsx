import React from 'react';
import { colors, Stage } from './Stage';

export const Closing: React.FC = () => <Stage chapter="SEE · DO · FEEDBACK">
	<h1 style={{ position: 'absolute', left: 72, top: 282, margin: 0, fontSize: 72, fontWeight: 600, lineHeight: 1.24, letterSpacing: -2 }}>AI helps us do.<br />We must still see.</h1>
	<div style={{ position: 'absolute', left: 76, top: 636, fontSize: 42, fontWeight: 500 }}>Film and idea from Terry</div>
	<div style={{ position: 'absolute', left: 76, top: 750, fontSize: 26, lineHeight: 1.5, fontWeight: 400, color: colors.muted }}>Inspired by Scott H. Young<br />See–Do–Feedback</div>
	<div style={{ position: 'absolute', left: 76, top: 918, fontSize: 22, fontWeight: 400, color: colors.muted }}>AI-generated narration</div>
</Stage>;
