import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService, private router: Router) { }

  // button sign in click
  btnSignIn(email:string, password:string) {
    this.authenticationService.SignIn(email, password)
  }

  ngOnInit(): void {
  }
}