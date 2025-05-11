import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../quickKart-services/product-service/product.service';
import { IProduct } from '../../../quickKart-interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  @ViewChild('dropdownContainer', { static: false }) dropdownContainer!: ElementRef<HTMLDivElement>;
  products:any[]=[];
  displayedProducts:any[]=[];
  current=0; pageSize=30;
  constructor(private _productService:ProductService){}
  ngOnInit(){
 this.getProduct();
  }

  ngAfterViewInit() {
  if (this.dropdownContainer) {
    this.dropdownContainer.nativeElement.addEventListener('scroll', () => {
      console.log('Scroll event detected!');
      this.onScroll();
    });
  } else {
    console.error('Dropdown container not found!');
  }
}


  getProduct()
  {
    // this._productService.getProducts().subscribe({
    //   next: data=> {this.products=data; this.loadMore();}
    // })
    this.products=Array.from({length:100000}).map((value,i)=> `Items #${i}`);
    this.loadMore();
  }

  loadMore(){
    let nextItem=this.products.slice(this.current,this.pageSize+this.current);
    this.displayedProducts.push(...nextItem)
    this.current+=this.pageSize;
  }

  onScroll() {
    alert("Scroll event detected!");
    const container = this.dropdownContainer.nativeElement;
    console.log(`ScrollTop: ${container.scrollTop}, ClientHeight: ${container.clientHeight}, ScrollHeight: ${container.scrollHeight}`);

    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
      console.log('Loading more items...');
      this.loadMore();
    }
  }
}
