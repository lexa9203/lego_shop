import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './admin/interface';

@Pipe({
  name: 'sortproducts'
})
export class SortproductsPipe implements PipeTransform {

  transform(products: Products[], productsName: string[] = ['Creator', 'Speed', 'City', 'Batman', 'Technic'], productPrice:number[] = [0,50000]): any {

    let arr: Products[] = []

    if(productsName.length === 0 ) {
      productsName = ['Creator', 'Speed', 'City', 'Batman', 'Technic']
    }
    if(productPrice.length === 0 ) {
      productPrice = [0,50000]
    }

    if (products) {
      products.filter((product) => {
        for (let i = 0; i < productsName.length; i++) {
          if (productsName[i].toLowerCase() == product.category.toLowerCase()) {
            arr.push(product)
          }
        }
      })
      /* console.log(arr);
      console.log(productPrice); */
      
      arr = arr.filter((el) => {
        return el.price >= productPrice[0] && el.price <= productPrice[1]
      })
      return arr
    }






  }

}
