import { Component, inject } from '@angular/core';
import { Product } from '../../models/products';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

 private ProductService=inject(ProductService);
 private router=inject(Router);

title:string = 'Ürün Listesi';

products=toSignal(this.ProductService.getAll())









}
