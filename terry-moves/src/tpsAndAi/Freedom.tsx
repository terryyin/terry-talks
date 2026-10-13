import React from 'react';
import { Art, Heading, Shot, typePoseStyle, useSeconds } from './Frame';
import { useFilmLanguage, useFilmText } from './language';
import { sceneById } from './film';
import { englishFreedomAt } from './englishDirection';
export const FreedomPicture: React.FC<{ seconds?: number }> = ({ seconds = sceneById('closing').start }) => { const text = useFilmText(); const pose = useFilmLanguage() === 'en' ? englishFreedomAt(seconds, text) : undefined; return <><Heading style={typePoseStyle(pose)}>{pose?.lines[0] ?? text('freedom')}</Heading><Art file="jidoka-frees-software-team.png" style={{ left: 40, top: 184, width: 1000, height: 666.67 }} /></>; };
export const Freedom: React.FC = () => { const seconds = useSeconds('freedom'); return <Shot seconds={seconds} id="freedom"><FreedomPicture seconds={seconds} /></Shot>; };
