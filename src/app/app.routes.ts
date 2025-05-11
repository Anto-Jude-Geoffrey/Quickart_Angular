import { Routes } from '@angular/router';
import { ViewProductsComponent } from './view-products/view-products.component';
import { pageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { AddProductComponent } from './add-products/add-products.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'Login',component:LoginComponent},
    {path:'Home',loadComponent:()=> import('./welcome/welcome.component').then(m=>m.WelcomeComponent)},
    {path:'viewProducts', component:ViewProductsComponent},
    {path:'addProducts', component:AddProductComponent},
    {path:'', redirectTo:'Login',pathMatch:'full'},
    {path:'**',component:pageNotFoundComponent}
];
