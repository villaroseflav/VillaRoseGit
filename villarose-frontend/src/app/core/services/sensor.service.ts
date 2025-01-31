import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { Sensor } from '../models/sensor.interface';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  // private apiUrl = `${environment.apiBaseUrl}/sensor-data`;
  private apiUrl = `${AppConfig.getApiUrl()}/sensors`;

  constructor(private http: HttpClient) { }

  getSensor(): Observable<Sensor> {
    return this.http.get<Sensor>(this.apiUrl);
  }

  addSensor(sensor: Sensor): Observable<Sensor> {
    return this.http.post<Sensor>(this.apiUrl, sensor);
  }
}
