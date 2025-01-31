import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { SensorData } from '../models/sensor-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private apiUrl = `${AppConfig.getApiUrl()}/data`;

  constructor(private http: HttpClient) { }

  getSensorData(): Observable<SensorData[]> {
    console.log("get data at " + this.apiUrl);
    return this.http.get<SensorData[]>(this.apiUrl);
  }
}
