
import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RestoTable} from '../resto-tabel-component/resto-table';

@Component({
  selector: 'app-move-table',
  templateUrl: './move-table.component.html'
})

export class MoveTableComponent{

  tables: RestoTable[];
  tableToMove: string;
  constructor(public activeModal: NgbActiveModal) {
  }


}
