import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private sub: Subscription;

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    this.sub = auth.user$.subscribe(user => { // tslint:disable-line: deprecation
      if (!user) { return; }
      userService.save(user);

      const returnURL = localStorage.getItem('returnURL');
      if (returnURL) {
        router.navigateByUrl(returnURL);
        localStorage.removeItem('returnURL');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
