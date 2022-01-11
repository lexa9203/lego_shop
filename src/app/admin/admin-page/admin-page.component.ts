import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService ) {  }
    
  ngOnInit(): void {
    
  }

  logout () {
    this.auth.logout();
    this.router.navigate(["/admin/login"]);
  }

  log(){
    return this.auth.isAuthenticated();
  }
  

}
