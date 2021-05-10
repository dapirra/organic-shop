import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
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
  subscription: Subscription;
  rows: any[];
  ColumnMode = ColumnMode;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(products => { // tslint:disable-line: deprecation
      this.rows = this.convertProductsToRows(products);
      return this.products = products;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string): void {
    this.rows = query ?
      this.convertProductsToRows(this.products.filter(
        p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())
      )) :
      this.convertProductsToRows(this.products);
  }

  convertProductsToRows(products): any {
    return products.map(p => {
      const product = p.payload.val() as Product;
      return {
        title: product.title,
        price: product.price,
        edit: '/admin/products/' + p.key
      };
    });
  }
}
