import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Testimonial } from '../../../models/testimonial';
import { TestimonialService } from '../../../services/testimonial-service';

@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.html',
  styleUrls: ['./testimonial-list.css'],
  standalone: false
})
export class TestimonialList implements OnInit {
  testimonials: Testimonial[] = [];

  constructor(
    private testimonialService: TestimonialService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.testimonialService.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Yorumlar yüklenirken hata:', err)
    });
  }

  deleteTestimonial(id: number): void {
    this.testimonialService.deleteTestimonial(id).subscribe({
      next: () => {
        this.testimonials = this.testimonials.filter(item => item.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Silme işleminde hata oluştu:', err)
    });
  }
}
