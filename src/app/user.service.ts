import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.default.User): void {
    this.db.object('/user/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }
}
