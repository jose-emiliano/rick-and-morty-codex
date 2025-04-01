import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public getItem(key: string): string {
    return JSON.parse(localStorage.getItem(key) || '')?.data
  }

  public setItem(key: string, value: string): void {
    const cacheExpirationTime = new Date()
    cacheExpirationTime.setMinutes(cacheExpirationTime.getMinutes() + 5);
    localStorage.setItem(key, JSON.stringify({ data: JSON.parse(value), timestamp: cacheExpirationTime.getTime() }));
  }

  public hasItem(key: string): boolean {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
  
    try {
      const parsed = JSON.parse(raw);
      return parsed.timestamp > Date.now();
    } catch {
      return false;
    }
  }
}
