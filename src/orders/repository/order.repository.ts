import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../domain/order.entity";
import { Repository } from "typeorm";
import { UUID } from "crypto";

@Injectable()
export class OrderRepository{

    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>
    ){}

    async getAll(): Promise<Order[]>{
        return this.ordersRepository.find();
    }

    async getById(id: UUID): Promise<Order>{
        return this.ordersRepository.findOneBy({id});
    }

    async add(order:Order) : Promise<Order>{
        return this.ordersRepository.save(order);
    }

    async remove(id:string){
        return this.ordersRepository.delete(id);
    }
}