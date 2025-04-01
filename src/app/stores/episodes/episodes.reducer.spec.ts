import { loadEpisodes, loadEpisodesFailure, loadEpisodesSuccess } from './episodes.actions';
import { EpisodesReducer } from './episodes.reducer';
import { initialEpisodesState } from './episodes.state';
import { EpisodeResponse } from 'src/app/shared/models/rick-and-morty-api';

describe('Episodes Reducer', () => {
  it('deve retornar o estado inicial por padrão', () => {
    const action = { type: 'UNKNOWN' } as any
    const state = EpisodesReducer(undefined, action)
    expect(state).toEqual(initialEpisodesState)
  })

  it('deve definir loading true ao disparar loadEpisodes', () => {
    const action = loadEpisodes()
    const state = EpisodesReducer(initialEpisodesState, action)
    expect(state.loading).toBeTrue()
    expect(state.error).toBeNull()
  })

  it('deve popular episodes no sucesso do load', () => {
    const mock: EpisodeResponse = {
      id: 1,
      name: 'Pilot',
      air_date: '2013-12-02',
      episode: 'S01E01',
      characters: [],
      url: '',
      created: ''
    }

    const action = loadEpisodesSuccess({ episodes: [mock] })
    const state = EpisodesReducer(initialEpisodesState, action)

    expect(state.loading).toBeFalse()
    expect(state.episodes.length).toBe(1)
    expect(state.episodes[0].name).toBe('Pilot')
  })

  it('deve setar erro ao disparar loadEpisodesFailure', () => {
    const action = loadEpisodesFailure({ error: 'erro' })
    const state = EpisodesReducer(initialEpisodesState, action)
    expect(state.error).toBe('erro')
    expect(state.loading).toBeFalse()
  })
})
