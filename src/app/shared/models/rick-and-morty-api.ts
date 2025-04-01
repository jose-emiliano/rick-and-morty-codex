export interface PaginatedResponse<T> {
  info: Info;
  results: T[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface CharactersSearch {
  page?: number;
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'Male' | 'Female' | 'Genderless' | 'unknown';
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    id: number;
    name: string;
    url: string;
  };
  image: string;
  episode: {
    id: number;
    url: string
  }[];
  url: string;
  created: string;
}

export interface CharacterResponse extends Omit<Character, 'episode' | 'location'> {
  episode: string[];
  location: {
    name: string;
    url: string;
  }
}

export interface LocationsSearch {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export interface Locality {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: {
    id: number;
    url: string;
  }[];
  url: string;
  created: string;
}

export interface LocalityResponse extends Omit<Locality, 'residents'> {
  residents: string[];
}

export interface EpisodeSearch {
  page?: number;
  name?: string;
  episode?: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: {
    id: number;
    url: string;
  }[]
  url: string;
  created: string;
}

export interface EpisodeResponse extends Omit<Episode, 'characters'> {
  characters: string[];
}