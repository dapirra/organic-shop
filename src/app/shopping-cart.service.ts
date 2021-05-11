import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartID = await this.getOrCreateCartID();
    return this.db.object('/shopping-carts/' + cartID).valueChanges().pipe(
      map(x => {
        return new ShoppingCart((x as {items: any}).items);
      })
    );
  }

  async addToCart(product: Product): Promise<void> {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    this.updateItem(product, -1);
  }

  async clearCart(): Promise<void> {
    const cartID = await this.getOrCreateCartID();
    this.db.object('/shopping-carts/' + cartID + '/items').remove();
  }

  private create() { // tslint:disable-line: typedef
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartID: string, productID: string): AngularFireObject<unknown> {
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productID);
  }

  private async getOrCreateCartID(): Promise<string> {
    const cartID = localStorage.getItem('cartID');
    if (cartID) { return cartID; }

    const result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number): Promise<void> {
    const cartID = await this.getOrCreateCartID();
    const item$ = this.getItem(cartID, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => { // tslint:disable-line: deprecation
      const itemValue = item.payload.val() as {quantity: number};
      const quantity = (itemValue?.quantity || 0) + change;

      if (quantity === 0) {
        item$.remove();
        return;
      }

      item$.update({
        title: product.title,
        imageURL: product.imageURL,
        price: product.price,
        quantity
      });
    });
  }

}
