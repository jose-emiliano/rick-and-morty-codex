import { selectAllEpisodeById, selectAllEpisodes, selectEpisodesError, selectEpisodesLoading } from './episodes.selectors';
import { EpisodesState } from './episodes.state';

const mockState: EpisodesState = {
  episodes: [
    {
      id: 1,
      name: 'Pilot',
      air_date: '',
      episode: '',
      characters: [],
      url: '',
      created: ''
    },
    {
      id: 2,
      name: 'Ep2',
      air_date: '',
      episode: '',
      characters: [],
      url: '',
      created: ''
    }
  ],
  loading: false,
  error: null,
}

describe('Episodes Selectors', () => {
  it('selectAllEpisodes deve retornar todos os episódios', () => {
    const result = selectAllEpisodes.projector(mockState)
    expect(result.length).toBe(2)
  })

  it('selectAllEpisodeById deve retornar um episódio específico', () => {
    const selector = selectAllEpisodeById(2)
    const result = selector.projector(mockState)
    expect(result?.id).toBe(2)
  })

  it('selectEpisodesLoading deve retornar o loading', () => {
    const result = selectEpisodesLoading.projector(mockState)
    expect(result).toBeFalse()
  })

  it('selectEpisodesError deve retornar o erro', () => {
    const errorState = { ...mockState, error: 'falhou' }
    const result = selectEpisodesError.projector(errorState)
    expect(result).toBe('falhou')
  })
})
