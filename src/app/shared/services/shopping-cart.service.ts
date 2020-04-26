import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise  <Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    // return this.db.object('/shopping-carts/' + cartId)
    //   .map((x: ShoppingCart) => new ShoppingCart(x.items));
    return this.db.object('/shopping-carts/' + cartId)
    .map((x: {items: {[productId: string]: ShoppingCartItem}}) => new ShoppingCart(x.items));

  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }



  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  // Asynchronous instead of using then. Async return a promise.
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;


      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }



  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    // Take operator for no care of unsubsribing or destroy
    item$.take(1).subscribe((item: any) => {
      let quantity = (item.quantity || 0) + change;

      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }





}

