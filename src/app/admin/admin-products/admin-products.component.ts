import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Product } from '@shared/models/product';
import { ProductService } from './../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  rows: any[];
  ColumnMode = ColumnMode;
  subscription: Subscription;

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
    this.rows = this.convertProductsToRows(query ?
      this.products.filter(
        p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())
      ) :
      this.products
    );
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
