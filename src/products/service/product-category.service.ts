import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { DeleteResult } from 'typeorm';
import { ProductCategory } from '../domain/product-category.entity';
import { ProductCategoryRepository } from '../repository/product-category.repository';

@Injectable()
export class ProductCategoryService {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async getAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.getAll();
  }

  async add(productCategory: ProductCategory): Promise<ProductCategory> {
    try {
      return this.productCategoryRepository.add(productCategory);
    } catch (error) {
      throw new BadRequestException('Invalid input body for product-category.');
    }
  }

  async remove(id: UUID): Promise<DeleteResult> {
    try {
      return this.productCategoryRepository.remove(id);
    } catch (error) {
      throw new NotFoundException('Product category not found');
    }
  }
}
