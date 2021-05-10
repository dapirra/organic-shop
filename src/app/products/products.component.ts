import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
  ) {
    productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })).subscribe(params => { // tslint:disable-line: deprecation
        this.category = params.get('category');

        this.filteredProducts = this.category ?
          this.products.filter(p => p.payload.val().category === this.category) :
          this.products;
      });
  }
}
