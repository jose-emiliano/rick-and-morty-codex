import { loadLocations, loadLocationsFailure, loadLocationsSuccess } from './locations.actions';
import { locationsReducer } from './locations.reducer';
import { initialLocationsState } from './locations.state';
import { LocalityResponse } from 'src/app/shared/models/rick-and-morty-api';

describe('Locations Reducer', () => {
  it('deve retornar o estado inicial por padrão', () => {
    const action = { type: 'UNKNOWN' } as any
    const state = locationsReducer(undefined, action)
    expect(state).toEqual(initialLocationsState)
  })

  it('deve definir loading true ao carregar locations', () => {
    const action = loadLocations()
    const state = locationsReducer(initialLocationsState, action)
    expect(state.loading).toBeTrue()
    expect(state.error).toBeNull()
  })

  it('deve popular locations no sucesso do load', () => {
    const response: LocalityResponse = {
      id: 1,
      name: 'Earth',
      type: '',
      dimension: '',
      residents: ['https://rickandmortyapi.com/api/character/1'],
      url: '',
      created: ''
    }

    const action = loadLocationsSuccess({ locations: [response] })
    const state = locationsReducer(initialLocationsState, action)

    expect(state.loading).toBeFalse()
    expect(state.locations.length).toBe(1)
    expect(state.locations[0].id).toBe(1)
    expect(state.locations[0].residents[0].id).toBe(1)
  })

  it('deve tratar erro ao falhar no load', () => {
    const action = loadLocationsFailure({ error: 'deu ruim' })
    const state = locationsReducer(initialLocationsState, action)
    expect(state.loading).toBeFalse()
    expect(state.error).toBe('deu ruim')
  })
})
