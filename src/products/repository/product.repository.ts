import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/product.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getById(id: UUID): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async add(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async remove(id: UUID) {
    return this.productRepository.delete(id);
  }
}
