import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { SensorData } from '../models/sensor-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private apiUrl = `${AppConfig.getApiUrl()}/data`;

  constructor(private http: HttpClient) { }

  getSensorData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(this.apiUrl).pipe(
      map(data => {
        if (!Array.isArray(data)) return [];
        return data;
      })
    );
  }
}
