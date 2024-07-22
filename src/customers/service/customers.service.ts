import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UUID } from "crypto";
import { Customer } from "../domain/customer.entity";
import { CustomerRepository } from "../repository/customer.repository";


@Injectable()
export class CustomerService{

    constructor(private readonly customerRepository: CustomerRepository){}

    async getById(id: UUID): Promise<Customer> {
        try {
            return await this.customerRepository.getById(id);
        } catch (error) {
            throw new NotFoundException('Customer not found for ID: ' + id); 
        }
    }

    async add(customer: Customer): Promise<Customer>{
        try {
            return await this.customerRepository.add(customer)
        } catch (error) {
            throw new BadRequestException("Incorrect input body for customer.")
        }
    }
}