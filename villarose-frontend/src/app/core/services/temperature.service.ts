import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import Temperature from '../models/temperature';
import Sortable from '../models/sortable';
import DisplayTemperature from '../models/display-temperature';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  private baseUrl = `${AppConfig.getApiUrl()}/temperature`;

  constructor(private http: HttpClient) {}

  getTemperatures(): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(`${this.baseUrl}`);
  }

  getTemperaturesSorted(sortable: Sortable[]): Observable<DisplayTemperature[]> {
    let params = new HttpParams();
    if (sortable && sortable.length > 0) {
      sortable.forEach((sort: Sortable) => {
        params = params.append('sortable', `${sort.name},${sort.direction}`);
      });
    }
    return this.http.get<DisplayTemperature[]>(`${this.baseUrl}/sorted`, {params});
  }

  getTemperaturesOfDay(day: string): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(`${this.baseUrl}?date=${day}`);
  }

  getSearchByParams(date: string, from_date: string, to_date: string, periodView: string): Observable<Temperature[]> {
    let params = `periodView=${periodView}&`;

    if (date && periodView !== 'custom') params += `date=${date}&`;
    if (periodView === 'custom' && from_date && to_date) {
      params += `fromDate=${from_date}&toDate=${to_date}&`;
    }

    return this.http.get<Temperature[]>(`${this.baseUrl}/search?${params}`);
  }

  saveTemperature(temperature: Temperature): Observable<Temperature> {
    return this.http.put<Temperature>(this.baseUrl, temperature);
  }
}
