import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { StockRepository } from "../repository/stock.repository";
import { OrderItem } from "src/orders/dto/create-order.dto";
import { Stock } from "../domain/stock.entity";

export interface StockItem{
    productId: string;
    quantity: number;
}
@Injectable()
export class StockService{

    constructor(private readonly stockRepository: StockRepository){}

    async get(orderItems: OrderItem[]): Promise<Stock[]>{
        let stockQueries: Promise<Stock>[];
        try {
            stockQueries = orderItems.map(orderItem => this.stockRepository.get(orderItem.product.id, orderItem.location.id));
        } catch (error) {
            throw new NotFoundException("Stock not found some of the products and their specified location");
        }
        return await Promise.all(stockQueries);
    }

    async update(updatedStock: Stock[]): Promise<Stock[]>{
        try {
            return await this.stockRepository.add(updatedStock);
        } catch (error) {
            throw new BadRequestException("Invalid input body for stock.")
        }
    }

}