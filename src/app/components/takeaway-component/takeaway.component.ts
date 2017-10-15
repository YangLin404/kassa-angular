import {Component, OnInit} from '@angular/core';
import {Ticket} from '../ticket-component/ticket';
import {TakeawayService} from './takeaway.service';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';

@Component({
  selector: 'app-takeaway',
  templateUrl: './takeaway.component.html',
  styleUrls: ['./takeaway.component.css']
})

export class TakeawayComponent implements OnInit {

  tickets: Ticket[];

  constructor(private takeawayService: TakeawayService,
              private router: Router,
              private logger: NGXLogger) {}

  ngOnInit(): void {
    this.takeawayService.getTakeawayTickets()
      .then(tickets => {
        this.tickets = tickets;
      });
  }

  createTicket(): void {
    this.takeawayService.createTicket()
      .then(ticketNr => {
        this.router.navigate(['/ticket', ticketNr]);
      });
  }
}
