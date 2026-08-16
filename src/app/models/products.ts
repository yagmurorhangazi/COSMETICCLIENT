import { Category } from "./category";

export class Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId:number;
  category:Category;
}
