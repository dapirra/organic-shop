import { Component, Input } from '@angular/core';
import { Product } from '@shared/models/product';
import { ShoppingCart } from '@shared/models/shopping-cart';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'product-card', // tslint:disable-line: component-selector
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: Product; // tslint:disable-line: no-input-rename
  @Input('show-actions') showActions = true; // tslint:disable-line: no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart; // tslint:disable-line: no-input-rename

  constructor(private cartService: ShoppingCartService) { }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

}
