import { Injectable } from "@nestjs/common";
import { UUID } from "crypto";
import { Customer } from "../domain/customer.entity";
import { CustomerRepository } from "../repository/customer.repository";


@Injectable()
export class CustomerService{

    constructor(private readonly customerRepository: CustomerRepository){}

    async getById(id:UUID):Promise<Customer>{
        return await this.customerRepository.getById(id);
    }

    async add(customer: Customer): Promise<Customer>{
        return await this.customerRepository.add(customer);
    }
}