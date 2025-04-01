import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {
  constructor(
    private request: RequestService
  ) { }

  public getCharacters = () => this.request.get('characters')
  
  public getComics = () => this.request.get('comics')

  public getSeries = () => this.request.get('series')

  public getStories = () => this.request.get('stories')

  public getEvents = () => this.request.get('events')

  public getCreators = () => this.request.get('creators')
}