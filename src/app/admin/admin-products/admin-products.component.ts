import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => this.filteredProducts = this.products = products); // tslint:disable-line: deprecation
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
