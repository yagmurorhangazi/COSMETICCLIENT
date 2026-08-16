import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { toSignal } from '@angular/core/rxjs-interop';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'category-list',
  standalone: false,
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {

  private categoryservice= inject(CategoryService);

  categories = toSignal(this.categoryservice.getCategories())

delete(id){
  this.categoryservice.delete(id).subscribe({
    complete:()=>{
      window.location.reload()
      alertifyjs.success('Kategori Silindi')
    },
    error:err=>console.log(err)
  })
}

}

