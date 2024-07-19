import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.entity';
import { OrderDetail } from './domain/order-detail.entity';
import { OrderService } from './service/order.service';
import { OrderRepository } from './repository/order.repository';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetailService } from './service/order-detail.service';
import { OrderDetailRepository } from './repository/order-detail.repository';

@Module({
    imports:[TypeOrmModule.forFeature([Order, OrderDetail]), ProductsModule],
    providers:[OrderService, OrderRepository, OrderDetailService, OrderDetailRepository],
    exports:[OrderService, OrderRepository, OrderDetailService, OrderDetailRepository]
})
export class OrdersModule {}
