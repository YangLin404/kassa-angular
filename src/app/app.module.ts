import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
  NgbAccordionConfig, NgbDropdownConfig, NgbModal, NgbModule, NgbTypeahead,
  NgbTypeaheadConfig
} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {ItemSearchService} from './components/item-search-component/item-search.service';
import {AppRoutingModule} from './app-routing.module';
import {ItemSearchComponent} from './components/item-search-component/item-search.component';
import {RestoComponent} from './components/resto-component/resto.component';
import {RestoService} from './components/resto-component/resto.service';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';


import {TicketService} from './components/ticket-component/ticket.service';
import {TicketComponent} from './components/ticket-component/ticket.component';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {TicketItemSortPipe} from './components/ticket-component/ticket-item-sort.pipe';
import {TicketPaymentComponent} from './components/ticket-payment-component/ticket-payment.component';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';


@NgModule({
  declarations: [
    AppComponent,
    ItemSearchComponent,
    RestoComponent,
    TicketComponent,
    TicketPaymentComponent,
    TicketItemSortPipe
  ],
  entryComponents: [
    TicketPaymentComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR})
  ],
  providers: [ItemSearchService, RestoService, TicketService
    , NgbAccordionConfig, NgbDropdownConfig, NgbTypeaheadConfig, NgbModal, NgbModalStack
    , NGXLogger],
  bootstrap: [AppComponent]
})
export class AppModule { }
