import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddClientComponent } from './components/add-client/add-client.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'clients/add', component: AddClientComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
