import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Client } from '../models/Client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastname','asc'));
  }

  getClients(): Observable<Client[]> {
    // get clients with id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((actions) => actions.map( a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;
        return data;
      })));
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }


}
