import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})

export class ConfirmComponent {
  @Input() msg: string;

  constructor(public activeModal: NgbActiveModal) {
  }


}
