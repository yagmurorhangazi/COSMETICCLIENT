import { Router } from '@angular/router';
import { CategoryService } from './../../../services/category-service';
import { ProductService } from './../../../services/product-service';
import { ChangeDetectorRef, Component, inject, Input, input, OnInit } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import * as alertifyjs from 'alertifyjs';
import { Product } from '../../../models/products';

@Component({
  selector: 'app-product-update',
  standalone: false,
  templateUrl: './product-update.html',
  styleUrl: './product-update.css',
})
export class ProductUpdate implements OnInit{


  private ProductService=inject(ProductService);
  private CategoryService=inject(CategoryService);
  private router=inject(Router);
  private cdr=inject(ChangeDetectorRef);

  product:Product=new Product();
  @Input() id:string;


  ngOnInit(): void {
    this.ProductService.getById(this.id).subscribe({
      next: data=> {
        this.product=data
        this.cdr.detectChanges();
      }
    })
  }

  categories =toSignal(this.CategoryService.getCategories())

  update(){
    this.ProductService.update(this.product.id,this.product).subscribe({
      complete:()=>{
      alertifyjs.success('Ürün Güncellendi')
      this.router.navigate(['/admin/products'])
      },
      error:err=>{
        console.log(err)
        alertifyjs.console.error('Ürün Güncellenemedi');

      }
    })
  }


}
