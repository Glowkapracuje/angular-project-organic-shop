import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-4-data-table/src';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment.prod';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AdminModule,
    SharedModule,
    ShoppingModule,
    CoreModule,

    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [

    [{
      provide: LOCALE_ID,
      useValue: 'pl-PL'
     }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
