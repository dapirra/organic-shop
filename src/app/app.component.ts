import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private sub: Subscription;

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    this.sub = auth.user$.subscribe(user => { // tslint:disable-line: deprecation
      if (user) {
        userService.save(user);

        const returnURL = localStorage.getItem('returnURL');
        router.navigateByUrl(returnURL);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
