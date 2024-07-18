import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/customer.entity';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './service/customers.service';

@Module({
    imports:[TypeOrmModule.forFeature([Customer])],
    providers:[CustomerRepository, CustomerService],
    exports:[CustomerRepository, CustomerService]
})
export class CustomersModule {}
