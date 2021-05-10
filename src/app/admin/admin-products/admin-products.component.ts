import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  rows;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => { // tslint:disable-line: deprecation
      this.rows = products.map(p => {
        const product = p.payload.val() as Product;
        return {
          title: product.title,
          price: product.price,
          edit: `<a routerLink="/admin/products/${p.key}">Edit</a>`
        };
      });
      return this.filteredProducts = this.products = products;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string): void {
    this.filteredProducts = query ?
      this.products.filter(
        p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())
      ) :
      this.products;
  }
}
