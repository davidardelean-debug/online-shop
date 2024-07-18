import { Product } from "../domain/product.entity";
import { ProductDto } from "../dto/product.dto";
import { ProductCategoryMapper } from "./product-category.mapper";

export class ProductMapper{

    static toDto(product: Product): ProductDto{
        const {id, name, description, price, weight, supplier, imageUrl} = product;
        const category = ProductCategoryMapper.toDto(product.category);
        return {id, name, description, price, weight, supplier, imageUrl, category} ;
    }

    static toEntity(productDto: ProductDto): Product{
        const {id, name, description, price, weight, supplier, imageUrl} = productDto;
        const category = ProductCategoryMapper.toEntity(productDto.category);
        return {id, name, description, price, weight, supplier, imageUrl, category} ;
    }
}