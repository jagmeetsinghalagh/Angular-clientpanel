import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUser: string;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService
      .getAuth()
      .subscribe( auth => {
        if (auth) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isLoggedIn = false;
        }
      });
  }

  logoutClicked() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      this.authService.logout();
      // show message
      this.flashMessages.show('You are now logged out!!', {
        cssClass: 'alert-success', timeout: 4000
      });

      // redirect to login page
      this.router.navigate(['/']);
    }
  }

}
