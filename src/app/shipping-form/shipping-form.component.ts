import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { OrderService } from 'app/shared/services/order.service';
import { Order } from 'app/shared/models/order';
import { ShoppingCart } from 'app/shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  userEmail: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
  ) {
  }


  async ngOnInit() {
    this.userSubscription = await this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      this.userEmail = user.email;
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.userEmail, this.shipping, this.cart);

    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }



}
