import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Products } from '../interface';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  products: Products[] = [];

  category:string = "All";
  
  nameCategory = new FormControl("");
  
  //для input range
  slider1: any;
  slider2: any;
  sliderItem: any;
  points: any;
  valueOne: number = 1000;
  valueTwo: number = 49000;
  sliderTrack: any;
  minGap: number = 3000;
  MAX_VALUE: number = 50000;

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }
  
  ngAfterViewInit() {
    this.sliderItem = document.querySelectorAll('.slider__item');
    this.points = document.querySelectorAll('.points');
    this.sliderItem[0].classList.add('_block');
    this.slider1 = document.getElementById('slider_1');
    this.slider1.value = 1000;
    this.slider2 = document.getElementById('slider_2');
    this.slider2.value = 49000;
    this.sliderTrack = document.querySelector('.slider__track');
    this.fillColor();
    this.sliderAuto(this.sliderItem);
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

  sliderAuto(arr: any[]) {
    let count = 0;
    let count1 = 1;
    for (let index = 0; index < arr.length; index++) {
      arr[index].classList.remove('_visible');
      arr[index].classList.remove('_hidden');
      this.points[index].classList.add('_dissable');
      this.points[index].classList.remove('_active');
    }
    arr[count].classList.add('_visible');
    this.points[count].classList.add('_active');
    arr[count1].classList.add('_hidden');
    count++;
    count1++;
    if (count > arr.length - 1) {
      count = 0;
    }
    if (count1 > arr.length - 1) {
      count1 = 0;
    }

    setInterval(() => {
      for (let index = 0; index < arr.length; index++) {
        arr[index].classList.remove('_visible');
        arr[index].classList.remove('_hidden');
        this.points[index].classList.add('_dissable');
        this.points[index].classList.remove('_active');
      }
      arr[count].classList.add('_visible');
      this.points[count].classList.add('_active');
      arr[count1].classList.add('_hidden');
      count++;
      count1++;
      if (count > arr.length - 1) {
        count = 0;
      }
      if (count1 > arr.length - 1) {
        count1 = 0;
      }
    }, 5000)
  }

  slideOne() {
    //проверка минимального шага
    if (+this.slider2.value - +this.slider1.value <= this.minGap) {
      this.slider1.value = +this.slider2.value - this.minGap;
    }
    this.valueOne = this.slider1.value;
    this.fillColor();
  }

  slideTwo() {
    if (+this.slider2.value - +this.slider1.value <= this.minGap) {
      this.slider2.value = +this.slider1.value + this.minGap;
    }
    this.valueTwo = this.slider2.value;
    this.fillColor();
  }
  
  fillColor() {
    let pointOne = (this.slider1.value / this.MAX_VALUE) * 100;
    let pointTwo = (this.slider2.value / this.MAX_VALUE) * 100;
    this.sliderTrack.style.background = `linear-gradient(to right, #C4C4C4 ${pointOne}%, #FEC341 ${pointOne}%, #FEC341 ${pointTwo}%, #C4C4C4 ${pointTwo}%)`;
  }

  addProduct(product:Products, event:any){
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

  setCategory() {
    let arr:[string, number, number] = [this.category, this.valueOne, this.valueTwo];
    sessionStorage.setItem("filter", JSON.stringify(arr));
    this.router.navigate(["/products"]);
  }
}
