import { Injectable } from '@angular/core';

//structuring product
export interface product { total: any, name: string, price: any, imageURL: string, quantity: any, id: string }

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor() { }

    //variables declaration
    cart: any[] = new Array()
    flag: boolean | undefined
    temp: any
    temp2: any
    temp3: any[] = new Array()

    //service add to cart
    addToCart(obj: product, id: string) {
        this.flag = true

        //updating quantity if product already present
        this.cart.forEach((element, index) => {
            if (element.id == id) {
                this.flag = false
                this.cart[index].quantity = this.cart[index].quantity + 1;
                element.total = parseInt(element.price) * parseInt(element.quantity)
            }
        });
        if (this.flag) {
            obj.total = parseInt(obj.price) * 1
            this.cart.push({ ...obj, id: id, quantity: 1 })
        }
        localStorage.setItem('cartItems', JSON.stringify(this.cart))
    }

    //service view cart
    viewCart() {
        this.temp3 = JSON.parse(localStorage.getItem('cartItems')!)
        if (this.temp3 != null)
            this.cart = this.temp3
        return this.cart
    }

    //service update cart quantity
    updateCartQuantity(e: any, i: any) {
        this.temp2 = this.cart.indexOf(i)
        this.cart.forEach((element, i) => {
            if (this.temp2 === i) {
                element.quantity = parseInt(e)
                element.total = parseInt(element.price) * parseInt(element.quantity)
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(this.cart))
    }

    //service remove from cart
    removeFromCart(i: any) {
        this.temp = this.cart.indexOf(i)
        this.cart.splice(this.temp, 1)
        localStorage.setItem('cartItems', JSON.stringify(this.cart))
    }
}