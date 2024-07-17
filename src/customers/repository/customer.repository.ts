import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../domain/customer.entity";


@Injectable()
export class CustomerRepository{

    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
      ) {}  
}