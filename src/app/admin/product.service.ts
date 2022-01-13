import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Products } from 'src/app/admin/interface'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  currentProduct?: Products;

  cartProducts: Products [] = []

  private dbPath = '/products';

  productsRef!: AngularFireList<Products>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Products> {
    return this.productsRef;
  }

  create(product: Products): any {
    return this.productsRef.push(product);
  }

  update(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }

  addToCart(product:Products){
    this.cartProducts.push(product)
  }
  


}
