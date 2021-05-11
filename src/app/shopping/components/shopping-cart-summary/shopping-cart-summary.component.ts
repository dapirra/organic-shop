import { Component, Input } from '@angular/core';
import { ShoppingCart } from '@shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary', // tslint:disable-line: component-selector
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart: ShoppingCart; // tslint:disable-line: no-input-rename
}
