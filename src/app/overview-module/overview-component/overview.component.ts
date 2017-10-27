import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  date: NgbDateStruct;

  constructor(calendar: NgbCalendar) {
    this.date = calendar.getToday();
  }

  ngOnInit(): void {

  }

}
