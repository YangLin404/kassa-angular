import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestoItemComponent} from './components/resto-item-component/resto-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  {path: 'items', component: RestoItemComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
