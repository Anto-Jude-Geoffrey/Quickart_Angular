import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductService } from '../../quickKart-services/product-service/product.service';
import { IUser } from '../../../quickKart-interfaces/userLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:IUser={EmailId:"", UserPassword:""};
  msg="";

  constructor(private _productService: ProductService, private router:Router){}

  onSubmit() {
    this._productService.onLogin(this.user).subscribe({
      next: data =>{
          console.log(data);
          localStorage.setItem("token",data.token)
          this.msg="Token Generated Successfully";
      },
      error: errorMsg => {console.log(errorMsg); this.msg="Username or Password is Wrong"},
      complete:()=> this.router.navigateByUrl('/Home')
  })

}
}