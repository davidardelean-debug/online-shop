import { Injectable } from "@nestjs/common";
import { OrderDetailRepository } from "../repository/order-detail.repository";
import { Product } from "src/products/domain/product.entity";
import { Order } from "../domain/order.entity";
import { Location } from "src/products/domain/location.entity";
import { OrderDetail } from "../domain/order-detail.entity";

@Injectable()
export class OrderDetailService{

    constructor(private readonly orderDetailRepository: OrderDetailRepository){}

    // async add(order: Order, product: Product, location: Location, quantity: number){

    //     const orderDetail = new OrderDetail();
    //     orderDetail.location = location;
    //     orderDetail.order = order;
    //     orderDetail.quantity = quantity;
    //     orderDetail.product = product;
    //     return await this.orderDetailRepository.add(orderDetail);
    // }

    async add(orderDetails: OrderDetail[]): Promise<OrderDetail[]>{
        return await this.orderDetailRepository.add(orderDetails);
    }

}