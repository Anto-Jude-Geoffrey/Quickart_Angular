import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IProduct } from '../../../quickKart-interfaces/product';
import { ICategory } from '../../../quickKart-interfaces/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../quickKart-services/product-service/product.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit {

  products: IProduct[]=[];
  categories:ICategory[]=[];
  filteredProducts:any[]=[];
  searchProduct: any[]=[];
  search!:string;
  //display:IProduct[]=[{productId:"P101",productName:"Lamborghini Gallardo Spyder",categoryId:1,price:18000000,quantityAvailable:10}];
  imgBuy:string="";
  imgSell:String="";
  errMsg: string="";
  showMsgDiv: boolean = false;
  constructor(private _productService:ProductService, private ref: ChangeDetectorRef) { }
  ngOnInit() {
    //this.getProductDetails("P102");
    this.getProducts();
    //this.getProductDetails("P101");
    this.filteredProducts=this.products;
    this.searchProduct=this.products;
    this.imgBuy="../../assets/quickKart-images/Buy.png";
    this.imgSell="../../assets/quickKart-images/Sell.png"
    if (this.products == null)
    {
      this.showMsgDiv = true;
    }
  }

  getProducts() {
    this._productService.getProducts().subscribe({
      next: responseProductData => {
        this.products = responseProductData;
        this.filteredProducts = responseProductData;
        this.showMsgDiv = false;
        this.getCategories();},
        error: responseProductError => {
        this.products=[];
        this.errMsg=responseProductError;
        console.log(this.errMsg);
      },
      complete: () => console.log("GetProducts Method Executed Successfully")
  });
  }
  getCategories() {
    this._productService.getCategories().subscribe({
      next: responseCategoryData =>
        {this.categories = responseCategoryData;
          //this.getProductDetails("P101");
        }, 
      error: responseCategoryError => {
          this.categories=[];
          this.errMsg=responseCategoryError;
          console.log(this.errMsg);
        },
        complete: () => console.log("GetCategories Method Executed Successfully")
  });
  }

  getProductDetails(ProductID:string)
  {
    this._productService.getProductDetails(ProductID).subscribe({
      next: responseParamData => 
        {this.searchProduct=[responseParamData];
          this.filteredProducts=[responseParamData];
          //console.log(responseParamData);
          //console.log(this.display);
          this.ref.detectChanges();
          //this.display=Object.values(responseParamData);
          //this.searchProductByCategory("search")
        },
      error: responseParamError => {
        this.searchProduct=[];
        this.errMsg=responseParamError;
        console.log(this.errMsg);
      },
      complete: () => {console.log("GetProductDetails Method Executed Successfully");
      }
  });
  
  }

  updateBuyProducts(productUpdate:IProduct)
  {
    productUpdate.quantityAvailable-=1;
    this._productService.updateProductQuantity(productUpdate).subscribe({
      next:data=> {console.log(data);},
      error: msg=>{console.log(msg);},
      complete: ()=> {console.log("Buy Product Successfull");}
    })
  }

  updateSellProducts(productUpdate:IProduct)
  {
    productUpdate.quantityAvailable+=1;
    this._productService.updateProductQuantity(productUpdate).subscribe({
      next:data=> {console.log(data);},
      error: msg=>{console.log(msg);},
      complete: ()=> {console.log("Sell Product Successfull");}
    })
  }

  deleteProduct(productId: string)
  {
    this._productService.deleteProduct(productId).subscribe({
      next:data=> {console.log(data);
        this.ref.detectChanges();
        
      },
      error: msg=>{console.log(msg);},
      complete: ()=> {console.log("Delete Product Successful");}
    })
  }


  searchProductByCategory(categoryId:string)
  {
    this.filteredProducts=this.products;
    if(categoryId=="0")
    {
      this.filteredProducts=this.products;
    }
    else
    {
      this.filteredProducts=this.filteredProducts.filter(prod => prod.categoryId.toString()==categoryId);
    }
  }


}
