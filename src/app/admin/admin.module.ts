import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { DataTableModule } from 'angular-4-data-table/src';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTableModule
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuardService,
  ]
})
export class AdminModule { }
