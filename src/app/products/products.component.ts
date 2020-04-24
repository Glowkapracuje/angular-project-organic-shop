import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'app/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from 'app/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from 'app/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  shoppingCart: ShoppingCart;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(shoppingCart => this.shoppingCart = shoppingCart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
