import { Injectable } from "@nestjs/common";
import { ProductCategoryRepository } from "../repository/product-category.repository";
import { ProductCategory } from "../domain/product-category.entity";
import { UUID } from "crypto";
import { DeleteResult } from "typeorm";


@Injectable()
export class ProductCategoryService{

    constructor(private readonly productCategoryRepository: ProductCategoryRepository){}

    async getAll(): Promise<ProductCategory[]>{

        return await this.productCategoryRepository.getAll();
    }

    async add(productCategory: ProductCategory): Promise<ProductCategory>{

        return await this.productCategoryRepository.add(productCategory);
    }

    async remove(id:UUID): Promise<DeleteResult>{
        return await this.productCategoryRepository.remove(id);
    }
}