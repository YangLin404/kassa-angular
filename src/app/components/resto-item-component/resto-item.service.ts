
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {RestoItem} from './resto-item';


@Injectable()
export class RestoItemService {
  private baseUrl = 'http://localhost:7777/api/';

  constructor(private http: Http) {}

  getItems(): Promise<RestoItem[]> {
    const url = this.baseUrl + 'getItems';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as RestoItem[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

