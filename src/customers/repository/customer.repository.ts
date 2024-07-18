import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../domain/customer.entity";
import { UUID } from "crypto";


@Injectable()
export class CustomerRepository{

    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
      ) {}  

      async getById(id: UUID): Promise<Customer> {
        const customer = await this.customersRepository.findOneBy({id});
        return customer;
      } 
}