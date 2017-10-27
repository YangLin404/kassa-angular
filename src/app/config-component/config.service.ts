
import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  private baseUrl = 'http://redirectme.ddns.net:7777/api/';

  getRestAPIBaseUrl(): string {
    return this.baseUrl;
  }
}
