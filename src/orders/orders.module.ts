import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './domain/order.entity';
import { OrderDetail } from './domain/order-detail.entity';

@Module({imports:[TypeOrmModule.forFeature([Orders, OrderDetail])]})
export class OrdersModule {}
