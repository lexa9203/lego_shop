import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Products[], productsName = ""): any {
    if(productsName.trim() === "") {
      return products;
    }  
    return products.filter((product) => {
      return product.name.toLowerCase().includes(productsName.toLowerCase())
    }) 
  }

}
