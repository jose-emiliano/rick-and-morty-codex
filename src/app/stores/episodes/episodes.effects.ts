import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EpisodeActions from './episodes.actions';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { RickAndMortyApiService } from 'src/app/core/services/rick-and-morty-api.service';
import { selectAllEpisodes } from './episodes.selectors';
import { Store } from '@ngrx/store';
import { CacheService } from 'src/app/core/services/cache.service';
import { Episode, EpisodeResponse } from 'src/app/shared/models/rick-and-morty-api';

@Injectable()
export class EpisodesEffects {
  constructor(
    private actions$: Actions,
    private api: RickAndMortyApiService,
    private store: Store,
    private cacheService: CacheService
  ) {}

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.loadEpisodes),
      mergeMap(() => {
        if (this.cacheService.hasItem('episodes')) return of(EpisodeActions.loadEpisodesSuccess({
            episodes: this.cacheService.getItem('episodes') as unknown as EpisodeResponse[]
        }))
        
        return this.api.getEpisodes().pipe(
          tap(res => this.cacheService.setItem('episodes', JSON.stringify([res.results].flat()))),
          map((res) => EpisodeActions.loadEpisodesSuccess({ episodes: [res.results].flat() })),
          catchError((err) =>
            of(EpisodeActions.loadEpisodesFailure({ error: err.message }))
          )
        )
      }
      )
    )
  )

  loadEpisodesByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.loadEpisodesByIds),
      withLatestFrom(this.store.select(selectAllEpisodes)),
      mergeMap(([{ ids }, allEpisodes]) => {
        const existingIds = allEpisodes.map(c => c.id)
        const idsToFetch = [...new Set(ids)].filter(id => !existingIds.includes(id))
  
        if (idsToFetch.length === 0) return of();
  
        return this.api.getMultipleEpisodes(idsToFetch).pipe(
          map(episodes =>
            EpisodeActions.loadEpisodesSuccess({ episodes: episodes })
          ),
          catchError(error =>
            of(EpisodeActions.loadEpisodesFailure({ error: error.message }))
          )
        )
      })
    )
  )
}
