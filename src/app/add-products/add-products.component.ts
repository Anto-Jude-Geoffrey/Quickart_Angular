import { Component, OnInit } from "@angular/core";
import { IProduct } from "../../../quickKart-interfaces/product";
import { ProductService } from "../../quickKart-services/product-service/product.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ICategory } from "../../../quickKart-interfaces/category";

@Component({
    selector:"app-add-products",
    standalone:true,
    templateUrl:"./add-products.component.html",
    imports:[FormsModule,CommonModule],
    styleUrl:"./add-products.component.css"
})

export class AddProductComponent implements OnInit
{
    msg?:string;
    productArr:IProduct[]=[];
    lastID?:number;
    availableId?:string;
    categories?:ICategory[]=[];
    product: IProduct={
        productId:"",
        productName:"",
        categoryId:0,
        price:0,
        quantityAvailable:0
    };
    constructor(private _productService: ProductService){}
    ngOnInit(): void {
        this.getProducts();
        this.getCategory();
        
    }

    addProducts()
    {
        this._productService.addProducts(this.product).subscribe({
            next: data =>{
                console.log(data);
                this.msg="Data Added Successfully in Products";
            },
            error: errorMsg => console.log(errorMsg),
            complete:()=> console.log("POST Successfull")
        })
    }

    getProducts()
    {
        this._productService.getProducts().subscribe({
            next: data => {
                this.productArr=data;
            },
            error: errorMsg => console.log(errorMsg),
            complete: ()=> console.log("Get Products Successful")
        })
    }

    getCategory()
    {
        this._productService.getCategories().subscribe({
            next: data => this.categories=data  
        })
    }
    categoryAssign(CategoryID:string)
    {
        this.product.categoryId=Number(CategoryID)
    }

    searchLastProduct()
  {
    if(this.productArr.length>0)
    {
      this.lastID=Number(this.productArr[this.productArr.length-1].productId.substring(1));
      this.availableId="P"+(this.lastID+1).toString()
    }
    else
    {
      console.log("No Element in Products")
    }
  }

}