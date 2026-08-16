import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Testimonial } from '../../models/testimonial';
import { TestimonialService } from '../../services/testimonial-service';

declare var bootstrap: any; // Modal penceresini kod ile kapatabilmek için

@Component({
  selector: 'app-main-testimonial',
  templateUrl: './main-testimonial.html',
  styleUrls: ['./main-testimonial.css'],
  standalone: false
})
export class MainTestimonial implements OnInit {
  testimonials: Testimonial[] = [];

  // Form verilerini tutacak nesne
  newTestimonial: Partial<Testimonial> = {
    fullName: '',
    comment: '',
    imageUrl: '',
    rating: 5
  };

  constructor(
    private testimonialService: TestimonialService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials(): void {
    this.testimonialService.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Yorumlar yüklenirken hata oluştu:', err);
      }
    });
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  // Yeni Yorum Ekleme Fonksiyonu
  submitTestimonial(): void {
    // Görsel girilmediyse varsayılan bir resim atayalım
    if (!this.newTestimonial.imageUrl) {
      this.newTestimonial.imageUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
    }

    this.testimonialService.createTestimonial(this.newTestimonial as Testimonial).subscribe({
      next: (createdItem) => {
        // Yeni eklenen yorumu listeye tazeleyip arayüzü güncelliyoruz
        this.testimonials.push(createdItem);
        this.cdr.detectChanges();

        // Form alanlarını sıfırlıyoruz
        this.newTestimonial = {
          fullName: '',
          comment: '',
          imageUrl: '',
          rating: 5
        };

        // Modal penceresini kapatıyoruz
        const modalElement = document.getElementById('testimonialModal');
        if (modalElement && typeof bootstrap !== 'undefined') {
          const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
          modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Yorum eklenirken hata oluştu:', err);
      }
    });
  }
}
