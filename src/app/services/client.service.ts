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

  // get clients collection from backend
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

  // get client document from the backend
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  // update the client in the backend
  updateClient(client: Client, id: string) {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.clientDoc.update(client);
  }

  // delete the client from database
  deleteClient(client: Client) {
    let id = client.id
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.clientDoc.delete();
  }


}
