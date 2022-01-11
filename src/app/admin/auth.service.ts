import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuth:boolean = false;

  constructor(private http: HttpClient) { }

  login( admin:{email:string, password: string} ) {
    this.isAuth = true;
    localStorage.setItem("admin", JSON.stringify(this.isAuth));


  //посмотреть нужно ли чистить локал через определенное время

    setTimeout(() => {
      localStorage.removeItem("admin");
    }, 3600000);
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, admin);
  }

  logout() {
    this.isAuth = false;
    localStorage.removeItem("admin");
  }

  get adminLogin():boolean {
    if(localStorage.getItem("admin")){
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated() {
    return this.adminLogin;
  }

}
