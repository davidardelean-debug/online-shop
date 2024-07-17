import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "../domain/product-category.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductCategoryRepository{
    constructor(
        @InjectRepository(ProductCategory)
        private productCategoryRepository: Repository<ProductCategory>
    ){}
}