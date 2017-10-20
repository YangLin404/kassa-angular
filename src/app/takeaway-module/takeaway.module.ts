import {NgModule} from '@angular/core';
import {TakeawayService} from './takeaway-component/takeaway.service';
import {TakeawayComponent} from './takeaway-component/takeaway.component';
import {TakeawayTicketSortPipe} from './takeaway-component/takeaway-ticket-sort.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {TimeBoxComponent} from './time-box-component/time-box.component';
import {TimeBoxService} from './time-box-component/time-box.service';

@NgModule({
  declarations: [
    TakeawayComponent,
    TakeawayTicketSortPipe,
    TimeBoxComponent],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
  ],

  providers: [TakeawayService, TimeBoxService]
})

export class TakeawayModule { }
