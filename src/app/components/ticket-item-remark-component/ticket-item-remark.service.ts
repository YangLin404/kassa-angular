
import {ItemExtra} from '../ticket-component/item-extra';
import {NGXLogger} from 'ngx-logger';
import {Http} from '@angular/http';
import {isUndefined} from 'util';
import {Injectable} from '@angular/core';
import {ConfigService} from '../../config-component/config.service';

@Injectable()
export class TicketItemRemarkService {

  private baseUrl: string;
  extras: ItemExtra[];

  constructor(private http: Http, private logger: NGXLogger, private configService: ConfigService) {
    this.baseUrl = configService.getRestAPIBaseUrl();
    this.retrieveExtras()
      .then(extras => this.extras = extras);
  }

  private retrieveExtras(): Promise<ItemExtra[]> {
    const url = this.baseUrl + 'extras';
    return this.http.get(url)
      .toPromise()
      .then((response) => response.json() as ItemExtra[])
      .catch(this.handleError);
  }

  getExtras(): Promise<ItemExtra[]> {
    if (!isUndefined(this.extras)) {
      return Promise.resolve(this.extras);
    } else {
      return this.retrieveExtras();
    }
  }

  isExtra(name: string): boolean {
    for (const extra of this.extras) {
      if (extra.name === name) {
        return true;
      }
    }
    return false;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
