import { Component } from '@angular/core';
import { OrderService } from './../../order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  orders$;

  constructor(orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }
}
