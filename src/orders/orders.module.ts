import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.entity';
import { OrderDetail } from './domain/order-detail.entity';

@Module({imports:[TypeOrmModule.forFeature([Order, OrderDetail])]})
export class OrdersModule {}
