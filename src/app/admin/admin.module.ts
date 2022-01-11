import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AddPageComponent } from './add-page/add-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { SearchPipe } from "./search.pipe";

@NgModule({
    declarations: [
        AdminPageComponent,
        LoginPageComponent,
        EditPageComponent,
        AddPageComponent,
        SearchPipe
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([
            {path:'', component: AdminPageComponent, children: [
                {path:'', redirectTo: 'login', pathMatch: 'full' },
                {path:'login', component: LoginPageComponent},
                {path:'edit', component: EditPageComponent, canActivate: [AuthGuard]},
                {path:'add', component: AddPageComponent, canActivate: [AuthGuard]}
            ]}
        ])
    ],
    exports: [RouterModule],
    providers: [AuthService]
})

export class AdminModule{
    
}