import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResponse, CharactersSearch, EpisodeResponse, EpisodeSearch, LocalityResponse, LocationsSearch, PaginatedResponse } from 'src/app/shared/models/rick-and-morty-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyApiService {
  private baseUrl = environment.apiUrl
  
  constructor(
    private http: HttpClient
  ) { }
  
  public getCharacters = (search: CharactersSearch = {}) => this.request<PaginatedResponse<CharacterResponse>>(`character`, { ...search })
  
  public getCharacterById = (id: number) => this.request<CharacterResponse>(`character/${id}`)
  
  public getMultipleCharacters = (ids: number[]) => this.request<CharacterResponse[]>(`character/${ids.join()}`)

  public getLocations = (search: LocationsSearch = {}) => this.request<PaginatedResponse<LocalityResponse>>('location', { ...search })

  public getLocationById = (id: number) => this.request<LocalityResponse>(`location/${id}`)

  public getMultipleLocations = (ids: number[]) => this.request<LocalityResponse[]>(`location/${ids.join()}`)

  public getEpisodes = (search: EpisodeSearch = {}) => this.request<PaginatedResponse<EpisodeResponse>>('episode', { ...search })

  public getEpisodeById = (id: number) => this.request<EpisodeResponse>(`episode/${id}`)

  public getMultipleEpisodes = (ids: number[]) => this.request<EpisodeResponse[]>(`episode/${ids.join()}`)

  public request<T>(url: string, extraParams: { [key: string]: string | number } = {}): Observable<T> {
    let params = new HttpParams()

    Object.entries(extraParams).forEach(([key, value]) => params = params.set(key, value))

    return this.http.get<T>(`${this.baseUrl}/${url}`, { params });
  }
}