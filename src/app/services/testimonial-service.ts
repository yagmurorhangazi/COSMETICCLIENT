import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = 'https://localhost:7000/api/testimonial';

  constructor(private http: HttpClient) { }

  // Yorumları Getir
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.apiUrl);
  }

  // Yeni Yorum Ekle (Kullanıcı Tarafı İçin)
  createTestimonial(testimonial: Testimonial): Observable<Testimonial> {
    return this.http.post<Testimonial>(this.apiUrl, testimonial);
  }

  // Yorum Sil (Admin Tarafı İçin)
  deleteTestimonial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
