import { createAction, props } from '@ngrx/store';
import { LocalityResponse } from 'src/app/shared/models/rick-and-morty-api';

export const loadLocations = createAction('[Locations] Load Locations')

export const loadLocationsSuccess = createAction(
  '[Locations] Load Locations Success',
  props<{ locations: LocalityResponse[] }>()
)

export const loadLocationsFailure = createAction(
  '[Locations] Load Locations Failure',
  props<{ error: string }>()
)

export const loadLocationsByIds = createAction(
  '[Locations] Load Locations By Ids',
  props<{ ids: number[] }>()
)
