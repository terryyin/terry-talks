import React from 'react';
import { FreedomPicture } from './Freedom';
import { Shot, useSeconds } from './Frame';
import { sceneById } from './film';
export const ClosingPicture: React.FC = () => <><FreedomPicture /><div data-testid="film-credits" style={{ position: 'absolute', left: 64, right: 64, top: 898, fontSize: 56, lineHeight: 1.2, textAlign: 'center' }}>{sceneById('closing').creditLines![0]}</div></>;
export const Closing: React.FC = () => <Shot seconds={useSeconds('closing')} id="closing"><ClosingPicture /></Shot>;
