import { Component, Input } from '@angular/core';
import { Product } from 'app/models/product';
import { ShoppingCartService } from 'app/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('componentLabel') componentLabel: string;
  @Input('showActions') showActions: boolean = true;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart(product: Product) {
    let cardId = localStorage.getItem('cardId');
    if (!cardId) {
      this.shoppingCartService.create().then(result => {
        localStorage.setItem('cardId', result.key);

        //add to cart
      });
    } else {

    }

  }
}
