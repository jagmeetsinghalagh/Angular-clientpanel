import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './guards/authguard.service';

const routes: Routes = [
  { path: 'clients/add' , component: AddClientComponent, canActivate: [AuthGuardService] },
  { path: 'client/detail/:id' , component: ClientDetailComponent, canActivate: [AuthGuardService] },
  { path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: '' , component: LoginComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
