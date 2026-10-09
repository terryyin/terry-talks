import React from 'react';
import { Heading, Shot, useSeconds } from './Frame';
import { PairedPainting } from './Contrast';
import { useFilmText } from './language';
export const HookPicture: React.FC = () => { const text = useFilmText(); return <>
	<Heading style={{ top: 122 }}>{text('jidoka')}</Heading>
	<Heading style={{ top: 214, fontSize: 58 }}>{text('opening')}</Heading>
	<PairedPainting state="stopped" style={{ top: 300 }} />
</>; };
export const Hook: React.FC = () => <Shot seconds={useSeconds('hook')} id="hook"><HookPicture /></Shot>;
