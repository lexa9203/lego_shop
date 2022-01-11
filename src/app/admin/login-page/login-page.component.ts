import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})



export class LoginPageComponent implements OnInit {
  
  email:string = "";

  password:string = "";

  form!:FormGroup;
  
  constructor(
    private router: Router,
    private auth: AuthService
    ) { }
  
  ngOnInit():void {
    this.form = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required, 
        Validators.pattern('^([0-9a-zA-Z#$%&+-/=?~])+@([0-9a-z^.])+\.([a-z]{2,5})$')
      ]),
      password: new FormControl(this.password, [
        Validators.required, 
        Validators.minLength(8)
      ]),
    })
  }

  myValidForm() {
    if(this.form.invalid){
      return
    }

    const admin = {
      email:this.form.value.email,
      password:this.form.value.password
    }

    this.auth.login(admin).subscribe(() => {
      this.form.reset;
      this.router.navigate(["/admin/add"]);
    })

    this.auth.isAuthenticated();
  } 
  
}
