import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../../../quickKart-interfaces/user';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../quickKart-services/product-service/product.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
msg: string = '';

user:IUser = {
    EmailId: '',
    UserPassword: '',
    RoleId: '',   
    Gender: '',
    DateOfBirth: '',
    Address: ''
  };

  constructor(private _productService:ProductService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Call your service to register the user here
      console.log('Registering user:', this.user);
      this._productService.addUsers(this.user).subscribe({
        next:data=>console.log(data),
        error:error=>{console.log(error);this.msg=`Error: ${error}`},
        complete:()=>this.msg="Registration successful! New User Added..."
      })
    } else {
      this.msg = "Please fill all required fields correctly.";
    }
  }
}
