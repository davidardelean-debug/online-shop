import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "../domain/order-detail.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { UUID } from "crypto";


@Injectable()
export class OrderDetailRepository{

    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>
    ){}

    getAll(orderId: string): SelectQueryBuilder<OrderDetail>{
        const queryBuilder = this.orderDetailRepository.createQueryBuilder("order_detail")
        .leftJoinAndSelect("order_detail.order", "order")
        .where("order.id = :orderId", { orderId })

        return queryBuilder;
    }

    async getById(id: UUID): Promise<OrderDetail>{
        return await this.orderDetailRepository.findOneBy({id});
    }

    async add(orderDetails:OrderDetail[]) : Promise<OrderDetail[]>{
        return await this.orderDetailRepository.save(orderDetails);
    }

    async remove(id:UUID){
        return await this.orderDetailRepository.delete(id);
    }

    async removeAll(ids: string[]){
        return await this.orderDetailRepository.delete(ids);
    }
}