
import {Injectable, Input} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {Http} from '@angular/http';
import {Ticket} from '../../components/ticket-component/ticket';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class OverviewResultService {
  private baseUrl = 'http://localhost:7777/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private logger: NGXLogger) {}

  getTicketByDate(date: string): Promise<Ticket[]> {
    const url = this.baseUrl + '/overview/tickets?date=' + date;
    return this.http.get(url)
      .toPromise()
      .then((response) => response.json() as Ticket[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
