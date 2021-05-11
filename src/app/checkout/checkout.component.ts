import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
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

  placeOrder(): void {
    const order = {
      userId: this.userID,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageURL: i.imageURL,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        };
      })
    };

    this.orderService.storeOrder(order);
  }
}
