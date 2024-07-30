import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { DeleteResult } from 'typeorm';
import { Product } from '../domain/product.entity';
import { ProductRepository } from '../repository/product.repository';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly stockRepository: StockRepository,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async getById(id: UUID): Promise<Product> {
    try {
      return await this.productRepository.getById(id);
    } catch (error) {
      throw new NotFoundException('Product not found for ID: ' + id);
    }
  }

  async add(product: Product): Promise<Product> {
    try {
      return await this.productRepository.add(product);
    } catch (error) {
      throw new BadRequestException('Invalid ID or input body for product.');
    }
  }

  async remove(id: UUID): Promise<DeleteResult> {
    try {
      const product = await this.getById(id);
      await this.stockRepository.remove(product);
      return await this.productRepository.remove(id);
    } catch (error) {
      throw new NotFoundException('Product not found for ID: ' + id);
    }
  }
}
