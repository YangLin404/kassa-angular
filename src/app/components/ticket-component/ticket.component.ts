
import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Ticket} from './ticket';
import {TicketService} from './ticket.service';
import {ActivatedRoute, Params} from '@angular/router';
import {TicketSummary} from './ticket-summary';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})


export class TicketComponent implements OnInit {
  ticket: Ticket;
  ticketSummary: TicketSummary;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute) {}

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

  private reloadTicket(): void {
    this.ticketService.getTicketByNr((this.ticket.ticketNr))
      .then(ticket => {
        this.ticket = ticket;
        this.calcTicketSummary();
      });
  }

  private calcTicketSummary() {
    this.ticket.items.forEach(item => {
      this.ticketSummary.totalPriceWithTax += item.totalPrice;
      this.ticketSummary.totalPriceWithoutTax += item.totalPriceWithoutTax;
      if (item.item.itemType === 'Drink') {
        this.ticketSummary.totalTaxDrink += item.totalTax;
      } else {
        this.ticketSummary.totalTaxFood += item.totalTax;
      }
    });
  }
}
