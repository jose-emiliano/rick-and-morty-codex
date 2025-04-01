import { LocalityResponse } from 'src/app/shared/models/rick-and-morty-api';
import { loadLocations, loadLocationsByIds, loadLocationsFailure, loadLocationsSuccess } from './locations.actions';

describe('Locations Actions', () => {
  it('loadLocations deve criar a action correta', () => {
    const action = loadLocations()
    expect(action.type).toBe('[Locations] Load Locations')
  })

  it('loadLocationsSuccess deve carregar corretamente', () => {
    const locations: LocalityResponse[] = [{
      id: 1,
      name: 'Earth',
      type: '',
      dimension: '',
      residents: [],
      url: '',
      created: ''
    }]

    const action = loadLocationsSuccess({ locations })
    expect(action.locations).toEqual(locations)
  })

  it('loadLocationsFailure deve retornar erro corretamente', () => {
    const action = loadLocationsFailure({ error: 'erro' })
    expect(action.error).toBe('erro')
  })

  it('loadLocationsByIds deve receber array de ids', () => {
    const action = loadLocationsByIds({ ids: [1, 2, 3] })
    expect(action.ids).toEqual([1, 2, 3])
  })
})
