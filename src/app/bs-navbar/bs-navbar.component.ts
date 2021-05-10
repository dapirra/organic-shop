import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from './../models/app-user';
import { ShoppingCartService } from './../shopping-cart.service';

@Component({
  selector: 'bs-navbar', // tslint:disable-line: component-selector
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  private appUserSub: Subscription;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    this.appUserSub = this.auth.appUser$.subscribe(appUser => this.appUser = appUser); // tslint:disable-line: deprecation
    this.cart$ = (await this.shoppingCartService.getCart());
  }

  ngOnDestroy(): void {
    this.appUserSub.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }
}
