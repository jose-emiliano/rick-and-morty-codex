import { Character } from "src/app/shared/models/rick-and-morty-api";

export interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export const initialCharactersState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
}