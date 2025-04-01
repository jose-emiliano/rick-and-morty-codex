import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = environment.apiUrl

  private publicKey = ''
  private privateKey = ''

  constructor(
    private http: HttpClient,
  ) { }

  public get(url: string, extraParams: { [key: string]: string } = {}) {
    let params = this.authParams
    for (const key in extraParams) {
      params = params.set(key, extraParams[key])
    }
    return this.http.get(`/api/${url}`, { params });
  }

  private get authParams(): HttpParams {
    const ts = new Date().getTime().toString()

    const hash = Md5.hashStr(ts + this.privateKey + this.publicKey)

    const params = new HttpParams()
      .set('ts', ts)
      .set('apikey', this.publicKey)
      .set('hash', hash)
    return params
  }
}