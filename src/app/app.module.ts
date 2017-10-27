import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
  NgbAccordionConfig, NgbDatepicker, NgbDropdownConfig, NgbModal, NgbModule, NgbTimepickerConfig, NgbTypeahead,
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
import {TakeawayComponent} from './takeaway-module/takeaway-component/takeaway.component';
import {TakeawayService} from './takeaway-module/takeaway-component/takeaway.service';
import {TakeawayTicketSortPipe} from './takeaway-module/takeaway-component/takeaway-ticket-sort.pipe';
import {TakeawayModule} from './takeaway-module/takeaway.module';
import {ConfirmComponent} from './components/confirm-component/confirm.component';
import {OverviewModule} from './overview-module/overview.module';
import {TicketItemRemarkComponent} from './components/ticket-item-remark-component/ticket-item-remark.component';
import {TicketItemRemarkService} from './components/ticket-item-remark-component/ticket-item-remark.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemSearchComponent,
    RestoComponent,
    TicketComponent,
    TicketPaymentComponent,
    TicketItemSortPipe,
    ConfirmComponent,
    TicketItemRemarkComponent
  ],
  entryComponents: [
    TicketPaymentComponent,
    ConfirmComponent,
    TicketItemRemarkComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    LoggerModule.forRoot({level: NgxLoggerLevel.INFO, serverLogLevel: NgxLoggerLevel.ERROR}),
    TakeawayModule,
    OverviewModule
  ],
  providers: [ItemSearchService, RestoService, TicketService, TicketItemRemarkService
    , NgbAccordionConfig, NgbDropdownConfig, NgbTypeaheadConfig, NgbTimepickerConfig, NgbModal, NgbModalStack
    , NGXLogger],
  bootstrap: [AppComponent]
})
export class AppModule { }
