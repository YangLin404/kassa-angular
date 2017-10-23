import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ticket} from '../../components/ticket-component/ticket';
import {TakeawayService} from './takeaway.service';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {TimeBoxComponent} from '../time-box-component/time-box.component';
import {TicketService} from '../../components/ticket-component/ticket.service';

@Component({
  selector: 'app-takeaway',
  templateUrl: './takeaway.component.html',
  styleUrls: ['./takeaway.component.css']
})

export class TakeawayComponent implements OnInit {

  @ViewChild('timeBox') timeBox: TimeBoxComponent;
  tickets: Ticket[];
  times: string[] = [];
  names: string[] = [];

  constructor(private takeawayService: TakeawayService,
              private ticketService: TicketService,
              private router: Router,
              private logger: NGXLogger,
              private modalService: NgbModal, ) {}

  ngOnInit(): void {
    this.takeawayService.getTakeawayTickets()
      .then(tickets => {
        this.tickets = tickets;
        this.setTimesAndName();
      });
  }

  openTimeLine(ticketNr: number) {
    const modalRef = this.modalService.open(TimeBoxComponent);
    modalRef.componentInstance.takenTimes = this.times;
    modalRef.componentInstance.isModal = true;
    modalRef.result
      .then(result => {
        if (result !== 'close') {
          this.updateTicketTime(ticketNr, result);
        }
      })
      .catch(this.handleError);
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

  updateTicketTime(ticketNr: number, time: string): void {
    const ticketToUpdate = this.findTicketByNr(ticketNr);
    if (ticketToUpdate.time !== time) {
      this.ticketService.updateTicketTime(ticketNr, time)
        .then(success => {
          if (success) {
            this.logger.debug('update time to server successfull, now updating local values');
            ticketToUpdate.time = time;
            this.times[ticketNr] = time;
            this.timeBox.takenTimes = this.times;
            this.timeBox.updateView();
          }
        });
    }
  }

  takeFood(taken: boolean, ticketNr: number): void {
    const ticketToUpdate = this.findTicketByNr(ticketNr);
    if (ticketToUpdate.isTaken !== taken) {
      this.takeawayService.updateTicketTakenStat(ticketNr, taken)
        .then(success => {
          if (success) {
            this.logger.debug('update taken to server successfull, now updating local values');
            ticketToUpdate.isTaken = taken;
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
