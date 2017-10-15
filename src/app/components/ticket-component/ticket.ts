import {TicketItem} from '../item-search-component/ticket-item';

export class Ticket {
  ticketNr: number;
  ticketIdentifier: string;
  name: string;
  date: string;
  time: string;
  status: string;
  payMethod: string;
  ticketType: string;
  tableNr: string;
  items: TicketItem[] = [];

  public ispaid(): boolean {
    return this.payMethod !== 'None';
  }

}