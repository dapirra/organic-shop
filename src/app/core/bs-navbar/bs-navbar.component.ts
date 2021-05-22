import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '@shared/models/app-user';
import { ShoppingCart } from '@shared/models/shopping-cart';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar', // tslint:disable-line: component-selector
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  category: string;
  cart$: Observable<ShoppingCart>;
  categories$: Observable<unknown[]>;
  private appUserSub: Subscription;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    ) {
    }

    async ngOnInit(): Promise<void> {
      this.appUserSub = this.auth.appUser$.subscribe(appUser => this.appUser = appUser); // tslint:disable-line: deprecation
      this.cart$ = (await this.shoppingCartService.getCart());
      this.categories$ = this.categoryService.getAll();
      this.route.queryParamMap.subscribe(params => this.category = params.get('category'));
  }

  ngOnDestroy(): void {
    this.appUserSub.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }

  get hideCategories(): boolean {
    return location.pathname !== '/';
  }
}
