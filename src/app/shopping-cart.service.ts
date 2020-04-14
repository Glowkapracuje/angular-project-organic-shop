import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise  <Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map((x: ShoppingCart) => new ShoppingCart(x.items));
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

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1)
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    // Take operator for no care of unsubsribing or destroy
    item$.take(1).subscribe((item: any) => {
      item$.update({ product, quantity: ((item.quantity || 0) + change) });
    });
  }



}

