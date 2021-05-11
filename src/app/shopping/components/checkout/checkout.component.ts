import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '@shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
