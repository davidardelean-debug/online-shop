import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { OrdersController } from './controller/orders.controller';
import { OrderDetail } from './domain/order-detail.entity';
import { Order } from './domain/order.entity';
import { OrderDetailRepository } from './repository/order-detail.repository';
import { OrderRepository } from './repository/order.repository';
import { OrderDetailService } from './service/order-detail.service';
import { OrderService } from './service/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail]), ProductsModule],
  providers: [
    OrderService,
    OrderRepository,
    OrderDetailService,
    OrderDetailRepository,
    JwtService,
  ],
  exports: [
    OrderService,
    OrderRepository,
    OrderDetailService,
    OrderDetailRepository,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
