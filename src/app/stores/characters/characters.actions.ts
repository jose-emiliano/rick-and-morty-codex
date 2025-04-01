import { createAction, props } from '@ngrx/store';
import { CharacterResponse } from 'src/app/shared/models/rick-and-morty-api';

export const loadCharacters = createAction('[Characters] Load Characters')

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ characters: CharacterResponse[] }>()
)

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: string }>()
)

export const loadCharactersByIds = createAction(
  '[Characters] Load Characters By Ids',
  props<{ ids: number[] }>()
)
