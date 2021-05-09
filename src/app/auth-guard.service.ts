import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(map(user => {
      if (user) return true; // tslint:disable-line: curly

      this.router.navigate(['/login']);
      return false;
    }));
  }
}
