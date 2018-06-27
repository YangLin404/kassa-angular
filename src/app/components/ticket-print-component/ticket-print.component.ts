import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Ticket} from '../ticket-component/ticket';
import {TicketService} from '../ticket-component/ticket.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {NGXLogger} from 'ngx-logger';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RestoService} from '../resto-component/resto.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-ticket-print',
  templateUrl: './ticket-print.component.html',
  styleUrls: ['./ticket-print.component.css']
})
export class TicketPrintComponent implements OnInit {
  ticket: Ticket;
  ticketSummary: string;
  isModal = false;
  ticketID: string;
  alertMsg: string;
  private _success = new Subject<string>();

  constructor(private restoService: RestoService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private logger: NGXLogger) {}

  ngOnInit(): void {
    if (this.isModal) {
      this.ticketService.getTicketByIdentifier(this.ticketID)
        .then(ticket => {
          this.ticket = ticket;
          this.showTicketItems();
        });
    } else {
      const ticketNr = Number(this.route.snapshot.params['nr']);
      if (ticketNr) {
        this.ticketService.getTicketByNr(ticketNr)
          .then(ticket => {
          this.ticket = ticket;
          this.showTicketItems();
        });
      }
    }
    this._success.subscribe((message) => this.alertMsg = message);
    debounceTime.call(this._success, 3000).subscribe(() => this.alertMsg = null);
  }

  private showTicketItems() {
    this.ticketSummary = "Tafel " + this.ticket.tableNr;
    this.ticketSummary = this.ticket.persons + (this.ticket.persons == 1 ? " persoon" : " personen");
    this.ticket.items.forEach(item => {
      this.ticketSummary += item;
    });
    this.logger.debug(this.ticketSummary);
    this.logger.debug(this.ticket);
  }

}
