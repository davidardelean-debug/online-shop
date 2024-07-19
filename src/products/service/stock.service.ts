import { Injectable } from "@nestjs/common";
import { StockRepository } from "../repository/stock.repository";
import { Location } from "../domain/location.entity";
import { OrderItem } from "src/orders/dto/create-order.dto";
import { Stock } from "../domain/stock.entity";

export interface StockItem{
    productId: string;
    quantity: number;
}
@Injectable()
export class StockService{

    constructor(private readonly stockRepository: StockRepository){}

    async get(orderItems: OrderItem[], location: Location): Promise<Stock[]>{

        const productIds = orderItems.map((o) => o.product.id); 
        const queryBuilder = this.stockRepository.getAll(productIds, location.id);
        const orderStock = await queryBuilder.getMany();

        return orderStock;
    }

    async update(updatedStock: Stock[]){
        return await this.stockRepository.add(updatedStock);
    }

}