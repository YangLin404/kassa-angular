import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-payment',
  templateUrl: './ticket-payment.component.html'
})

export class TicketPaymentComponent {

  @Input() price;
  payBack: number;

  constructor(public activeModal: NgbActiveModal) {
    this.payBack = 0;
  }

  calcPayBack(event: any): void {
    this.payBack = this.price - event.target.value;
  }

  pay(payMethod: string): void {
    this.activeModal.close(payMethod);
  }
}
