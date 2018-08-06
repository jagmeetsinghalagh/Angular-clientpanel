import { Component, OnInit,ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router,ActivatedRoute } from '@angular/router';

import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client;
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  balance: number;

  disableBalanceOnAdd: Boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService
      .getClient(this.id)
      .subscribe( (client) => {
        this.firstname = client.firstname;
        this.lastname = client.lastname;
        this.phone = client.phone;
        this.email = client.email;
        this.balance = client.balance;
      });
  }

  onSubmit({value,valid}: {value: Client,valid: boolean}) {
        if (!valid) {
          //show messages
          this.flashMessage.show('Please Fill Out The Form Correctly', {
            cssClass: 'alert-danger',timeout: 4000
          });
        } else {

            // add new client
            this.clientService.updateClient(value,this.id);
           

           // show message
           this.flashMessage.show('Client Updated', {
             cssClass: 'alert-success',timeout: 4000
            });

           // redirect to dashboard
           this.router.navigate(['/dashboard']);
        }
    }

}
