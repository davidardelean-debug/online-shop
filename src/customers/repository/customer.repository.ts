import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { Customer } from '../domain/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async getById(id: UUID): Promise<Customer> {
    return this.customersRepository.findOneBy({ id });
  }

  async add(customer: Customer): Promise<Customer> {
    return this.customersRepository.save(customer);
  }
}
