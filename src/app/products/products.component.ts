import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from './../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService,
  ) {
    productService.getAll().pipe(
      switchMap(snapProducts => {
        this.products = productService.toProduct(snapProducts);
        return route.queryParamMap;
      })).subscribe(params => { // tslint:disable-line: deprecation
        this.category = params.get('category');

        this.filteredProducts = this.category ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }

  async ngOnInit(): Promise<void> {
    this.subscription = (await this.shoppingCartService.getCart())
    .valueChanges().subscribe(cart => this.cart = cart); // tslint:disable-line: deprecation
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
