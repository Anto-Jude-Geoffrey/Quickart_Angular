import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductService } from '../../quickKart-services/product-service/product.service';
import { IUser } from '../../../quickKart-interfaces/userLogin';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:IUser={EmailId:"", UserPassword:""};
  msg="";
  loading = false;

  constructor(private _productService: ProductService, private router:Router){}

  onSubmit() {
    this.loading = true;
    this._productService.onLogin(this.user).subscribe({
      next: data =>{
          console.log(data);
          localStorage.setItem("token",data.token)
          this.msg="Token Generated Successfully";
      },
      error: errorMsg => {console.log(errorMsg); this.msg=`Error: ${errorMsg}`;this.loading = false;},
      complete:()=> {this.loading = false;this.router.navigateByUrl('/Home');}
  })
}

  guestCredential()
  {
    this.user.EmailId="guestLogin@QuickKart.com"
    this.user.UserPassword="guest123"
  }
}