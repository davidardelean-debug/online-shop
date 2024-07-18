import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomersController } from "./customers/controller/customers.controller";
import { ProductCategoryController } from "./products/controller/product-category.controller";
import { ProductController } from "./products/controller/product.controller";


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
  controllers: [HealthController, CustomersController, ProductCategoryController, ProductController],
})
export class AppModule {}
