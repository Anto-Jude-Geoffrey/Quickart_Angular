import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { ViewProductsComponent } from './view-products/view-products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ViewProductsComponent, HttpClientModule,CommonModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !event.urlAfterRedirects.includes('/Login');
      });
  }
}
