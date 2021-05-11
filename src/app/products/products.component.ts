import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '@shared/models/product';
import { ProductService } from '@shared/services/product.service';
import { ShoppingCart } from '@shared/models/shopping-cart';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(): void {
    this.productService.getAll().pipe(
      switchMap(snapProducts => {
        this.products = this.productService.toProduct(snapProducts);
        return this.route.queryParamMap;
      })).subscribe(params => { // tslint:disable-line: deprecation
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter(): void {
    this.filteredProducts = this.category ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
