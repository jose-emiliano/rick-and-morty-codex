import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationsState } from './locations.state';

export const selectLocationsState = createFeatureSelector<LocationsState>('locations');



export const selectAllLocationById = (id: number) => createSelector(
  selectLocationsState,
  (state) => state.locations.find(f => f.id === id)
)

export const selectAllLocations = createSelector(
  selectLocationsState,
  (state) => state.locations
)

export const selectLocationsLoading = createSelector(
  selectLocationsState,
  (state) => state.loading
)

export const selectLocationsError = createSelector(
  selectLocationsState,
  (state) => state.error
)
