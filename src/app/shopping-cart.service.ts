import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { Product } from './models/product';

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

  private async getOrCreateCartID() { // tslint:disable-line: typedef
    const cartID = localStorage.getItem('cartID');
    if (cartID) return cartID; // tslint:disable-line: curly

    const result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;
  }

  async addToCart(product: Product) { // tslint:disable-line: typedef
    const cartID = await this.getOrCreateCartID();
    const item$ = this.db.object('/shopping-carts/' + cartID + '/items/' + product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => { // tslint:disable-line: deprecation
      if (item.payload.exists()) {
        item$.update({
          quantity: (item.payload.val() as {quantity: number}).quantity + 1
        });
      } else {
        item$.set({
          product,
          quantity: 1
        });
      }
    });
  }
}
