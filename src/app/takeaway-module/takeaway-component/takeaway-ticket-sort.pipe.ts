import {Pipe, PipeTransform} from '@angular/core';
import {Ticket} from '../../components/ticket-component/ticket';

@Pipe({
  name: 'takeawayTicketSortByTime'
})
export class TakeawayTicketSortPipe implements PipeTransform {
  transform(array: Ticket[]): Ticket[] {
    if (array !== undefined) {
      array.sort((a: Ticket, b: Ticket) => {
        if (a.time < b.time) {
          return -1;
        } else if (a.time > b.time) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}
