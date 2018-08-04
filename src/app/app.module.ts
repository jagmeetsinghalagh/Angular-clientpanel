import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ClientService } from './services/client.service'; 
import { ClientlistComponent } from './components/clientlist/clientlist.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientlistComponent,
    DashboardComponent,
    SidebarComponent,
    AddClientComponent,
    ClientDetailComponent
  ],
  imports: [
    BrowserModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase,'clientpanel'),
    AngularFirestoreModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
