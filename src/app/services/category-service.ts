import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

/**
 *
 */
constructor(private http: HttpClient) {
}

baseUrl: string = "https://localhost:7000/api/categories/";

getCategories() {

  return this.http.get<Category[]>(this.baseUrl);
}

getbyId(id) {

return this.http.get<Category>(this.baseUrl + id);
}

update(id: number, category: Category) {
   return this.http.put(this.baseUrl + id, category);
}

create(category: Category) {
  return this.http.post(this.baseUrl, category);
}

delete(id) {

  return this.http.delete(this.baseUrl + id);
}


}
