import {Pipe, PipeTransform} from '@angular/core';
import {TicketItem} from '../item-search-component/ticket-item';
import {RestoItem} from '../item-search-component/resto-item';

@Pipe({
  name: 'itemSort'
})
export class TicketItemSortPipe implements PipeTransform {
  transform(array: TicketItem[]): TicketItem[] {
    array.sort((a: TicketItem, b: TicketItem) => {
      const aOrder = this.getOrderId(a.item);
      const bOrder = this.getOrderId(b.item);
      if (aOrder < bOrder) {
        return -1;
      } else if (aOrder > bOrder) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

  private getOrderId(item: RestoItem): number {
    switch (item.itemType) {
      case 'Drink': { return 1; }
      case 'Soup': { return 2; }
      case 'Entree': { return 3; }
      case 'MainDishe': { return 4; }
      case 'Menu': {return 4; }
      case 'Nasi': { return 5; }
      case 'Bami': { return 6; }
      case 'Supplement': {return 7; }
      case 'Dessert': {return 8; }
      default: {return 0; }
    }
  }
}
