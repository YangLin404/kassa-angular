import {NgModule} from '@angular/core';
import {TakeawayService} from './takeaway-component/takeaway.service';
import {TakeawayComponent} from './takeaway-component/takeaway.component';
import {TakeawayTicketSortPipe} from './takeaway-component/takeaway-ticket-sort.pipe';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {TimeBoxComponent} from './time-box-component/time-box.component';
import {TimeBoxService} from './time-box-component/time-box.service';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {TakeawayTicketFilterPipe} from './takeaway-component/takeaway-ticket-filter.pipe';

@NgModule({
  declarations: [
    TakeawayComponent,
    TakeawayTicketSortPipe,
    TakeawayTicketFilterPipe,
    TimeBoxComponent,
  ],

  entryComponents: [
    TimeBoxComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.INFO, serverLogLevel: NgxLoggerLevel.ERROR}),
  ],

  providers: [TakeawayService, TimeBoxService,
              NgbModal, NgbModalStack, NgbActiveModal]
})

export class TakeawayModule { }
