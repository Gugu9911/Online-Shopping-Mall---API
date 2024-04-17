import { Category } from "./Category";

export type Product = {
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
}