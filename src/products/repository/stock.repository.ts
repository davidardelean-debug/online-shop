import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Stock } from "../domain/stock.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
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

    getAll(productIds: string[], locationId: string): SelectQueryBuilder<Stock>{

        const queryBuilder = this.stockRepository.createQueryBuilder("stock")
        .leftJoinAndSelect("stock.product", "product")
        .leftJoinAndSelect("stock.location", "location")
        .where("location.id = :locationId", { locationId })
        .andWhere("product.id IN (:...productIds)", { productIds });

        return queryBuilder;
    }

    async add(stock:Stock[]) : Promise<Stock[]>{
        return await this.stockRepository.save(stock);
    }
}