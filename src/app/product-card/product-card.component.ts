import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from './../shopping-cart.service';

@Component({
  selector: 'product-card', // tslint:disable-line: component-selector
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product; // tslint:disable-line: no-input-rename
  @Input('show-actions') showActions = true; // tslint:disable-line: no-input-rename

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product): void {
    const cartID = localStorage.getItem('cartID');
    if (!cartID) {
      this.cartService.create().then(result => {
        localStorage.setItem('cardID', result.key);
        // Add product to cart
      });
    } else {
      // Add product to cart
    }
  }
}
