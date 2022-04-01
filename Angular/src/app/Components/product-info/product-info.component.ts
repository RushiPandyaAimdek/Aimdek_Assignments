import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

    constructor(private route: ActivatedRoute, public productService: ProductService, public cartService: CartService) { }
   
    //declaring variables
    id: any
    items: any

    //button add to cart click
    btnAddToCart() {
        this.cartService.addToCart(this.items, this.id)
    }

    ngOnInit(): void {
        //getting product as per user click
        this.id = this.route.snapshot.paramMap.get('id')
        this.productService.getProduct(this.id).subscribe(item => {
            this.items = item
        })
    }
}