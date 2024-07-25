import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UUID } from 'crypto';
import { Customer } from '../domain/customer.entity';
import { CustomerRepository } from '../repository/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getById(id: UUID): Promise<Customer> {
    try {
      return await this.customerRepository.getById(id);
    } catch (error) {
      throw new NotFoundException('Customer not found for ID: ' + id);
    }
  }

  async getByUsername(username: string): Promise<Customer> {
    try {
      return await this.customerRepository.getByUsername(username);
    } catch (error) {
      throw new NotFoundException(
        'Customer not found for username: ' + username,
      );
    }
  }

  async add(customer: Customer): Promise<Customer> {
    try {
      const hashedPassword = await bcrypt.hash(customer.password, 10);
      customer.password = hashedPassword;
      return await this.customerRepository.add(customer);
    } catch (error) {
      throw new BadRequestException('Incorrect input body for customer.');
    }
  }
}
