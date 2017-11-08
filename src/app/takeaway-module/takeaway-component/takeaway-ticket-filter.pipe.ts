import {Pipe, PipeTransform} from '@angular/core';
import {Ticket} from '../../components/ticket-component/ticket';

@Pipe({
  name: 'takeawayTicketFilterPipe'
})
export class TakeawayTicketFilterPipe implements PipeTransform {
  transform(array: Ticket[], showTaken: boolean): Ticket[] {
    if (array !== undefined && !showTaken) {
      return array.filter(t => !t.isTaken);
    }
    return array;
  }
}
