import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@shared/models/product';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity', // tslint:disable-line: component-selector
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product; // tslint:disable-line: no-input-rename
  @Input('shopping-cart') shoppingCart; // tslint:disable-line: no-input-rename
  @Input() collapseText = false;
  _hideText: boolean; // tslint:disable-line: variable-name

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.onResize();
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product);
  }

  onResize(event?: Event): void {
    this._hideText = this.collapseText && innerWidth < 768;
  }

}
