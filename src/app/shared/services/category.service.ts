import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<unknown[]> {
    return this.db.list('/categories',
      query => query.orderByChild('name')
    ).snapshotChanges();
  }
}
