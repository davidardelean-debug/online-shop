import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderDetailRepository } from "../repository/order-detail.repository";
import { OrderDetail } from "../domain/order-detail.entity";

@Injectable()
export class OrderDetailService{

    constructor(private readonly orderDetailRepository: OrderDetailRepository){}

    async add(orderDetails: OrderDetail[]): Promise<OrderDetail[]>{
        try {
            return await this.orderDetailRepository.add(orderDetails);
        } catch (error) {
            throw new BadRequestException("Invalid input body for order detail.");
        }
    }

    async getAll(orderId: string){
        try {
            return await this.orderDetailRepository.getAll(orderId);
        } catch (error) { 
            throw new NotFoundException('Order details not found for order ID: ' + orderId);
        }
    }

    async removeAll(orderIds: string[]){
        return await this.orderDetailRepository.removeAll(orderIds);
    }

}