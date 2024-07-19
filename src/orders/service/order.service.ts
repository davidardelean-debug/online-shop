import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { DeleteResult } from "typeorm";
import { OrderRepository } from "../repository/order.repository";
import { Order } from "../domain/order.entity";
import { OrderItem } from "../dto/create-order.dto";
import { StockService } from "src/products/service/stock.service";
import { Location } from "src/products/domain/location.entity";
import { Stock } from "src/products/domain/stock.entity";
import { OrderDetail } from "../domain/order-detail.entity";
import { OrderDetailService } from "./order-detail.service";

@Injectable()
export class OrderService{

    constructor(private readonly orderRepository: OrderRepository,
        private readonly orderDetailService: OrderDetailService,
        private readonly stockService: StockService
    ){}

    async getAll(): Promise<Order[]>{
        return await this.orderRepository.getAll();
    }

    async getById(id: UUID): Promise<Order>{
        return await this.orderRepository.getById(id);
    }

    async add(order: Order, orderItems: OrderItem[], location: Location): Promise<Order>{

        const stock= await this.stockService.get(orderItems, location);
        const {notInStock, updatedStock} = this.checkStock(orderItems, stock);
        if(notInStock.length>0)
            throw "Some of the quantities for the products exceed the current stock."

        this.stockService.update(updatedStock);
        const newOrder = await this.orderRepository.add(order);
        const orderDetails = orderItems.map((oI)=> {
            return {quantity: oI.quantity, product: oI.product, location: location, order:newOrder } as OrderDetail
        })
        await this.orderDetailService.add(orderDetails);

        return newOrder;
    }

    async update(order: Order): Promise<Order>{
        return await this.orderRepository.add(order);
    }

    async remove(id: string): Promise<DeleteResult>{

        const queryBuilder = await this.orderDetailService.getAll(id);
        const orderDetailsIds = (await queryBuilder.getMany()).map(oD=> oD.id)
        console.log("ORDER DETAILS IDS:", orderDetailsIds)
        await this.orderDetailService.removeAll(orderDetailsIds);


        return await this.orderRepository.remove(id);
    }

    checkStock(orderItems: OrderItem[], stock: Stock[]) {
        const notInStock = [];
        for (const orderItem of orderItems) {
            const matchingIndex = stock.findIndex((stockItem) => orderItem.product.id === stockItem.product.id);
            const matchingStock = stock[matchingIndex];
              if (matchingIndex !== -1 && orderItem.quantity > stock[matchingIndex].quantity) {
                    notInStock.push({ orderItem, matchingStock });
            }
            const difference = matchingStock.quantity - orderItem.quantity;
            stock[matchingIndex].quantity= difference;
        }
        return {notInStock, updatedStock: stock};
      }
}