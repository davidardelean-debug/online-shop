import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customers/domain/customer.entity";
import { Orders } from "./orders/domain/order.entity";


@Module({
  imports: [OrdersModule, ProductsModule, CustomersModule, SharedModule,
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port: 5432,
      username: 'msgcsuser',
      password: 'msgcspass',
      database: 'msgcsdb',
      entities: [],
      autoLoadEntities:true,
      synchronize: true
    })
  ],
  controllers: [HealthController],
})
export class AppModule {}
