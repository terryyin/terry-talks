import React from 'react';
import { Art, Heading, Shot, useSeconds } from './Frame';
export const FreedomPicture: React.FC = () => <><Heading>Free to move on.</Heading><Art file="jidoka-frees-software-team.png" style={{ left: 40, top: 184, width: 1000, height: 666.67 }} /></>;
export const Freedom: React.FC = () => <Shot seconds={useSeconds('freedom')} id="freedom"><FreedomPicture /></Shot>;
