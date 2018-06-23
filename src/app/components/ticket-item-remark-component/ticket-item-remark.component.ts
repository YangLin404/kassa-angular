import {Component, EventEmitter, Input, OnInit, Output, AfterContentInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketItem} from '../item-search-component/ticket-item';
import {TicketItemRemarkService} from './ticket-item-remark.service';
import {ItemExtra} from '../ticket-component/item-extra';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-ticket-item-remark',
  templateUrl: './ticket-item-remark.component.html'
})

export class TicketItemRemarkComponent implements OnInit {

  @Input() item: TicketItem;
  @Input() isMainDishe: boolean;
  extras: ItemExtra[];

  constructor(public activeModal: NgbActiveModal,
              private ticketItemRemarkService: TicketItemRemarkService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.ticketItemRemarkService.getExtras()
      .then(extras => this.extras = extras);
  }

  choseExtra(extra: string): void {
    this.logger.info('extra selected: ' + extra);
    this.activeModal.close(extra);
  }

  containsExtra(extraName: string): boolean {
    for (const extra of this.item.extras) {
      if (extra.name === extraName) {
        return true;
      }
    }
    return false;
  }
}
