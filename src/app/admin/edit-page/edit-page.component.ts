import { Component, OnInit } from '@angular/core';
import { Products } from '../../interface';
import { ProductService } from '../../product.service';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})

export class EditPageComponent implements OnInit {

  products: Products[] = [];

  currentProduct?: Products;

  productsName: string = "";

  form = new FormGroup({
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
  })

  nameProduct = new FormControl("");

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  //загрузка из fb snapshotChanges-метод возвращает данные с ключами
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

  setActiveProduct(product: Products): void {
    this.currentProduct = product;
    this.initializeForm();
  }

  deleteProduct(product: Products): void {
    if (product.key) {
      this.productService.delete(product.key);
    }
    this.retrieveProducts();
  }

  updateProduct(product: Products): void {
    const data = {
      name: this.form.value.name,
      price: this.form.value.price,
    };
    if (product.key) {
      this.productService.update(product.key, data);
      this.currentProduct = undefined;
      this.retrieveProducts();
    }
  }

  closeModal(): void {
    this.currentProduct = undefined;
  }

  initializeForm(): void {
    if (this.currentProduct) {
      this.form.setValue({
        name: this.currentProduct.name,
        price: this.currentProduct.price
      })
    }
  }
}
