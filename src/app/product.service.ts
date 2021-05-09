import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

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
}
