
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {RestoTable} from '../resto-tabel-component/resto-table';


@Injectable()
export class RestoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'http://localhost:7777/api/';
  private tables: RestoTable[] = [];

  constructor(private http: Http) {}

  getTables(): Promise<RestoTable[]> {
    const url = this.baseUrl + 'getTables';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as RestoTable[])
      .catch(this.handleError);
  }

  createTicket(tableNr: string): Promise<boolean> {
    const url = this.baseUrl + 'resto/createTicket';
    return this.http.post(url, tableNr, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as number)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

