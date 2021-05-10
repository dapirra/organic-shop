import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) { // tslint:disable-line: typedef
    return this.db.list('/products').push(product);
  }

  getAll() { // tslint:disable-line: typedef
    return this.db.list('/products').snapshotChanges();
  }

  get(productID) { // tslint:disable-line: typedef
    return this.db.object('/products/' + productID).valueChanges();
  }

  update(productID, product) { // tslint:disable-line: typedef
    return this.db.object('/products/' + productID).update(product);
  }

  delete(productID) { // tslint:disable-line: typedef
    return this.db.object('/products/' + productID).remove();
  }

  toProduct(snapshotProduct: SnapshotAction<unknown>[]): Product[] {
    return snapshotProduct.map(p => {
      const product = p.payload.val() as Product;
      return {
        key: p.key,
        ...product
      };
    });
  }
}
