import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  navMenu: any;

  constructor(
    private router: Router,
    private auth: AuthService ) {  }
    
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.navMenu = document.querySelector('.menu__list');
  }

  //выход из админки
  logout () {
    this.auth.logout();
    this.closeModal();
    this.router.navigate(["/admin/login"]);
  }
  
  //проверка аунтифицирован ли админ
  authenticated(){
    return this.auth.isAuthenticated();
  }

  openModal() {
    this.navMenu.classList.add('open');
  }

  closeModal() {
    this.navMenu.classList.remove('open');
  }
}
