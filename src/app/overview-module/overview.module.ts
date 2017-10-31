import {NgModule} from '@angular/core';
import {
  NgbActiveModal, NgbDatepicker, NgbDatepickerConfig, NgbModal, NgbModule,
  NgbTooltip
} from '@ng-bootstrap/ng-bootstrap';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {OverviewComponent} from './overview-component/overview.component';
import {OverviewResultComponent} from './overview-result-component/overview-result.component';
import {OverviewResultService} from './overview-result-component/overview-result.service';
import {TicketComponent} from '../components/ticket-component/ticket.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    OverviewComponent,
    OverviewResultComponent,
  ],

  entryComponents: [
    TicketComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.INFO, serverLogLevel: NgxLoggerLevel.ERROR}),
  ],

  providers: [OverviewResultService,
    NgbModal, NgbModalStack, NgbActiveModal, NgbDatepickerConfig, NgbDatepicker, NgbTooltip]
})

export class OverviewModule { }
