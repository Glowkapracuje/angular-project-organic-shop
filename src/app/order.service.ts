import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from './models/order';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  storeOrder(order: Order) {
    return this.db.list('/orders').push(order);
  }


}
