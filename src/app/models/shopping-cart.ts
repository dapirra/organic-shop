import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productID: string]: ShoppingCartItem }) {
    for (const productID in itemsMap) { // tslint:disable-line: forin
      const item = itemsMap[productID];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get totalPrice(): number {
    let sum = 0;
    for (const productID in this.items) { // tslint:disable-line: forin
      sum += this.items[productID].totalPrice;
    }
    return sum;
  }

  get totalItemsCount(): number {
    let count = 0;
    for (const productID in this.itemsMap) { // tslint:disable-line: forin
      count += this.itemsMap[productID].quantity;
    }
    return count;
  }
}
