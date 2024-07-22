import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/customer.entity';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './service/customers.service';
import { CustomersController } from './controller/customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerRepository, CustomerService],
  exports: [CustomerRepository, CustomerService],
  controllers: [CustomersController],
})
export class CustomersModule {}
