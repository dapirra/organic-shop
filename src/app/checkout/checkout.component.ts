import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from './../models/order';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: any = {};
  cart: ShoppingCart;
  userID: string;
  cardSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    const cart$ = await this.shoppingCartService.getCart();
    this.cardSubscription = cart$.subscribe(cart => this.cart = cart); // tslint:disable-line: deprecation
    this.userSubscription = this.authService.user$.subscribe(user => this.userID = user.uid);  // tslint:disable-line: deprecation
  }

  ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(): Promise<void> {
    const order = new Order(this.userID, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
