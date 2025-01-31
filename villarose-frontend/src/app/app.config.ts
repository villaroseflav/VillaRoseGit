import { environment } from '../environments/environment';

  export class AppConfig {
    static getApiUrl(): string {
      return environment.apiBaseUrl; // Example API base URL
    }

    static getTuyaUrl(): string {
      return environment.tuyaUrl;
    }
  
    static getWeatherApiKey(): string {
      return 'your-weather-api-key'; // Example API key
    }
  }