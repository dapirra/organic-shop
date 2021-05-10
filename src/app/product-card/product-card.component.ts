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
  @Input('shopping-cart') shoppingCart; // tslint:disable-line: no-input-rename

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  getQuantity(): number {
    if (!this.shoppingCart) return 0; // tslint:disable-line: curly
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
