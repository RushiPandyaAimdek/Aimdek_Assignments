import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, public cartService:CartService) { }

  //if user logged in it shows logout else it shows login
  conditionIn = localStorage.getItem('currentUser') ? true : false

  //for displaying name in header
  displayName = JSON.parse(localStorage.getItem('currentUser') !!)
  
  //button log out click
  btnLogout(){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }
}