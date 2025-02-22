import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { DeleteResult, Repository } from 'typeorm';
import { ProductCategory } from '../domain/product-category.entity';

@Injectable()
export class ProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async getAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find();
  }

  async getByID(id: UUID): Promise<ProductCategory> {
    return this.productCategoryRepository.findOneBy({ id });
  }

  async add(productCategory: ProductCategory): Promise<ProductCategory> {
    return this.productCategoryRepository.save(productCategory);
  }

  async remove(id: UUID): Promise<DeleteResult> {
    return this.productCategoryRepository.delete(id);
  }
}
