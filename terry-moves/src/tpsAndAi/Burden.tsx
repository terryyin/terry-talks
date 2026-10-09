import React from 'react';
import { Art, Heading, Shot, useSeconds } from './Frame';
import { useFilmText } from './language';
export const BurdenPicture: React.FC = () => { const text = useFilmText(); return <>
	<Heading style={{ top: 122, fontSize: 76 }}>{text('burden')}</Heading>
	<Art file="constrained-by-what-they-built.png" style={{ left: 140, top: 222, width: 800, height: 600 }} />
</>; };
export const Burden: React.FC = () => <Shot seconds={useSeconds('burden')} id="burden"><BurdenPicture /></Shot>;
