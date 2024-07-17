import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "../domain/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderRepository{

    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>
    ){}
}