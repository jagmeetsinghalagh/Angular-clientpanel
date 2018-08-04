import { Component, OnInit,ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    balance: 0
  };

  disableBalanceOnAdd: Boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private ClientService: ClientService,
    private router: Router
    ) { }

  ngOnInit() {
  }
   onSubmit({value,valid}: {value: Client,valid: boolean}) {
     if (this.disableBalanceOnAdd){
       value.balance = 0;
     }

     if (!valid) {
       
       //show messages
       this.flashMessage.show('Please Fill Out The Form Correctly', {
         cssClass: 'alert-danger',timeout: 4000
       });
     } else {

       // add new client
       this.ClientService.newClient(value);

       // show message
       this.flashMessage.show('New Client Added', {
         cssClass: 'alert-success',timeout: 4000
       });

       // redirect to dashboard
       this.router.navigate(['/']);
     }

   }

}
