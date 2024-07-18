import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repository/product.repository";
import { Product } from "../domain/product.entity";
import { UUID } from "crypto";
import { DeleteResult } from "typeorm";

@Injectable()
export class ProductService{

    constructor(private readonly productRepository: ProductRepository){}

    async getAll(): Promise<Product[]>{
        const products =await this.productRepository.getAll();
        console.log("PROD FROM REPO:", products)
        return products;
    }

    async getById(id: UUID): Promise<Product>{
        return await this.productRepository.getById(id);
    }

    async add(product: Product): Promise<Product>{
        return await this.productRepository.add(product);
    }

    async remove(id: UUID): Promise<DeleteResult>{
        return await this.productRepository.remove(id);
    }
}