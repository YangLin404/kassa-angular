import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from '../../components/ticket-component/ticket';
import {OverviewResultService} from './overview-result.service';
import {ConfirmComponent} from '../../components/confirm-component/confirm.component';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketService} from '../../components/ticket-component/ticket.service';
import {TicketComponent} from '../../components/ticket-component/ticket.component';
import {TicketPrintComponent} from '../../components/ticket-print-component/ticket-print.component';
import {OverviewSummary} from '../OverviewSummary';

@Component({
  selector: 'app-overview-result',
  templateUrl: './overview-result.component.html'
})

export class OverviewResultComponent implements OnInit{
  tickets: Ticket[];
  overviewSummary = new OverviewSummary();
  _date: NgbDateStruct;
  @Input('date')
  set date(date: NgbDateStruct) {
    this._date = date;
    this.reloadTickets();

  }

  constructor(private overviewResultService: OverviewResultService,
              private modalService: NgbModal,
              private ticketService: TicketService) {}

  ngOnInit(): void {
  }

  openConfirmModal(ticketNr: number): void {
    const modalRef = this.modalService.open(ConfirmComponent);
    modalRef.componentInstance.msg = 'Ben je zeker dat je dit ticket wilt verwijderen?';
    modalRef.result
      .then(result => {
        if (result === true) {
          this.deleteTicket(ticketNr);
        }
      });
  }

  openTicketModal(ticketID: string): void {
    const modalRef = this.modalService.open(TicketComponent, {size: 'lg', windowClass: 'modal-xl'});
    modalRef.componentInstance.ticketID = ticketID;
    modalRef.componentInstance.isModal = true;
    modalRef.result
      .then(result => {
        this.reloadTickets();
      });
  }

  printTicket(ticketID: string): void {
    const modalRef = this.modalService.open(TicketPrintComponent, {size: 'lg', windowClass: 'modal-xl'});
    modalRef.componentInstance.ticketID = ticketID;
    modalRef.componentInstance.isModal = true;
    modalRef.result
      .then(result => {
        this.reloadTickets();
      });
  }

  deleteTicket(ticketNr: number): void {
    this.ticketService.deleteTicket(ticketNr)
      .then(success => {
        if (success) {
          this.removeTicketFromList(ticketNr);
          this.calSummary();
        }
      });
  }

  private removeTicketFromList(ticketNr: number): void {
    const ticketToRemove = this.findTicketByNr(ticketNr);
    const indexTicket = this.tickets.indexOf(ticketToRemove);
    if (indexTicket !== -1) {
      this.tickets.splice(indexTicket, 1);
    }
  }

  private findTicketByNr(ticketNr: number): Ticket {
    return this.tickets.find(t => t.ticketNr === ticketNr);
  }

  private convertDateToString(date: NgbDateStruct): string {
    const month = date.month < 10 ? '0' + date.month : date.month;
    return date.year + '-' + month + '-' + (date.day < 10 ? '0' + date.day : date.day);
  }

  private reloadTickets() {
    this.overviewResultService.getTicketByDate(this.convertDateToString(this._date))
      .then(tickets => {
        this.tickets = tickets;
        this.calSummary();
      });
  }

  private calSummary() {
    this.overviewSummary.reset();
    for (const ticket of this.tickets) {
      this.overviewSummary.totalTaxLv1 += ticket.totalTaxTakeaway;
      this.overviewSummary.totalTaxLv2 += ticket.totalTaxFood;
      this.overviewSummary.totalTaxLv3 += ticket.totalTaxDrink;
      this.overviewSummary.total += ticket.totalPriceWithTax;
      this.overviewSummary.totalWithoutTax += ticket.totalPriceWithoutTax;
      this.overviewSummary.totalDrink += ticket.totalDrink;
      this.overviewSummary.totalFood += ticket.totalFood;
      if (ticket.payMethod === 'Cash') {
        this.overviewSummary.totalCash += ticket.totalPriceWithTax;
      } else if (ticket.payMethod === 'Card') {
        this.overviewSummary.totalCard += ticket.totalPriceWithTax;
      }

      if (ticket.ticketType === 'Takeaway') {
        this.overviewSummary.totalTakeaway += ticket.totalPriceWithTax;
      } else {
        this.overviewSummary.totalResto += ticket.totalPriceWithTax;
      }
    }
  }

}
