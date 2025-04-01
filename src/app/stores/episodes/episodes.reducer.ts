import { createReducer, on } from '@ngrx/store';
import * as EpisodeActions from './episodes.actions';
import { initialEpisodesState } from './episodes.state';
import { Episode, EpisodeResponse } from 'src/app/shared/models/rick-and-morty-api';

export const EpisodesReducer = createReducer(
  initialEpisodesState,
  on(EpisodeActions.loadEpisodes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EpisodeActions.loadEpisodesSuccess, (state, { episodes }) => ({
    ...state,
    loading: false,
    episodes: [...state.episodes, ...[episodes].flat()
      .map(m => convertEpisodeResponseIntoEpisode(m))
      .filter(f => !state.episodes.map(m => m.id).includes(f.id))],
  })),
  on(EpisodeActions.loadEpisodesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
)

export function convertEpisodeResponseIntoEpisode(episodeResponse: EpisodeResponse): Episode {
  return {
    ...episodeResponse,
    characters: episodeResponse.characters.map(character => ({ id: Number(character.split('/').pop()), url: character }))
  }
}