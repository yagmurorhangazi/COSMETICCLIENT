
import { Component, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  private ProductService=inject(ProductService);
private router=inject(Router);
  title:string ="Ürünler Listesi"

products=toSignal(this.ProductService.getAll())


delete(id){
  Swal.fire({
  title: "Silmek İstediğinize Emin Misiniz?",
  text: "Bu İşlemi Geri Alamassınız!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Evet, Sil!",
  cancelButtonText:"İptal"
}).then((result) => {
  if (result.isConfirmed)

    this.ProductService.delete(id).subscribe({
      complete:()=>{
        Swal.fire({
    title: "Silindi!",
    text: "Ürün Başarıyla Silindi.",
    icon: "success"
  });
      window.location.reload()
      }
    })

});
}


}
