import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestoComponent} from './components/resto-component/resto.component';
import {TicketComponent} from './components/ticket-component/ticket.component';
import {TakeawayComponent} from './components/takeaway-component/takeaway.component';

const routes: Routes = [
  { path: '', redirectTo: '/tables', pathMatch: 'full' },
  {path: 'tables', component: RestoComponent},
  {path: 'takeaway', component: TakeawayComponent},
  {path: 'ticket/:nr', component: TicketComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
