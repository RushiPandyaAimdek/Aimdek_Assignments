import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartService } from 'src/app/Services/cart.service';

//structuring userDetails
export interface userDetail { name: string, mobile: string, address: string, pincode: string, grandTotal: number, date: number }
@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {

  constructor(public cartService: CartService, public afs: AngularFirestore) { }

  //declaring variables
  cartItems: any
  userDetail: userDetail | undefined
  total = 0
  today: number = Date.now();
  image: any
  success: boolean = true
  userID = JSON.parse(localStorage.getItem('currentUser')!!)

  //button confirm click
  btnConfirm(name: string, mobile: string, address: string, pincode: string) {
    if (this.cartItems.length == 0) {
      alert('Please add some item to cart for placeorder')
    }
    else {
      if (name == '' || mobile == '' || address == '' || pincode == '') {
        alert('Enter data')
      }
      else {
        this.userDetail = {
          name: name,
          mobile: mobile,
          address: address,
          pincode: pincode,
          grandTotal: this.total,
          date: this.today
        }
        this.afs.collection('orders').add({
          userDetail: this.userDetail,
          cartItems: this.cartItems,
          userID: this.userID.id
        })
        localStorage.removeItem('cartItems')
        this.cartService.cart = []
        this.success = false
        this.image = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg'
      }
    }
  }

  ngOnInit(): void {
    //getting total as per cartItems
    this.cartItems = this.cartService.viewCart()
    this.cartItems.forEach((element: any) => {
      this.total += element.total
    })
  }
}