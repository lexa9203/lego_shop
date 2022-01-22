import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Products } from '../interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  btn:any;

  products: Products[] = [];

  productCategory = [
    { id: 1, selected: false, category: 'Creator' },
    { id: 2, selected: false, category: 'Speed' },
    { id: 3, selected: false, category: 'City' },
    { id: 4, selected: false, category: 'Batman' },
    { id: 5, selected: false, category: 'Technic' }
  ];

  productPrice = [
    { id: 6, selected: false, price: [0,5000] },
    { id: 7, selected: false, price: [5000,15000] },
    { id: 8, selected: false, price: [15000,25000] },
    { id: 9, selected: false, price: [25000,50000] }
  ];

  arrCategory:string[] = [];

  arrPrice:number[] = [];

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.retrieveProducts();
    this.renderingSort();
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

  onChangeCategory(event: { target: any}){
    const value = event.target.value;
    const isCheked = event.target.checked;
    this.arrCategory = [];
    this.productCategory = this.productCategory.map((el) => {
      if(el.category === value){
        el.selected = isCheked;
        return el;
      } 
      return el;
    }) 

    for (let i = 0; i < this.productCategory.length; i++) {
      if (this.productCategory[i].selected === true) {
        this.arrCategory.push(this.productCategory[i].category);
      }
    }
  }

  onChangePrice(event: { target: any }) {
    const value = event.target.value;
    const isCheked = event.target.checked;
    this.arrPrice = [];
    this.productPrice = this.productPrice.map((el) => {
      if(el.price[0] === +value.split(",")[0] && el.price[1] === +value.split(",")[1]){
        el.selected = isCheked;
        return el;
      } 
      return el;
    })

    for (let i = 0; i < this.productPrice.length; i++) {
      if (this.productPrice[i].selected === true) {
        this.arrPrice.push(this.productPrice[i].price[0]);
        this.arrPrice.push(this.productPrice[i].price[1]);
      }
    }
    this.arrPrice.splice(1,this.arrPrice.length - 2)
  }

  addProduct(product:Products,event:any){
    this.productService.addToCart(product);
    event.path[0].innerHTML = "в корзине";
    event.path[0].style.backgroundColor = "#3f3b8b";
    event.path[0].style.color = "#fff";
    setTimeout(() => {
      event.path[0].innerHTML = "купить";
      event.path[0].style.backgroundColor = "#FEC341";
      event.path[0].style.color = "#000";
    }, 5000);
  }

  renderingSort(){
    if (sessionStorage.getItem("filter")) {
      let array:string[] = [];
      array = JSON.parse(sessionStorage.getItem("filter") || '{}');
      if (array[0] === "All") {
        this.arrCategory = ['Creator', 'Speed', 'City', 'Batman', 'Technic'];
        for (let i = 0; i < this.productCategory.length; i++) {
          this.productCategory[i].selected = true;
        }
      } else {
        this.arrCategory.push(array[0]);
        for (let i = 0; i < this.productCategory.length; i++) {
          const element = this.productCategory[i].category;
          if (element === array[0].toString()) {
            this.productCategory[i].selected = true;
          }
        }
      }

      //init price
      for (let i = 1; i < array.length; i++) {
        const element = +array[i];
        this.arrPrice.push(element);
      }
    }
    sessionStorage.removeItem("filter");
  }

}
