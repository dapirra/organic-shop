import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { CategoryService } from './../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories$;
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    productService.getAll().pipe(switchMap(
      products => {
        this.products = products;
        return route.queryParamMap;
      })).subscribe(params => { // tslint:disable-line: deprecation
        this.category = params.get('category');

        this.filteredProducts = this.category ?
          this.products.filter(p => p.payload.val().category === this.category) :
          this.products;
      });

    this.categories$ = categoryService.getAll();
  }
}
