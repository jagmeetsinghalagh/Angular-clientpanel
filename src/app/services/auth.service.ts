import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // login the user
  login(email: string,password: string) {
    return new Promise( (resolve,reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
        .then( userData => resolve(userData),
          err => reject(err)
        );
    });
  }

  // signup the user
  signup(email: string, password: string) {
    return new Promise( (resolve,reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then( userData => resolve(userData),
        (err) => reject(err)
      );
    });
  }

  // get the auth state
  getAuth() {
    return this.afAuth.authState.pipe(
      map( auth => auth)
    );
  }

  // logout the user
  logout() {
    this.afAuth.auth.signOut();
  }
}
