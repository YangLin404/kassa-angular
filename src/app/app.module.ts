import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RestoItemService} from './components/resto-item-component/resto-item.service';
import {AppRoutingModule} from './app-routing.module';
import {RestoItemComponent} from './components/resto-item-component/resto-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RestoItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RestoItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
