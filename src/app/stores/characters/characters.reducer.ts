import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from './characters.actions';
import { initialCharactersState } from './characters.state';
import { Character, CharacterResponse } from 'src/app/shared/models/rick-and-morty-api';

export const charactersReducer = createReducer(
  initialCharactersState,
  on(CharacterActions.loadCharacters, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CharacterActions.loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    loading: false,
    characters: [...state.characters, ...[characters].flat()
      .map(m => convertCharacterResponseIntoCharacter(m))
      .filter(m => !state.characters.find(f => f.id === m.id))],
  })),
  on(CharacterActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
)

export function convertCharacterResponseIntoCharacter(characterResponse: CharacterResponse): Character {
  return {
    ...characterResponse,
    episode: characterResponse.episode.map(m => ({ id: Number(m.split('/').pop()), url: m })),
    location: { ...characterResponse.location, id: Number(characterResponse.location.url.split('/').pop()) },
  }
}