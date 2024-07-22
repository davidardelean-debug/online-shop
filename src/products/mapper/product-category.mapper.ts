import { ProductCategory } from '../domain/product-category.entity';
import { ProductCategoryDto } from '../dto/product-category.dto';

export function toProductCategoryDto(productCategory: ProductCategory) {
  const { id, name, description } = productCategory;
  return { id, name, description };
}

export function toProductCategoryEntity(
  productCategoryDto: ProductCategoryDto,
): ProductCategory {
  const { id, name, description } = productCategoryDto;
  return { id, name, description };
}
