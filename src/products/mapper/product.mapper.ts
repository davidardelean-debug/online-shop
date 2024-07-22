import { Product } from '../domain/product.entity';
import { ProductDto } from '../dto/product.dto';
import {
  toProductCategoryDto,
  toProductCategoryEntity,
} from './product-category.mapper';

export function toProductDto(product: Product): ProductDto {
  const { id, name, description, price, weight, supplier, imageUrl } = product;
  const category = toProductCategoryDto(product.category);
  return { id, name, description, price, weight, supplier, imageUrl, category };
}

export function toProductEntity(productDto: ProductDto): Product {
  const { id, name, description, price, weight, supplier, imageUrl } =
    productDto;
  const category = toProductCategoryEntity(productDto.category);
  return { id, name, description, price, weight, supplier, imageUrl, category };
}
