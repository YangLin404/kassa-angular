import {Component, OnInit} from '@angular/core';
import {RestoTable} from '../resto-tabel-component/resto-table';
import {RestoService} from './resto.service';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-resto',
  templateUrl: './resto.component.html',
  styleUrls: ['./resto.component.css'],
})

export class RestoComponent implements OnInit {
  tables: RestoTable[] = [];
  constructor(private restoService: RestoService, private router: Router, private logger: NGXLogger) {}
  ngOnInit(): void {
    this.restoService.getTables()
      .then((tables) => {
        this.tables = tables;
        this.logger.debug(this.tables);
    } );
  }

  createTicket(tableNr: string): void {
    this.restoService.createTicket(tableNr)
      .then(ticketNr => {
        this.router.navigate(['/ticket', ticketNr]);
      });
  }
}
