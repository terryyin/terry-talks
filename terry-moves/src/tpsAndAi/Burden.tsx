import React from 'react';
import { Art, Heading, Shot, useSeconds } from './Frame';
export const BurdenPicture: React.FC = () => <>
	<Heading style={{ top: 122, fontSize: 76 }}>Bound to yesterday.</Heading>
	<Art file="constrained-by-what-they-built.png" style={{ left: 140, top: 222, width: 800, height: 600 }} />
</>;
export const Burden: React.FC = () => <Shot seconds={useSeconds('burden')} id="burden"><BurdenPicture /></Shot>;
