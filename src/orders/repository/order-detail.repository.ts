import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "../domain/order-detail.entity";
import { Repository } from "typeorm";
import { UUID } from "crypto";


@Injectable()
export class OrderDetailRepository{

    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>
    ){}

    async getAll(): Promise<OrderDetail[]>{
        return await this.orderDetailRepository.find();
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
}