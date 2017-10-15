
import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Ticket} from './ticket';
import {TicketService} from './ticket.service';
import {ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import {TicketSummary} from './ticket-summary';
import {NGXLogger} from 'ngx-logger';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketPaymentComponent} from '../ticket-payment-component/ticket-payment.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})


export class TicketComponent implements OnInit {
  ticket: Ticket;
  ticketSummary: TicketSummary = new TicketSummary();

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal,
    private logger: NGXLogger) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.ticketService.getTicketByNr(+params['nr']))
      .subscribe(ticket => {
        this.ticket = ticket;
        this.calcTicketSummary(); });
  }
  addItemToTicket(quicklink: string): void {
    this.ticketService.addItemToTicket(this.ticket.ticketNr, quicklink)
      .then(added => {
        if (added) {
          this.reloadTicket();
        }
      });
  }

  removeItemFromTicket(quicklink: string): void {
    this.ticketService.removeItemFromTicket(this.ticket.ticketNr, quicklink)
      .then(removed => {
        if (removed) {
          this.reloadTicket();
        }
      });
  }

  payTicket(payMethod: string): void {
    this.ticketService.payTicket(this.ticket.ticketNr, payMethod)
      .then(paid => {
        if (paid) {
          this.location.back();
        }
      });
  }

  openPayment() {
    const modalRef = this.modalService.open(TicketPaymentComponent);
    modalRef.componentInstance.price = this.ticketSummary.totalPriceWithTax;
    modalRef.result.then(result => {
      if (result !== 'close') {
        this.payTicket(result);
      }
    });
  }

  private reloadTicket(): void {
    this.ticketService.getTicketByNr((this.ticket.ticketNr))
      .then(ticket => {
        this.ticket = ticket;
        this.calcTicketSummary();
      });
  }

  private calcTicketSummary() {
    this.ticketSummary.reset();
    this.ticket.items.forEach(item => {
      this.ticketSummary.totalPriceWithTax += item.totalPrice;
      this.ticketSummary.totalPriceWithoutTax += item.totalPriceWithoutTax;
      if (item.item.itemType === 'Drink') {
        this.ticketSummary.totalTaxDrink += item.totalTax;
      } else {
        this.ticketSummary.totalTaxFood += item.totalTax;
      }
    });
    this.logger.debug(this.ticketSummary);
    this.logger.debug(this.ticket);
  }
}
