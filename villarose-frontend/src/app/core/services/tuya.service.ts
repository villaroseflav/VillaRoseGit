import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig } from "../../app.config";

@Injectable({
  providedIn: 'root',
})
export class TuyaService {
  private baseUrl = `${AppConfig.getTuyaUrl()}/tuya`;

  constructor(private http: HttpClient) {}

  getState(): Observable<String> {
    console.log('get tuya state');
    return this.http.get<String>(`${this.baseUrl}/state`);
  }

  toggleTuya(): Observable<String> {
    console.log('get tuya');
    return this.http.get<String>(`${this.baseUrl}/toggle`);
  }

  tuyaOn(): Observable<String> {
    return this.http.get<String>(`${this.baseUrl}/on`);
  }

  tuyaOff(): Observable<String> {
    return this.http.get<String>(`${this.baseUrl}/off`);
  }
}