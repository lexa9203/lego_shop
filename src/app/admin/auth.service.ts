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
    setTimeout(() => {
      sessionStorage.removeItem("admin");
    }, 3600000);
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, admin);
  }

  logout() {
    this.isAuth = false;
    sessionStorage.removeItem("admin");
  }

  get adminLogin():boolean {
    if(sessionStorage.getItem("admin")){
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated() {
    return this.adminLogin;
  }

}
