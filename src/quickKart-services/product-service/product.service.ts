import { Injectable } from '@angular/core';
import { IProduct } from '../../../quickKart-interfaces/product';
import { ICategory } from '../../../quickKart-interfaces/category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { IUser } from '../../../quickKart-interfaces/userLogin';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:IProduct[]=[];
  categories:ICategory[]=[];
  constructor(private http:HttpClient) { }

  onLogin(obj:IUser):Observable<any>
  {
    return this.http.post<any>("https://app-quickart-web-eastus-dev-001-ataradd2akhehseu.canadacentral-01.azurewebsites.net/api/Product/Login",obj);
  }

  getProducts():Observable<IProduct[]>
  {
    let tempvar=this.http.get<IProduct[]>("https://app-quickart-web-eastus-dev-001-ataradd2akhehseu.canadacentral-01.azurewebsites.net/api/Product/GetAllProducts").pipe(catchError(this.errorHandler));
    return tempvar;
  }

  getCategories():Observable<ICategory[]>
  {
    let tempvar=this.http.get<ICategory[]>("https://app-quickart-web-eastus-dev-001-ataradd2akhehseu.canadacentral-01.azurewebsites.net/api/Product/GetAllCategories").pipe(catchError(this.errorHandler));
    return tempvar;
  }

  getProductDetails(ProductId:string): Observable<IProduct[]>
  {
    let params = new HttpParams().set('ProductId',ProductId);
    //console.log(params);
    return this.http.get<IProduct[]>("https://app-quickart-web-eastus-dev-001-ataradd2akhehseu.canadacentral-01.azurewebsites.net/api/Product/GetProductDetails", {params});
  }

  addProducts(product:IProduct):Observable<any>
  {
    return this.http.post("https://app-quickart-web-eastus-dev-001-ataradd2akhehseu.canadacentral-01.azurewebsites.net/api/Product/AddProducts",product);
  }

  updateProductQuantity(product:IProduct):Observable<any>
  {
    return this.http.put("https://app-quickart-web-eastus-dev-001-ataradd2akhehseu.canadacentral-01.azurewebsites.net/api/Product/UpdateProduct",product);
  }

  deleteProduct(productId:string):Observable<any>
  {
    let params = new HttpParams().set('ProductId',productId);
    return this.http.delete("https://app-quickart-web-eastus-dev-001-ataradd2akhehseu.canadacentral-01.azurewebsites.net/api/Product/DeleteProduct",{params});
  }

  errorHandler (error: HttpErrorResponse)
  {
    console.error(error);
    return throwError(error.message || "Server Error")
  }


}
