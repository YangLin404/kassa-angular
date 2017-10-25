import {Pipe, PipeTransform} from '@angular/core';
import {Ticket} from '../../components/ticket-component/ticket';

@Pipe({
  name: 'takeawayTicketSortByTime'
})
export class TakeawayTicketSortPipe implements PipeTransform {
  transform(array: Ticket[]): Ticket[] {
    if (array !== undefined) {
      array.sort((a: Ticket, b: Ticket) => {
        const timeA = this.transformToTime(a.time);
        const timeB = this.transformToTime(b.time);
        if (timeA.hour > timeB.hour) {
          return 1;
        } else if (timeA.hour < timeB.hour) {
          return -1;
        } else {
          if (timeA.minut > timeB.minut) {
            return 1;
          } else if (timeB.minut < timeB.minut) {
            return -1;
          } else {
            return 0;
          }
        }
      });
      return array;
    }
  }

  private transformToTime(timeString: string): Time {
    const time: Time = new Time;
    time.hour = Number(timeString.split(':')[0]);
    time.minut = Number(timeString.split(':')[1]);
    return time;
  }
}

class Time {
  hour: number;
  minut: number;
}
