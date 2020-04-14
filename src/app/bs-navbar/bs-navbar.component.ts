import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { AppUser } from 'app/models/app-user';
import { ShoppingCartService } from 'app/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    let cart$ = await this.shoppingCartService.getCart()
    // We have not to unsubscribe, because we will dealing with single instance of navbar component in DOM
    // with this subscription below logic will be reexecuted with every change
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity
      }
    });
  }

  logout() {
    this.auth.logout();
  }

}
