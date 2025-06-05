import { Routes } from '@angular/router';
import { ViewProductsComponent } from './view-products/view-products.component';
import { pageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { AddProductComponent } from './add-products/add-products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { DeleteComponent } from './delete/delete.component';

export const routes: Routes = [
    {path:'Login',component:LoginComponent},
    {path:'Home',loadComponent:()=> import('./welcome/welcome.component').then(m=>m.WelcomeComponent)},
    {path:'viewProducts', component:ViewProductsComponent},
    {path:'addProducts', component:AddProductComponent},
    {path:'Register', component:RegisterComponent},
    {path:'AboutUs', component:AboutComponent},
    {path:'DeleteUser', component:DeleteComponent},
    {path:'', redirectTo:'Login',pathMatch:'full'},
    {path:'**',component:pageNotFoundComponent}
];
