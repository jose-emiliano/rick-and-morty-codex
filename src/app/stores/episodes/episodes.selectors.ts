import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EpisodesState } from './episodes.state';

export const selectEpisodesState = createFeatureSelector<EpisodesState>('episodes');

export const selectAllEpisodes = createSelector(
  selectEpisodesState,
  (state) => state.episodes
)

export const selectAllEpisodeById = (id: number) => createSelector(
  selectEpisodesState,
  (state) => state.episodes.find(f => f.id === id)
)

export const selectEpisodesLoading = createSelector(
  selectEpisodesState,
  (state) => state.loading
)

export const selectEpisodesError = createSelector(
  selectEpisodesState,
  (state) => state.error
)
