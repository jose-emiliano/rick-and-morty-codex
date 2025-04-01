import { createReducer, on } from '@ngrx/store';
import * as LocationActions from './locations.actions';
import { initialLocationsState } from './locations.state';
import { Locality, LocalityResponse } from 'src/app/shared/models/rick-and-morty-api';

export const locationsReducer = createReducer(
  initialLocationsState,
  on(LocationActions.loadLocations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(LocationActions.loadLocationsSuccess, (state, { locations }) => ({
    ...state,
    loading: false,
    locations: [...state.locations, ...[locations].flat()
      .map(m => convertLocationResponseIntoLocality(m))
      .filter(f => !state.locations.map(m => m.id).includes(f.id))
    ],
  })),
  on(LocationActions.loadLocationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
)


export function convertLocationResponseIntoLocality(locationResponse: LocalityResponse): Locality {
  return {
    ...locationResponse,
    residents: locationResponse.residents.map(locality => ({ id: Number(locality.split('/').pop()), url: locality }))
  }
}