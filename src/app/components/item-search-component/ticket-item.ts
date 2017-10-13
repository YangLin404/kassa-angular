import {RestoItem} from './resto-item';

export class TicketItem {
  item: RestoItem;
  count: number;
  extras: string[];
  totalPrice: number;
  totalTax: number;
  totalPriceWithoutTax: number;
}
