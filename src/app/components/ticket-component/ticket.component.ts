
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
import {TimeBoxComponent} from '../../takeaway-module/time-box-component/time-box.component';

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

  openTimeLine() {
    const modalRef = this.modalService.open(TimeBoxComponent);
    modalRef.componentInstance.takenTimes = this.ticket.time;
    modalRef.componentInstance.isModal = true;
    modalRef.result
      .then(result => {
        if (result !== 'close') {
          this.updateTicketTime(result);
        }
      });
  }

  updateTicketTime(time: string): void {
    if (this.ticket.time !== time) {
      this.ticketService.updateTicketTime(this.ticket.ticketNr, time)
        .then(success => {
          if (success) {
            this.logger.debug('update time to server successfull, now updating local values');
            this.ticket.time = time;
          }
        });
    }
  }

  updateTicketName(name: string): void {
    if (this.ticket.name !== name) {
      this.ticketService.updateTicketName(this.ticket.ticketNr, name)
        .then(success => {
          if (success) {
            this.ticket.name = name;
          }
        });
    }
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
