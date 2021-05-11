import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent {
  shipping: any = {};

  placeOrder(): void {
    console.log(this.shipping);
  }
}
