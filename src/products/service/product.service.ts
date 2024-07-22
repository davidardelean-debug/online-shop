import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { DeleteResult } from 'typeorm';
import { Product } from '../domain/product.entity';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getById(id: UUID): Promise<Product> {
    try {
      return this.productRepository.getById(id);
    } catch (error) {
      throw new NotFoundException('Product not found for ID: ' + id);
    }
  }

  async add(product: Product): Promise<Product> {
    try {
      return this.productRepository.add(product);
    } catch (error) {
      throw new BadRequestException('Invalid ID or input body for product.');
    }
  }

  async remove(id: UUID): Promise<DeleteResult> {
    try {
      return this.productRepository.remove(id);
    } catch (error) {
      throw new NotFoundException('Product not found for ID: ' + id);
    }
  }
}
