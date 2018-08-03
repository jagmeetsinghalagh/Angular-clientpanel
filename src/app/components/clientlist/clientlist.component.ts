import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clientService
      .getClients()
      .subscribe(clients => {
        console.log(clients);
        this.clients = clients;
        console.log(this.clients);
    });
  }

}
