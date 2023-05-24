import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit(): void {}
  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
    
  }
}
