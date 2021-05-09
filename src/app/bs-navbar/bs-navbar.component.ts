import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from './../models/app-user';

@Component({
  selector: 'bs-navbar', // tslint:disable-line: component-selector
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnDestroy {
  appUser: AppUser;
  private sub: Subscription;

  constructor(private auth: AuthService) {
    this.sub = auth.appUser$.subscribe(appUser => this.appUser = appUser); // tslint:disable-line: deprecation
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }
}
