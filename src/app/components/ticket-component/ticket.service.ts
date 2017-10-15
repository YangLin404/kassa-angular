
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Ticket} from './ticket';


@Injectable()
export class TicketService {
  private baseUrl = 'http://localhost:7777/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getTicketByNr(ticketNr: number): Promise<Ticket> {
    const url = this.baseUrl + 'getTodayTicketByNr?ticketNr=' + ticketNr;
    return this.http.get(url)
      .toPromise()
      .then((response) => response.json() as Ticket)
      .catch(this.handleError);
  }

  addItemToTicket(ticketNr: number, quicklink: string): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr + '/addItemToTicket';
    return this.http.post(url, quicklink, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  removeItemFromTicket(ticketNr: number, quicklink: string): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr + '/removeItemFromTicket';
    return this.http.post(url, quicklink, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  payTicket(ticketNr: number, payMethod: string): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr + '/pay';
    return this.http.post(url, payMethod, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

