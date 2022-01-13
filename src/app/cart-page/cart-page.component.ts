import { Component, OnInit } from '@angular/core';
import { Products } from '../admin/interface';
import { ProductService } from '../admin/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  myProducts: Products[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    let LSLength = 0;

    if (JSON.parse(localStorage.getItem("cart"))) {
      LSLength = JSON.parse(localStorage.getItem("cart")).length
    }

    if (LSLength === 0) {
      localStorage.removeItem("cart")
    }

    if (this.productService.cartProducts.length > 0 && LSLength > 0) {
      
      for (let i = 0; i < this.productService.cartProducts.length; i++) {
        const element = this.productService.cartProducts[i];
        this.myProducts.push(element)
      }

      for (let i = 0; i < LSLength; i++) {
        const element = JSON.parse(localStorage.getItem("cart"))[i];
        this.myProducts.push(element)
      }

      localStorage.setItem("cart", JSON.stringify(this.myProducts))

    } else if (this.productService.cartProducts.length > 0 && LSLength === 0) {
      
      for (let i = 0; i < this.productService.cartProducts.length; i++) {
        const element = this.productService.cartProducts[i];
        this.myProducts.push(element)
      }
      localStorage.setItem("cart", JSON.stringify(this.myProducts))

    } else if (this.productService.cartProducts.length === 0 && LSLength > 0) {

      for (let i = 0; i < LSLength; i++) {
        const element = JSON.parse(localStorage.getItem("cart"))[i];
        this.myProducts.push(element)
      }
      
      localStorage.setItem("cart", JSON.stringify(this.myProducts))
    }
    this.productService.cartProducts = []
  }

  deleteProduct(product) {
    let deleteIndex = this.myProducts.indexOf(product)
    this.myProducts.splice(deleteIndex, 1);
    localStorage.setItem("cart", JSON.stringify(this.myProducts));

  }



}
