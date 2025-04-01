import { createAction, props } from '@ngrx/store';
import { EpisodeResponse } from 'src/app/shared/models/rick-and-morty-api';

export const loadEpisodes = createAction('[Episodes] Load Episodes')

export const loadEpisodesSuccess = createAction(
  '[Episodes] Load Episodes Success',
  props<{ episodes: EpisodeResponse[] }>()
)

export const loadEpisodesFailure = createAction(
  '[Episodes] Load Episodes Failure',
  props<{ error: string }>()
)

export const loadEpisodesByIds = createAction(
  '[Episodes] Load Episodes By Ids',
  props<{ ids: number[] }>()
)
