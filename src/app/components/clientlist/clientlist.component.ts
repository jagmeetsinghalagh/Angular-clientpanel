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
  totalOwed: number = 0;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clientService
      .getClients()
      .subscribe(clients => {
        this.clients = clients;
        this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce( (total,client) => {
      return total + client.balance;
    },0);
  }

}
