import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Products } from 'src/app/interface'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currentProduct?: Products;

  cartProducts: Products [] = [];

  private dbPath = '/products';

  productsRef!: AngularFireList<Products>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Products> {
    return this.productsRef;
  }

  create(product: Products) {
    return this.productsRef.push(product);
  }

  update(key: string, value: any) {
    return this.productsRef.update(key, value);
  }

  delete(key: string) {
    return this.productsRef.remove(key);
  }

  addToCart(product:Products){
    this.cartProducts.push(product);
  }
}
