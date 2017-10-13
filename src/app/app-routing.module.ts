import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemSearchComponent} from './components/item-search-component/item-search.component';
import {RestoComponent} from './components/resto-component/resto.component';
import {TicketComponent} from './components/ticket-component/ticket.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  {path: 'items', component: ItemSearchComponent},
  {path: 'tables', component: RestoComponent},
  {path: 'ticket/:nr', component: TicketComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
