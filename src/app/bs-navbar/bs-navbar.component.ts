import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  shoppingCartItemCount: number;
  private appUserSub: Subscription;
  private cartSub: Subscription;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    this.appUserSub = this.auth.appUser$.subscribe(appUser => this.appUser = appUser); // tslint:disable-line: deprecation
    const cart$ = await this.shoppingCartService.getCart();
    this.cartSub = cart$.valueChanges().subscribe(cart => { // tslint:disable-line: deprecation
      this.shoppingCartItemCount = 0;
      for (const productID in cart.items) { // tslint:disable-line: forin
        this.shoppingCartItemCount += cart.items[productID].quantity;
      }
    });
  }

  ngOnDestroy(): void {
    this.appUserSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }
}
