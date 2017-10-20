import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  times: string[] = [];
  names: string[] = [];

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

  updateTicketName(ticketNr: number, name: string): void {
    const ticketToUpdate = this.findTicketByNr(ticketNr);
    if (ticketToUpdate.name !== name) {
      this.takeawayService.updateTicketName(ticketNr, this.names[ticketNr])
        .then(success => {
          if (success) {
            ticketToUpdate.name = name;
          }
        });
    }
  }

  private findTicketByNr(ticketNr: number): Ticket {
    return this.tickets.find(t => t.ticketNr === ticketNr);
  }

  private setTimesAndName(): void {
    this.tickets.forEach(t => {
      this.times[t.ticketNr] = t.time;
      this.names[t.ticketNr] = t.name;
    });
  }
}
