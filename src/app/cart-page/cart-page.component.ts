import { Component, OnInit } from '@angular/core';
import { Products } from '../interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  modal:any;

  myProducts: Products[] = [];

  total: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCart();
    this.totalPrice();
    this.modal = document.querySelector('.modal');
  }

  loadCart(){
    //длина localStorage
    let LSLength = 0;

    if (JSON.parse(localStorage.getItem("cart")!)) {
      LSLength = JSON.parse(localStorage.getItem("cart")!).length;
    }

    if (LSLength === 0) {
      localStorage.removeItem("cart");
    }
    //загрузка из массива и localStorage
    if (this.productService.cartProducts.length > 0 && LSLength > 0) {
      
      for (let i = 0; i < this.productService.cartProducts.length; i++) {
        const element = this.productService.cartProducts[i];
        this.myProducts.push(element);
      }

      for (let i = 0; i < LSLength; i++) {
        const element = JSON.parse(localStorage.getItem("cart")!)[i];
        this.myProducts.push(element);
      }

      localStorage.setItem("cart", JSON.stringify(this.myProducts));

      //загрузка из массива
    } else if (this.productService.cartProducts.length > 0 && LSLength === 0) {
      
      for (let i = 0; i < this.productService.cartProducts.length; i++) {
        const element = this.productService.cartProducts[i];
        this.myProducts.push(element);
      }
      localStorage.setItem("cart", JSON.stringify(this.myProducts));

    //загрузка из localStorage
    } else if (this.productService.cartProducts.length === 0 && LSLength > 0) {

      for (let i = 0; i < LSLength; i++) {
        const element = JSON.parse(localStorage.getItem("cart")!)[i];
        this.myProducts.push(element);
      }
      
      localStorage.setItem("cart", JSON.stringify(this.myProducts));
    }
    this.productService.cartProducts = [];
  }

  deleteProduct(product:Products) {
    let deleteIndex = this.myProducts.indexOf(product);
    this.myProducts.splice(deleteIndex, 1);
    localStorage.setItem("cart", JSON.stringify(this.myProducts));
    this.total = 0;
    this.totalPrice();
  }

  totalPrice() {
    for (let i = 0; i < this.myProducts.length; i++) {
      const element = this.myProducts[i].price;
      this.total += element!;
    }
  }

  orderNow(){    
    this.modal.classList.remove('_hid');
    this.modal.classList.add('_act');
    document.querySelector('body')!.style.overflowY = "hidden";
    this.total = 0;
    this.myProducts = [];
    localStorage.removeItem("cart");
    setTimeout(() => {
      this.modal.classList.remove('_act');
      this.modal.classList.add('_hid');
      document.querySelector('body')!.style.overflowY = "auto";
    }, 3000)
  }

}
