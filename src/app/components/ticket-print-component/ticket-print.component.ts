import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Ticket} from '../ticket-component/ticket';
import {TicketService} from '../ticket-component/ticket.service';
import {ActivatedRoute} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-ticket-print',
  templateUrl: './ticket-print.component.html',
  styleUrls: ['./ticket-print.component.css']
})
export class TicketPrintComponent implements OnInit {
  ticket: Ticket;
  ticketSummary: string = '';
  ticketSummaryRows: number;
  isModal = false;
  ticketID: string;
  alertMsg: string;
  private _success = new Subject<string>();

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    ) {}

  ngOnInit(): void {
    if (this.isModal) {
      this.ticketService.getTicketByIdentifier(this.ticketID)
        .then(ticket => {
          this.ticket = ticket;
          this.getPrintTicket();
        });
    } else {
      const ticketNr = Number(this.route.snapshot.params['nr']);
      if (ticketNr) {
        this.ticketService.getTicketByNr(ticketNr)
          .then(ticket => {
          this.ticket = ticket;
          this.getPrintTicket();
        });
      }
    }
    this._success.subscribe((message) => this.alertMsg = message);
    debounceTime.call(this._success, 3000).subscribe(() => this.alertMsg = null);
  }

  private getPrintTicket() {
    this.ticketSummaryRows = 5;
    this.ticketSummary = 'Tafel ' + this.ticket.tableNr + '\r\n';
    this.ticketSummary += this.ticket.persons + (this.ticket.persons == 1 ? ' persoon' : ' personen') + '\r\n\r\n';
    this.ticket.items.forEach(item => {
      this.ticketSummary += item.count + 'x ' + item.item.name + '\r\n';
      this.ticketSummary += '   € ' + item.totalPrice.toFixed(2) + '\r\n';
      this.ticketSummaryRows += item.item.name.trim().length / 15 + 1;
    });
    this.ticketSummary += '\r\nTotaal: ' + '€ ' + this.ticket.totalPriceWithTax.toFixed(2);
  }
}
