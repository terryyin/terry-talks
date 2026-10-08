import React from 'react';
import { Heading, Shot, useSeconds } from './Frame';
import { PairedPainting } from './Contrast';
export const HookPicture: React.FC = () => <>
	<Heading style={{ top: 122 }}>Jidoka</Heading>
	<Heading style={{ top: 214, fontSize: 58 }}>Free to Move On</Heading>
	<PairedPainting state="stopped" style={{ top: 300 }} />
</>;
export const Hook: React.FC = () => <Shot seconds={useSeconds('hook')} id="hook"><HookPicture /></Shot>;
