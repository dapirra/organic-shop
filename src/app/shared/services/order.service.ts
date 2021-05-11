import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) { // tslint:disable-line: typedef
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<unknown> {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userID: string): Observable<unknown> {
    return this.db.list('/orders',
      query => query.orderByChild('userID').equalTo(userID)
    ).valueChanges();
  }

}
