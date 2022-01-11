import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Products } from '../interface';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  imgSrc!: string;

  selectedImage: any = null;

  form = new FormGroup({
    category: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    photo: new FormControl("", Validators.required)
  })

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
  }

  onFileChanged(event:any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.selectedImage = null;
    }
    
  }

  submit() {
    if(this.form.invalid){
      return;
    }
    
    const product:Products = {
      category: this.form.value.category,
      name: this.form.value.name,
      price: this.form.value.price,
      photo: this.imgSrc
    }
    
    this.productsService.create(product);
    this.imgSrc = "";
    this.form.reset();
    
  }



}
