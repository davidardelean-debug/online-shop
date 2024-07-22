import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Stock } from "../domain/stock.entity";
import { Repository } from "typeorm";
import { UUID } from "crypto";

export interface StockForOrder{
    productId: UUID;
    availableQuantity: number;
}

@Injectable()
export class StockRepository{
    constructor(
        @InjectRepository(Stock)
        private stockRepository: Repository<Stock>
    ){}

    async get(productId: string, locationId: string): Promise<Stock>{

        const queryBuilder = this.stockRepository.createQueryBuilder("stock")
        .leftJoinAndSelect("stock.product", "product")
        .leftJoinAndSelect("stock.location", "location")
        .where("location.id = :locationId", { locationId })
        .andWhere("product.id = :productId", { productId });

        return queryBuilder.getOne();
    }

    async add(stock:Stock[]) : Promise<Stock[]>{
        return this.stockRepository.save(stock);
    }
}