import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './controller/customers.controller';
import { Customer } from './domain/customer.entity';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './service/customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerRepository, CustomerService, JwtService],
  exports: [CustomerRepository, CustomerService],
  controllers: [CustomersController],
})
export class CustomersModule {}
