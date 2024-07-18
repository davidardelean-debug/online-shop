import { ProductCategoryDto } from "./product-category.dto";

export class ProductDto{

    id:string;

    name: string;

    description: string;

    price:number;

    weight: number;

    category: ProductCategoryDto;

    supplier: string;

    imageUrl: string;

}