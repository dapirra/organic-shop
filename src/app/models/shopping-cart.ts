import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productID: string]: ShoppingCartItem }) {
    for (const productID in itemsMap) { // tslint:disable-line: forin
      this.items.push(itemsMap[productID]);
    }
  }

  get totalItemsCount(): number {
    let count = 0;
    for (const productID in this.itemsMap) { // tslint:disable-line: forin
      count += this.itemsMap[productID].quantity;
    }
    return count;
  }
}
