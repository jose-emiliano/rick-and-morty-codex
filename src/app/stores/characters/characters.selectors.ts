import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState } from './characters.state';

export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectAllCharacters = createSelector(
  selectCharactersState,
  (state) => state.characters
)

export const selectAllCharacterById = (id: number) => createSelector(
  selectCharactersState,
  (state) => state.characters.find(f => f.id === id)
)

export const selectAllCharacterByIds = (ids: number[]) => createSelector(
  selectCharactersState,
  (state) => state.characters.filter(f => ids.includes(f.id))
)

export const selectCharactersLoading = createSelector(
  selectCharactersState,
  (state) => state.loading
)

export const selectCharactersError = createSelector(
  selectCharactersState,
  (state) => state.error
)
