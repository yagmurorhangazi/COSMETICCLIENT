import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-product',
  standalone: false,
  templateUrl: './main-product.html',
  styleUrl: './main-product.css',
})
export class MainProduct {


private ProductService=inject(ProductService);

products=toSignal(this.ProductService.getLast4Products())
}
