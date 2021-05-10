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

  async getCart() { // tslint:disable-line: typedef
    const cartID = await this.getOrCreateCartID();
    return this.db.object('/shopping-carts/' + cartID);
  }

  private getItem(cartID: string, productID: string) { // tslint:disable-line: typedef
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productID);
  }

  private async getOrCreateCartID(): Promise<string> { // tslint:disable-line: typedef
    const cartID = localStorage.getItem('cartID');
    if (cartID) return cartID; // tslint:disable-line: curly

    const result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;
  }

  async addToCart(product: Product): Promise<void> {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    this.updateItemQuantity(product, -1);
  }

  async updateItemQuantity(product: Product, change: number): Promise<void> {
    const cartID = await this.getOrCreateCartID();
    const item$ = this.getItem(cartID, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => { // tslint:disable-line: deprecation
      const itemValue = item.payload.val() as {quantity: number};
      item$.update({
        product,
        quantity: (itemValue?.quantity || 0) + change
      });
    });
  }
}
