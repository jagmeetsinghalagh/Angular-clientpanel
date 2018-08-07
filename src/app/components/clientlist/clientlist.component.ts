import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit {

  clients: Client[];
  totalOwed: number = 0;
  hasOwed: boolean = false;

  constructor(
    private clientService: ClientService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService
      .getAuth()
      .subscribe( auth => {
      if (auth) {
        this.fetchClients();
      }
    });
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
    if (this.totalOwed > 0) {
      this.hasOwed = true;
    }
  }

}
