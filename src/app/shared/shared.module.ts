import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import { AuthGuardService } from '../admin/services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCartComponent,
    ProductQuantityComponent,
  ],
  exports: [
    ProductCartComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ]
})
export class SharedModule { }
