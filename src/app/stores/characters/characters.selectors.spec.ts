import { selectAllCharacterById, selectAllCharacterByIds, selectAllCharacters, selectCharactersError, selectCharactersLoading } from './characters.selectors';
import { CharactersState } from './characters.state';

const mockState: CharactersState = {
  characters: [
    {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel', url: 'https://rickandmortyapi.com/api/location/20', id: 20 },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [{
        id: 1,
        url: 'https://rickandmortyapi.com/api/episode/1'
      }],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    },
    {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/2' },
      location: { name: 'Citadel', url: 'https://rickandmortyapi.com/api/location/31', id: 20 },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [{
        id: 1,
        url: 'https://rickandmortyapi.com/api/episode/2'
      }],
      url: 'https://rickandmortyapi.com/api/character/2',
      created: '2017-11-04T18:44:46.250Z',
    }
  ],
  loading: true,
  error: 'erro aqui',
}

describe('Characters Selectors', () => {
  it('selectAllCharacters deve retornar os personagens', () => {
    const result = selectAllCharacters.projector(mockState)
    expect(result[0].status).toBe('Alive')
  })

  it('selectAllCharacterById deve retornar o personagem correto', () => {
    const selector = selectAllCharacterById(1)
    const result = selector.projector(mockState)
    expect(result?.id).toBe(1)
  })

  it('selectAllCharacterByIds deve retornar personagens por ids', () => {
    const selector = selectAllCharacterByIds([1])
    const result = selector.projector(mockState)
    expect(result.length).toBe(1)
  })

  it('selectCharactersLoading deve retornar o loading', () => {
    const result = selectCharactersLoading.projector(mockState)
    expect(result).toBeTrue()
  })

  it('selectCharactersError deve retornar o erro', () => {
    const result = selectCharactersError.projector(mockState)
    expect(result).toBe('erro aqui')
  })

  it('selectAllCharacterById deve retornar undefined para id inexistente', () => {
    const selector = selectAllCharacterById(999)
    const result = selector.projector(mockState)
    expect(result).toBeUndefined()
  });
})
