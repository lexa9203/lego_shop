import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number): unknown {
    let str = value.toString();
    let arr = str.split('');
    arr.splice(-3, 0, ' ');
    return arr.join('');
  }

}
