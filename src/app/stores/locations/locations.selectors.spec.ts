import { selectAllLocationById, selectAllLocations, selectLocationsError, selectLocationsLoading } from './locations.selectors';
import { LocationsState } from './locations.state';

const mockState: LocationsState = {
  locations: [
    {
      id: 1,
      name: 'Earth',
      type: 'Planet',
      dimension: 'C-137',
      residents: [{ id: 1, url: 'https://rickandmortyapi.com/api/character/1' }],
      url: '',
      created: ''
    },
    {
      id: 2,
      name: 'Gazorpazorp',
      type: '',
      dimension: '',
      residents: [],
      url: '',
      created: ''
    }
  ],
  loading: true,
  error: 'falhou'
}

describe('Locations Selectors', () => {
  it('selectAllLocations deve retornar todos', () => {
    const result = selectAllLocations.projector(mockState)
    expect(result.length).toBe(2)
  })

  it('selectAllLocationById deve retornar o location correto', () => {
    const selector = selectAllLocationById(2)
    const result = selector.projector(mockState)
    expect(result?.name).toBe('Gazorpazorp')
  })

  it('selectLocationsLoading deve retornar o loading', () => {
    const result = selectLocationsLoading.projector(mockState)
    expect(result).toBeTrue()
  })

  it('selectLocationsError deve retornar o erro', () => {
    const result = selectLocationsError.projector(mockState)
    expect(result).toBe('falhou')
  })
})
