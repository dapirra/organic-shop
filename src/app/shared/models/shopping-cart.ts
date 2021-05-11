import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productID: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (const productID in itemsMap) { // tslint:disable-line: forin
      const item = itemsMap[productID];
      this.items.push(new ShoppingCartItem({
        ...item,
        key: productID
      }));
    }
  }

  getQuantity(product: Product): number {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
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
