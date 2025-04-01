import { loadCharactersFailure, loadCharactersSuccess } from './characters.actions';
import { charactersReducer } from './characters.reducer';
import { initialCharactersState } from './characters.state';
import { CharacterResponse } from 'src/app/shared/models/rick-and-morty-api';

describe('Characters Reducer', () => {
  it('deve retornar o estado inicial por padrão', () => {
    const action = { type: 'UNKNOWN' } as any
    const state = charactersReducer(undefined, action)
    expect(state).toEqual(initialCharactersState)
  })

  it('deve popular characters no sucesso do load', () => {
    const response: CharacterResponse = {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel', url: 'https://rickandmortyapi.com/api/location/20' },
      image: '',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: '',
      created: '',
      type: '',
    }

    const action = loadCharactersSuccess({ characters: [response] })
    const state = charactersReducer(initialCharactersState, action)

    expect(state.loading).toBeFalse()
    expect(state.characters.length).toBe(1)
    expect(state.characters[0].id).toBe(1)
    expect(state.characters[0].location.id).toBe(20)
  })

  it('deve definir erro ao falhar no load', () => {
    const action = loadCharactersFailure({ error: 'Erro de teste' })
    const state = charactersReducer(initialCharactersState, action)
    expect(state.loading).toBeFalse()
    expect(state.error).toBe('Erro de teste')
  })
})
