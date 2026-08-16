import { Product } from './../../models/products';
import { Category } from './../../models/category';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {

private productService=inject(ProductService);
private categoryService=inject(CategoryService);
private router=inject(Router);


product:Product=new Product();

categories=toSignal(this.categoryService.getCategories())

create(){
  this.productService.create(this.product).subscribe({
    complete: ()=>{
      this.router.navigate(['/admin/categories'])
    },
    error: err =>console.log(err)

  })
}

}
