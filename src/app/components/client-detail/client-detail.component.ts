import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getClient();
  }

  // gets the client 
  getClient() {
    // get id from url
    this.id = this.route.snapshot.params['id'];

    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        this.client = client;
        console.log(this.client);
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      
    });
  }

  // updates the balance
  updBalance() {
    this.clientService
      .updateClient(this.client);
    // show success message
    this.flashMessages.show('Balance Updated Successfully', {
      cssClass: 'alert-info', timeout: 3000
    });
    // redirect to dashboard
    this.router.navigate(['/']);
  }

}
