import { EpisodeResponse } from 'src/app/shared/models/rick-and-morty-api';
import { loadEpisodes, loadEpisodesFailure, loadEpisodesSuccess } from './episodes.actions';

describe('Episodes Actions', () => {
  it('loadEpisodes deve criar a action correta', () => {
    const action = loadEpisodes()
    expect(action.type).toBe('[Episodes] Load Episodes')
  })

  it('loadEpisodesSuccess deve carregar episódios', () => {
    const episodes: EpisodeResponse[] = [{
      id: 1,
      name: 'Pilot',
      air_date: '',
      episode: '',
      characters: [],
      url: '',
      created: ''
    }]

    const action = loadEpisodesSuccess({ episodes })
    expect(action.episodes.length).toBe(1)
    expect(action.episodes[0].id).toBe(1)
  })

  it('loadEpisodesFailure deve carregar erro', () => {
    const action = loadEpisodesFailure({ error: 'deu ruim' })
    expect(action.error).toBe('deu ruim')
  })
})
