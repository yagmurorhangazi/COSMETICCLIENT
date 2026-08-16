import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

private http = inject(HttpClient);
baseUrl="https://localhost:7000/api/products/";


getAll(){
  return this.http.get<Product[]>(this.baseUrl);
}

create(model:Product){
return this.http.post(this.baseUrl,model);
}

update(id,model:Product){
  return this.http.put(this.baseUrl+id,model);
}

getById(id){
  return this.http.get<Product>(this.baseUrl+id);
}

delete(id){
  return this.http.delete(this.baseUrl+id);
}


}
