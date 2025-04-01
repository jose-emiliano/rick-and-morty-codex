import { Locality } from "src/app/shared/models/rick-and-morty-api";


export interface LocationsState {
  locations: Locality[];
  loading: boolean;
  error: string | null;
}

export const initialLocationsState: LocationsState = {
  locations: [],
  loading: false,
  error: null,
}