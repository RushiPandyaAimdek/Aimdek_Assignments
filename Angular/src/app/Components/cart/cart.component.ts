import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    constructor(private router: Router, public cartService: CartService) { }

    //variable declaration
    cartItems: any
    total: any = 0
    temp: any
    update: any
    change: any

    //getting cart items
    getCartItems() {
        return this.cartItems
    }

    //button place order click
    btnPlaceOrder() {
        const temp = localStorage.getItem('currentUser') ? true : false
        if (!temp) {
            //navigatting to login page if user not found
            this.router.navigate(['/login'], {
                queryParams: {
                    return: this.router.url
                }
            });
        }
        if (this.cartItems.length == 0) {
            alert('Please add some item to cart')
        }
        else {
            this.router.navigate(['placeorder'])
        }
    }

    // button remove from cart item click
    btnRemove(i: any) {
        this.cartService.removeFromCart(i)
        this.total = 0
        this.updateGrandTotal()
    }

    // button cart quantity change click
    btnChange(i: any) {
        this.change = i
        this.update = i
    }

    // button cart quantity update click
    btnUpdate(i: any) {
        if (!isNaN(this.temp) && this.temp!= '') {
            this.change = 1
            this.update = 1
            this.cartService.updateCartQuantity(this.temp, i)
            this.total = 0
            this.updateGrandTotal()
        }
    }

    // getting changed quantity
    txtQuantity(e: any) {
        this.temp = e.target.value
    }

    // getting grand total
    updateGrandTotal() {
        this.cartItems.forEach((element: any) => {
            this.total += element.total
        })
    }

    ngOnInit(): void {
        this.cartItems = this.cartService.viewCart()
        this.updateGrandTotal()
    }
}