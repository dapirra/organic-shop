import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() { // tslint:disable-line: typedef
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartID: string) { // tslint:disable-line: typedef
    return this.db.object('/shopping-carts/' + cartID);
  }

  private getOrCreateCart() { // tslint:disable-line: typedef
    const cartID = localStorage.getItem('cartID');
    if (!cartID) {
      this.create().then(result => {
        localStorage.setItem('cardID', result.key);
        return this.getCart(result.key);
      });
    } else {
      return this.getCart(cartID);
    }
  }
}
