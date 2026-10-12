import React from 'react';
import {AnimeEngineerScene, AnimeSceneProps} from './AnimeEngineerScene';
import {animeEngineerComposition} from './composition';
import {thoughtfulAnimeSceneScript} from './script';

export const AnimeEngineerThoughtful: React.FC<AnimeSceneProps> = ({script=thoughtfulAnimeSceneScript}) => <AnimeEngineerScene script={script}/>;

export const AnimeEngineerThoughtfulComposition: React.FC = () => animeEngineerComposition('AnimeEngineerThoughtful',AnimeEngineerThoughtful,thoughtfulAnimeSceneScript);
