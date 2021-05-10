import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {}

  get totalItemsCount(): number {
    let count = 0;
    for (const productID in this.items) { // tslint:disable-line: forin
      count += this.items[productID].quantity;
    }
    return count;
  }
}
