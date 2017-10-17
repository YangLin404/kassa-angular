
import {Injectable} from '@angular/core';
import {Ticket} from '../../components/ticket-component/ticket';
import {Http, Headers} from '@angular/http';

@Injectable()
export class TakeawayService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'http://localhost:7777/api/takeaway/';

  constructor(private http: Http) {}

  getTakeawayTickets(): Promise<Ticket[]> {
    const url = this.baseUrl + 'getTodaysTakeawayTicket';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Ticket[])
      .catch(this.handleError);
  }

  createTicket(): Promise<number> {
    const url = this.baseUrl + 'createTicket';
    return this.http.post(url, '', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as number)
      .catch(this.handleError);
  }

  updateTicketInfo(ticketNr: number, time: string, name: string): Promise<boolean> {
    const url = this.baseUrl + 'updateTicket/' + ticketNr;
    const body = JSON.stringify({time: time, name: name});
    return this.http.post(url, body, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
