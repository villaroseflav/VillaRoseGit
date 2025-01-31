import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${AppConfig.getApiUrl()}/login`;
  private vitiiUrl = 'https://bo.vitii.be/index.php';

  constructor(private http: HttpClient) {}

  login(): Observable<{ username: string; password: string }> {
    return this.http.get<{ username: string; password: string }>(this.baseUrl);
  }

  loginOnVitii(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    body.set('submit', '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Referer': 'https://bo.vitii.be/index.php',
      'Origin': 'https://bo.vitii.be',
    });

    return this.http.post(this.vitiiUrl, body.toString(), { headers, withCredentials: true });
  }

//   authMe()
//   POST /index.php HTTP/1.1
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
// Accept-Encoding: gzip, deflate, br, zstd
// Accept-Language: fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,la;q=0.6
// Cache-Control: max-age=0
// Connection: keep-alive
// Content-Length: 67
// Content-Type: application/x-www-form-urlencoded
// Cookie: PHPSESSID=3vslbsjuij2gc7lelnrmo45l5d
// Host: bo.vitii.be
// Origin: https://bo.vitii.be
// Referer: https://bo.vitii.be/index.php
// Sec-Fetch-Dest: document
// Sec-Fetch-Mode: navigate
// Sec-Fetch-Site: same-origin
// Sec-Fetch-User: ?1
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36
// sec-ch-ua: "Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Windows"

}
