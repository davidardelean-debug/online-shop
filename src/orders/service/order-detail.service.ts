import { Injectable } from "@nestjs/common";
import { OrderDetailRepository } from "../repository/order-detail.repository";
import { OrderDetail } from "../domain/order-detail.entity";
import { UUID } from "crypto";

@Injectable()
export class OrderDetailService{

    constructor(private readonly orderDetailRepository: OrderDetailRepository){}

    async add(orderDetails: OrderDetail[]): Promise<OrderDetail[]>{
        return await this.orderDetailRepository.add(orderDetails);
    }

    async getAll(orderId: string){
        return await this.orderDetailRepository.getAll(orderId);
    }

    async removeAll(orderIds: string[]){
        return await this.orderDetailRepository.removeAll(orderIds);
    }

}