import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.css']
})
export class GeneralPageComponent implements OnInit {

  navMenu: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.navMenu = document.querySelector('.menu__list');
  }

  openModal() {
    this.navMenu.classList.add('open');
  }

  closeModal() {
    this.navMenu.classList.remove('open');
  }
}
