import {Component, OnInit} from '@angular/core';
import {RestoTable} from '../resto-tabel-component/resto-table';
import {RestoService} from './resto.service';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {ConfirmComponent} from '../confirm-component/confirm.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketService} from '../ticket-component/ticket.service';

@Component({
  selector: 'app-resto',
  templateUrl: './resto.component.html',
  styleUrls: ['./resto.component.css'],
})

export class RestoComponent implements OnInit {
  tables: RestoTable[] = [];
  constructor(private restoService: RestoService,
              private ticketService: TicketService,
              private router: Router,
              private logger: NGXLogger,
              private modalService: NgbModal, ) {}
  ngOnInit(): void {
    this.restoService.getTables()
      .then((tables) => {
        this.tables = tables;
    } );
  }

  createTicket(tableNr: string): void {
    this.restoService.createTicket(tableNr)
      .then(ticketNr => {
        this.router.navigate(['/ticket', ticketNr]);
      });
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

  deleteTicket(ticketNr: number): void {
    this.ticketService.deleteTicket(ticketNr)
      .then(success => {
        if (success) {
          this.logger.info('ticket removed');
          this.reloadTables();
        }
      });
  }

  reloadTables(): void {
    this.restoService.getTables()
      .then((tables) => {
        this.tables = tables;
      } );
  }
}
