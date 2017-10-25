import {RestoItem} from './resto-item';
import {ItemExtra} from '../ticket-component/item-extra';

export class TicketItem {
  item: RestoItem;
  count: number;
  extras: ItemExtra[];
  totalPrice: number;
  totalTax: number;
  totalPriceWithoutTax: number;
  remark: string;
}
