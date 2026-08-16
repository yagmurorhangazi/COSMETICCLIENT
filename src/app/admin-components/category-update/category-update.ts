import { ChangeDetectorRef, Component, inject, Input, input, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  standalone: false,
  templateUrl: './category-update.html',
  styleUrl: './category-update.css',
})
export class CategoryUpdate implements OnInit {

  @Input() id;

  category:Category= new Category();

  private categoryservice= inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);
  private router=inject(Router);


  ngOnInit(): void {
   this.categoryservice.getbyId(this.id).subscribe({
      next: (data: Category) => {
        this.category = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

update(){
  this.categoryservice.update(this.id,this.category).subscribe({
    complete: () =>{
    this.router.navigate(['/categories'])
    },
    error: err=> console.log(err)
  })
}
}
