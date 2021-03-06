import { Component, Input } from '@angular/core';
import { Product } from 'app/shared/models/product';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'app/shared/models/shopping-cart';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  @Input('product') product: Product;
  @Input('showActions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

}
