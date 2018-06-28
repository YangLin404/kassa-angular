import {Component, EventEmitter, Input, OnInit, Output, AfterContentInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketItem} from '../item-search-component/ticket-item';
import {TicketItemRemarkService} from './ticket-item-remark.service';
import {ItemExtra} from '../ticket-component/item-extra';
import {NGXLogger} from 'ngx-logger';
import { HostListener } from '@angular/core';

export enum KEY_CODE {
  NUMPAD_1 = 97,
  NUMPAD_2 = 98,
  NUMPAD_3 = 99,
  NUMPAD_4 = 100,
  NUMPAD_5 = 101
}

var remark: { [keycode: number] : string; } = { 
  97: 'Rijst',
  98: 'Friet',
  99: 'Nasi',
  100:'Bami',
  101:'Mihoen',
 };

@Component({
  selector: 'app-ticket-item-remark',
  templateUrl: './ticket-item-remark.component.html'
})

export class TicketItemRemarkComponent implements OnInit {

  @Input() item: TicketItem;
  @Input() isMainDishe: boolean;
  extras: ItemExtra[];
  key: string;

  constructor(public activeModal: NgbActiveModal,
              private ticketItemRemarkService: TicketItemRemarkService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.ticketItemRemarkService.getExtras()
      .then(extras => this.extras = extras);
      remark[97] = 'Rijst';
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
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode > 96 && event.keyCode < 102)
      this.choseExtra(remark[event.keyCode]);
  }
}
