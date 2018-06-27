
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Http, Headers} from '@angular/http';
import {RestoItem} from '../components/item-search-component/resto-item';

@Injectable()
export class ConfigService {
  // private baseUrl = 'http://redirectme.ddns.net:7777/api/';
  private baseUrl = 'http://localhost:7777/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private logger: NGXLogger) {}

  getRestAPIBaseUrl(): string {
    return this.baseUrl;
  }

  reloadData(): Promise<boolean> {
    const url = this.baseUrl + 'config/reload';
    return this.http.post(url, '', '')
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  addItemToMenu(item: RestoItem): Promise<boolean> {
    const url = this.baseUrl + 'config/menu/item';
    return this.http.post(url, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
