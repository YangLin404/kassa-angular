import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../components/ticket-component/ticket';
import {TakeawayService} from './takeaway.service';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-takeaway',
  templateUrl: './takeaway.component.html',
  styleUrls: ['./takeaway.component.css']
})

export class TakeawayComponent implements OnInit {

  tickets: Ticket[];
  times: NgbTimeStruct[] = [];
  names: string[] = [];
  edited: false;

  constructor(private takeawayService: TakeawayService,
              private router: Router,
              private logger: NGXLogger) {}

  ngOnInit(): void {
    this.takeawayService.getTakeawayTickets()
      .then(tickets => {
        this.tickets = tickets;
        this.setTimesAndName();
      });
  }

  createTicket(): void {
    this.takeawayService.createTicket()
      .then(ticketNr => {
        this.router.navigate(['/ticket', ticketNr]);
      });
  }

  updateTicketInfo(ticketNr: number): void {
    this.takeawayService.updateTicketInfo(ticketNr, this.convertTime(this.times[ticketNr]), this.names[ticketNr])
      .then(success => {
        if (success) {
          const ticketToUpdate = this.tickets.find(t => t.ticketNr === ticketNr);
          ticketToUpdate.time = this.convertTime(this.times[ticketNr]);
          ticketToUpdate.name = this.names[ticketNr];
        }
      });
  }

  private setTimesAndName(): void {
    this.tickets.forEach(t => {
      const times = t.time.split(':');
      const hour = Number(times[0]);
      const min = Number(times[1]);
      this.times[t.ticketNr] = {hour: hour, minute: min, second:0 };
      this.names[t.ticketNr] = t.name;
    });
    this.logger.debug(this.times);
    this.logger.debug(this.names);
  }

  private convertTime(time: NgbTimeStruct): string {
    return time.hour + ':' + time.minute;
  }
}
