import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit() {
    this.authService
      .signup(this.email,this.password)
      .then( res => {
        // show success message
        this.flashMessages.show('You Are Now Registered and Logged In !!', {
          cssClass: 'alert-success', timeout: 4000
        });
        // redirect to dashboard
        this.router.navigate(['/dashboard']);
      })
      .catch( err => {
        this.flashMessages.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }

}
