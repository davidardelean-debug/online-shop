import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../domain/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderRepository{

    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
    ){}
}