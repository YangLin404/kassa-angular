
import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Ticket} from './ticket';
import {TicketService} from './ticket.service';
import {ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import {TicketSummary} from './ticket-summary';
import {NGXLogger} from 'ngx-logger';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketPaymentComponent} from '../ticket-payment-component/ticket-payment.component';
import {TimeBoxComponent} from '../../takeaway-module/time-box-component/time-box.component';
import {TicketItemRemarkComponent} from '../ticket-item-remark-component/ticket-item-remark.component';
import {TicketItem} from '../item-search-component/ticket-item';
import {TicketItemRemarkService} from '../ticket-item-remark-component/ticket-item-remark.service';
import {ItemSearchService} from '../item-search-component/item-search.service';
import {RestoService} from '../resto-component/resto.service';
import {MoveTableComponent} from '../move-table-component/move-table.component';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {ItemSearchComponent} from '../item-search-component/item-search.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})


export class TicketComponent implements OnInit {
  ticket: Ticket;
  ticketSummary: TicketSummary = new TicketSummary();
  isModal = false;
  ticketID: string;
  alertMsg: string;
  private _success = new Subject<string>();

  constructor(
    private restoService: RestoService,
    private ticketService: TicketService,
    private itemSearchService: ItemSearchService,
    private ticketItemRemarkService: TicketItemRemarkService,
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
          this.calcTicketSummary();
          this.setDefaultTicketName();
        });
    } else {
      const ticketNr = Number(this.route.snapshot.params['nr']);
      if (ticketNr) {
        this.ticketService.getTicketByNr(ticketNr)
          .then(ticket => {
          this.ticket = ticket;
          this.calcTicketSummary();
          this.setDefaultTicketName();
        });
      }
    }
    this._success.subscribe((message) => this.alertMsg = message);
    debounceTime.call(this._success, 3000).subscribe(() => this.alertMsg = null);
  }

  addItemToTicket(quicklink: string): void {
    this.ticketService.addItemToTicket(this.ticket.ticketNr, quicklink)
      .then(added => {
        if (added) {
          this.reloadTicketAfterAddItem(quicklink);
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
          if (this.isModal) {
            this.activeModal.close();
          } else {
            this.location.back();
          }
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

  openRemark(ticketItem: TicketItem) {
    const modalRef = this.modalService.open(TicketItemRemarkComponent);
    modalRef.componentInstance.item = ticketItem;
    modalRef.componentInstance.isMainDishe = this.isMainDishe(ticketItem.item.quicklink);
      modalRef.result
        .then(result => {
          if (result !== 'close') {
            this.logger.info('result of remark modal is : ' + result);
            if (this.ticketItemRemarkService.isExtra(result)) {
              this.addExtraToItem(ticketItem, result);
            } else {
              this.logger.info('This is a remark: ' + result);
              this.updateTicketRemark(ticketItem, result);
            }
          }
        });
  }

  openMoveTableModal(fromTable: string) {
    const modalRef = this.modalService.open(MoveTableComponent, {size: 'lg'});
    this.restoService.getTables()
      .then(tables => {
        modalRef.componentInstance.tableToMove = this.ticket.tableNr;
        modalRef.componentInstance.tables = tables;
      });
    modalRef.result
      .then(result => {
        if (result !== 'close') {
          this.restoService.moveTable(fromTable, result)
            .then(success => {
              if (success) {
                this.showAlert('Tafel verplaatsting is gelukt!');
                this.ticket.tableNr = result;
              }
            });
        }
      });
  }

  private addExtraToItem(ticketItem: TicketItem, extra: string) {
    this.ticketService.addExtraToTicketItem(this.ticket.ticketNr, ticketItem.item.quicklink, extra)
      .then(success => {
        if (success) {
          this.ticketService.getTicketByNr(this.ticket.ticketNr)
            .then(ticket => {
              this.ticket = ticket;
              this.calcTicketSummary();
            });
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

  updateTicketPersons(persons: number): void {
    if (this.ticket.persons !== persons) {
      this.ticketService.updateTicketPersons(this.ticket.ticketNr, persons)
        .then(success => {
          if (success) {
            this.ticket.persons = persons;
          }
        });
    }
  }

  updateTicketRemark(ticketItem: TicketItem, remark: string): void {
    if (ticketItem.remark !== remark) {
      this.ticketService.updateTicketItemRemark(this.ticket.ticketNr, ticketItem.item.quicklink, remark)
        .then(success => {
          if (success) {
            ticketItem.remark = remark;
          }
        });
    }
  }

  private reloadTicketAfterAddItem(quicklink: string): void {
    this.ticketService.getTicketByNr((this.ticket.ticketNr))
      .then(ticket => {
        this.ticket = ticket;
        this.calcTicketSummary();
        if (this.isMainDishe(quicklink)) {
          this.openRemark(this.ticket.items.find(i => i.item.quicklink === quicklink));
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
      /*
      this.ticketSummary.totalPriceWithoutTax += item.totalPriceWithoutTax;
      if (item.item.itemType === 'Drink') {
        this.ticketSummary.totalTaxDrink += item.totalTax;
      } else {
        this.ticketSummary.totalTaxFood += item.totalTax;
      }
    */
    });
    this.logger.debug(this.ticketSummary);
    this.logger.debug(this.ticket);
  }

  private setDefaultTicketName() {
    if(this.ticket.name == null) {
      let name: string = 'Tafel ' + this.ticket.tableNr;
      this.updateTicketName(name);
      this.ticket.name = name;
      }
  }

  private isMainDishe(quicklink: string): boolean {
    return this.itemSearchService.findItemByQuicklink(quicklink).itemType === 'MainDishe';
  }

  private showAlert(msg: string) {
    this._success.next(msg);

  }
}
