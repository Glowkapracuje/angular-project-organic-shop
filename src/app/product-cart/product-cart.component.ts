import { Component, Input } from '@angular/core';
import { Product } from 'app/models/product';
import { ShoppingCartService } from 'app/shopping-cart.service';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  @Input('product') product: Product;
  @Input('componentLabel') componentLabel: string;
  @Input('showActions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    console.log(this.product.$key);


    // if (!(this.shoppingCart as any).$value) return 0;


    let item = this.shoppingCart.item[this.product.$key];
    return item ? item.quantity : 0;
  }

  public logThat(product: Product) {
    console.log(product);
  }
}
