import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "../domain/order-detail.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrderDetailRepository{

    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>
    ){}
}