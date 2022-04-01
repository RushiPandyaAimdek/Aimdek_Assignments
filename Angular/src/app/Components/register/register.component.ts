import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService, public router:Router) { }

  //button signup click
  btnSignUp(email:string, password:string, confirmPassword:string) {
    if(password === confirmPassword)
      this.authenticationService.SignUp(email, password)
    else
      alert(`Password didn't match`)
  }
  
  ngOnInit(): void {
  }
}