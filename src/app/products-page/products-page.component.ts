import { Component, OnInit } from '@angular/core';
import { ProductService } from '../admin/product.service';
import { Products } from '../admin/interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products!: Products[];

  productCategory = [
    { id: 1, selected: false, nameCategory: 'Creator' },
    { id: 2, selected: false, nameCategory: 'Speed' },
    { id: 3, selected: false, nameCategory: 'City' },
    { id: 4, selected: false, nameCategory: 'Batman' },
    { id: 5, selected: false, nameCategory: 'Technic' }
  ];

  productPrice = [
    { id: 6, selected: false, valuePrice: [0,5000] },
    { id: 7, selected: false, valuePrice: [5001,15000] },
    { id: 8, selected: false, valuePrice: [15001,25000] },
    { id: 9, selected: false, valuePrice: [25000,50000] }
  ];

  arrCategory:string[];
  arrPrice:number[]

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.products = data;
    });
  }

  /* sortPrice(price: number[]){
    this.products = this.products.filter((el) => {
      return el.price <= price[1] && el.price >= price[0]
    })
  } */
/*
  sortCategory(category:string[]){
    this.products = this.products.filter((el) => {
      return el.category === category[0] || el.category === category[1] || el.category === category[2] || el.category === category[3] || el.category === category[4]  
    })
  }

  setCategory(value:string){  
    this.products = this.newProducts
    for(let i = 0; i < this.productCategory.length; i++){
      if (this.productCategory[i] == value) {
        this.productCategory.splice(i,1)
      } 
    }
    this.productCategory.push(value);
    console.log(this.productCategory);
    this.sortCategory(this.productCategory)
  }
  */
  /* setPrice(valueMin: number, valueMax: number){
    for(let i = 0; i < this.productPrice.length; i++){
      if (this.productPrice[i] == valueMin) {
        this.productPrice.splice(i,1)
      } 
      if (this.productPrice[i] == valueMax) {
        this.productPrice.splice(i,1)
      } 
    }
    this.productPrice.push(valueMin)
    this.productPrice.push(valueMax)
    this.productPrice.sort((a:number,b:number):number => {return a-b})    
    this.productPrice.splice(1,this.productPrice.length - 2)
    console.log(this.productPrice);
    
  }  */

  onChangeCategory(event):any{
    const value = event.target.value;
    const isCheked = event.target.checked;
    this.arrCategory = [];
    
    this.productCategory = this.productCategory.map((el) => {
      if(el.nameCategory === value){
        el.selected = isCheked;
        return el
      } 
      return el
    }) 

    for (let i = 0; i < this.productCategory.length; i++) {
      if (this.productCategory[i].selected === true) {
        this.arrCategory.push(this.productCategory[i].nameCategory)
      }
    }
    
  }

  onChangePrice(event){
    const value = event.target.value;
    const isCheked = event.target.checked;
    this.arrPrice = [];
    
    this.productPrice = this.productPrice.map((el) => {
      if(el.valuePrice[0] === +value.split(",")[0] && el.valuePrice[1] === +value.split(",")[1]){
        el.selected = isCheked;
        return el
      } 
      
      return el
    })



    for (let i = 0; i < this.productPrice.length; i++) {
      if (this.productPrice[i].selected === true) {
        this.arrPrice.push(this.productPrice[i].valuePrice[0])
        this.arrPrice.push(this.productPrice[i].valuePrice[1])
      }
    }
    this.arrPrice.splice(1,this.arrPrice.length - 2)
    console.log(this.arrPrice);
    
    
  }

  addProduct(product:Products){
    console.log("ok");
    
    this.productService.addToCart(product)
  }

}
