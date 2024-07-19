import { ProductCategory } from "../domain/product-category.entity";
import { ProductCategoryDto } from "../dto/product-category.dto";

export class ProductCategoryMapper{

    static toDto(productCategory: ProductCategory){
        const {id, name, description} = productCategory;
        return {id, name, description};
    }

    static toEntity(productCategoryDto: ProductCategoryDto): ProductCategory{
        const {id, name, description} = productCategoryDto;
        return {id, name, description};
    }
}