import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LocationActions from './locations.actions';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { RickAndMortyApiService } from 'src/app/core/services/rick-and-morty-api.service';
import { selectAllLocations } from './locations.selectors';
import { Store } from '@ngrx/store';
import { CacheService } from 'src/app/core/services/cache.service';
import { LocalityResponse } from 'src/app/shared/models/rick-and-morty-api';

@Injectable()
export class LocationsEffects {
  constructor(
    private actions$: Actions,
    private api: RickAndMortyApiService,
    private store: Store,
    private cacheService: CacheService
  ) {}

  loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocations),
      mergeMap(() => {
        if (this.cacheService.hasItem('locations')) return of(LocationActions.loadLocationsSuccess({
            locations: this.cacheService.getItem('locations') as unknown as LocalityResponse[]
        }))

        return this.api.getLocations().pipe(
          tap(res => this.cacheService.setItem('locations', JSON.stringify([res.results].flat()))),
          map((res) => LocationActions.loadLocationsSuccess({ locations: [res.results].flat() })),
          catchError((err) =>
            of(LocationActions.loadLocationsFailure({ error: err.message }))
          )
        )
      })
    )
  )

  loadLocationsByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.loadLocationsByIds),
      withLatestFrom(this.store.select(selectAllLocations)),
      mergeMap(([{ ids }, allLocations]) => {
        const existingIds = allLocations.map(c => c.id)
        const idsToFetch = [...new Set(ids)].filter(id => !existingIds.includes(id))
  
        if (idsToFetch.length === 0) return of();
  
        return this.api.getMultipleLocations(idsToFetch).pipe(
          map(locations =>
            LocationActions.loadLocationsSuccess({ locations })
          ),
          catchError(error =>
            of(LocationActions.loadLocationsFailure({ error: error.message }))
          )
        )
      })
    )
  )
}
