import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  user$: Observable<firebase.default.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  logout(): void {
    this.afAuth.signOut();
  }

}
