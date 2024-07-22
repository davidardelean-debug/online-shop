import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "../repository/product.repository";
import { Product } from "../domain/product.entity";
import { UUID } from "crypto";
import { DeleteResult } from "typeorm";

@Injectable()
export class ProductService{

    constructor(private readonly productRepository: ProductRepository){}

    async getAll(): Promise<Product[]>{
        return await this.productRepository.getAll();
    }

    async getById(id: UUID): Promise<Product>{
        try {
            return await this.productRepository.getById(id);
        } catch (error) {
            throw new NotFoundException("Product not found for ID: " + id);
        }
    }

    async add(product: Product): Promise<Product>{
        try {
            return await this.productRepository.add(product);
        } catch (error) {
            throw new BadRequestException("Invalid ID or input body for product.")
        }
    }

    async remove(id: UUID): Promise<DeleteResult>{
        try {
            return await this.productRepository.remove(id);
        } catch (error) {
            throw new NotFoundException("Product not found for ID: " + id)
        }
    }
}