import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComicViniApiService {
  private apiKey = ''
  
  constructor(
    private http: HttpClient
  ) { }

  request(url: string, extraParams: { [key: string]: string } = {}) {
    let params = this.authParams
    for (const key in extraParams) {
      params = params.set(key, extraParams[key])
    }

    return this.http.get(`/comicvine/${url}`, { params });
  }

  private get authParams(): HttpParams {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('format', 'json')
  }
}
