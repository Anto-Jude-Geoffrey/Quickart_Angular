import { Component } from '@angular/core';
import { ProductService } from '../../quickKart-services/product-service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  emailId: string = '';
  password: string = '';
  message: string = '';
  constructor(private productService: ProductService) {}
deleteUser() {
    this.productService.deleteUser(this.emailId,this.password).subscribe({
      next:data=> {console.log(data);this.message="User Deleted Successfully"},
      error: msg=>{console.log(msg);this.message = 'Failed to delete user. Please check credentials.';},
      complete: ()=> {console.log("Delete User Successful");}
    })
  }
}
