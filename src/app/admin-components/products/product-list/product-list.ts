import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  private ProductService = inject(ProductService);
  private router = inject(Router);

  title: string = 'Ürünler Listesi';

  products = toSignal(
    this.ProductService.getAll(),
    {
      initialValue: []
    }
  );

  delete(id: number): void {

    Swal.fire({
      title: 'Silmek İstediğinize Emin Misiniz?',
      text: 'Bu işlemi geri alamazsınız!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8A653B',
      cancelButtonColor: '#A65D4F',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal'
    }).then((result) => {

      if (result.isConfirmed) {

        this.ProductService.delete(id).subscribe({

          next: () => {

            Swal.fire({
              title: 'Silindi!',
              text: 'Ürün başarıyla silindi.',
              icon: 'success',
              confirmButtonColor: '#8A653B'
            }).then(() => {

              window.location.reload();

            });

          },

          error: (err) => {

            console.error('Ürün silinirken hata oluştu:', err);

            Swal.fire({
              title: 'Hata!',
              text: 'Ürün silinirken bir hata oluştu.',
              icon: 'error',
              confirmButtonColor: '#A65D4F'
            });

          }

        });

      }

    });

  }

}
