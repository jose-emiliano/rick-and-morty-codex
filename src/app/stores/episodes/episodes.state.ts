import { Episode } from "src/app/shared/models/rick-and-morty-api";

export interface EpisodesState {
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}

export const initialEpisodesState: EpisodesState = {
  episodes: [],
  loading: false,
  error: null,
}