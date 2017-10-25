
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Ticket} from './ticket';
import {NGXLogger} from 'ngx-logger';


@Injectable()
export class TicketService {
  private baseUrl = 'http://localhost:7777/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private logger: NGXLogger) {}

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

  updateTicketTime(ticketNr: number, time: string): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr + '/time';
    this.logger.log('updating ticket ' + ticketNr + ' time is ' + time);
    return this.http.post(url, time, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  updateTicketName(ticketNr: number, name: string): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr + '/name';
    this.logger.log('updating ticket ' + ticketNr + ' name is ' + name);
    return this.http.post(url, name, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  updateTicketItemRemark(ticketNr: number, quicklink: string, remark: string): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr + '/ticketItem/' + quicklink + '/remark';
    return this.http.post(url, remark, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  addExtraToTicketItem(ticketNr: number, quicklink: string, extra: string): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr + '/ticketItem/' + quicklink + '/extra';
    return this.http.post(url, extra, {headers: this.headers})
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

  deleteTicket(ticketNr: number): Promise<boolean> {
    const url = this.baseUrl + 'ticket/' + ticketNr;
    return this.http.delete(url)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

