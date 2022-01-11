import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { GeneralPageComponent } from './general-page/general-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const routes: Routes = [
  {
    path:'', component: GeneralPageComponent, children: [
      {path:'', component: MainPageComponent},
      {path:'products', component: ProductsPageComponent},
      {path:'cart', component: CartPageComponent}
    ]
  },
  {
    path:'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
