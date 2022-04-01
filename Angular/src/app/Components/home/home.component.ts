import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
export interface Shirt { name: string; price: number; category: string }
export interface ShirtId extends Shirt { id: string; }

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public productService: ProductService, private router: Router) {}

    //variable declaration
    public items: any
    filter: any

    //buton view product click
    btnViewProduct(i: any) {
        this.router.navigate(['/product', i.id])
    }

    //for displaying product according to product category
    category(e: any) {
        this.filter = e.target.value
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(item => this.items = item)
    }
}