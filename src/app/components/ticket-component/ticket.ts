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
  isTaken: boolean;
  isPaid: boolean;
  items: TicketItem[] = [];
  totalPriceWithTax: number;
  totalPriceWithoutTax: number;
  totalTaxDrink: number;
  totalTaxFood: number;
  totalTaxTakeaway: number;

}
