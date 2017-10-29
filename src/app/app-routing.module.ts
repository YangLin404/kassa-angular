import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestoComponent} from './components/resto-component/resto.component';
import {TicketComponent} from './components/ticket-component/ticket.component';
import {TakeawayComponent} from './takeaway-module/takeaway-component/takeaway.component';
import {OverviewComponent} from './overview-module/overview-component/overview.component';
import {ConfigComponent} from './config-component/config.component';

const routes: Routes = [
  { path: '', redirectTo: '/tables', pathMatch: 'full' },
  {path: 'tables', component: RestoComponent},
  {path: 'takeaway', component: TakeawayComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'config', component: ConfigComponent},
  {path: 'ticket/:nr', component: TicketComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
