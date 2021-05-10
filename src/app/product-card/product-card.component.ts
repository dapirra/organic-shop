import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card', // tslint:disable-line: component-selector
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product; // tslint:disable-line: no-input-rename

  constructor() { }

}
