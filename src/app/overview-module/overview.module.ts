import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {OverviewComponent} from './overview-component/overview.component';
import {OverviewResultComponent} from './overview-result-component/overview-result.component';

@NgModule({
  declarations: [
    OverviewComponent,
    OverviewResultComponent
  ],

  entryComponents: [
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.INFO, serverLogLevel: NgxLoggerLevel.ERROR}),
  ],

  providers: [
    NgbModal, NgbModalStack, NgbActiveModal]
})

export class OverviewModule { }
