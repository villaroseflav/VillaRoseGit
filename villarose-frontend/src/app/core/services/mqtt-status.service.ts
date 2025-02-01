import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttStatusService {
// todo url
  private mqttStatusUrl = 'http://localhost:8080/health';  // Your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // Poll the server to check if the MQTT client is connected
  getMqttStatus(): Observable<string> {
    return this.http.get<string>(this.mqttStatusUrl);
  }
}
