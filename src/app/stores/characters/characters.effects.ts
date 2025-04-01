import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CharacterActions from './characters.actions';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { RickAndMortyApiService } from 'src/app/core/services/rick-and-morty-api.service';
import { selectAllCharacters } from './characters.selectors';
import { Store } from '@ngrx/store';
import { CacheService } from 'src/app/core/services/cache.service';
import { CharacterResponse } from 'src/app/shared/models/rick-and-morty-api';

@Injectable()
export class CharactersEffects {
  constructor(
    private actions$: Actions,
    private api: RickAndMortyApiService,
    private store: Store,
    private cacheService: CacheService
  ) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      mergeMap(() => {
        if (this.cacheService.hasItem('characters')) return of(CharacterActions.loadCharactersSuccess({
            characters: this.cacheService.getItem('characters') as unknown as CharacterResponse[]
        }))

        return this.api.getCharacters().pipe(
          tap(res => this.cacheService.setItem('characters', JSON.stringify([res.results].flat()))),
          map((res) => CharacterActions.loadCharactersSuccess({ characters: [res.results].flat() })),
          catchError((err) =>
            of(CharacterActions.loadCharactersFailure({ error: err.message }))
          )
        )
      }
      )
    )
  )

  loadCharactersByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharactersByIds),
      withLatestFrom(this.store.select(selectAllCharacters)),
      mergeMap(([{ ids }, allCharacters]) => {
        const existingIds = allCharacters.map(c => c.id)
        const idsToFetch = [...new Set(ids)].filter(id => !existingIds.includes(id))
  
        if (idsToFetch.length === 0) return of();
  
        return this.api.getMultipleCharacters(idsToFetch).pipe(
          map(characters =>
            CharacterActions.loadCharactersSuccess({ characters })
          ),
          catchError(error =>
            of(CharacterActions.loadCharactersFailure({ error: error.message }))
          )
        )
      })
    )
  )
}
