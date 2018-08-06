import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';


const routes: Routes = [
  { path: '' , component: DashboardComponent },
  { path: 'clients/add' , component: AddClientComponent },
  { path: 'client/detail/:id' , component: ClientDetailComponent },
  { path: 'client/edit/:id', component: EditClientComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
