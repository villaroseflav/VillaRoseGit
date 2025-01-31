import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { CreateUpdateDevice, Device } from '../models/device.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  // private apiUrl = `${environment.apiBaseUrl}/sensor-data`;
  private apiUrl = `${AppConfig.getApiUrl()}/devices`;

  constructor(private http: HttpClient) { }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  createDevice(device: CreateUpdateDevice): Observable<CreateUpdateDevice> {
    return this.http.post<CreateUpdateDevice>(this.apiUrl, device);
  }

  updateDevice(device: CreateUpdateDevice): Observable<CreateUpdateDevice> {
    return this.http.put<CreateUpdateDevice>(this.apiUrl, device);
  }

  deleteDevice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
