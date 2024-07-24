import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Customer } from 'src/customers/domain/customer.entity';
import { LocationsController } from './controller/location.controller';
import { ProductCategoryController } from './controller/product-category.controller';
import { ProductController } from './controller/product.controller';
import { Location } from './domain/location.entity';
import { ProductCategory } from './domain/product-category.entity';
import { Product } from './domain/product.entity';
import { Stock } from './domain/stock.entity';
import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductRepository } from './repository/product.repository';
import { StockRepository } from './repository/stock.repository';
import { LocationService } from './service/location.service';
import { ProductCategoryService } from './service/product-category.service';
import { ProductService } from './service/product.service';
import { StockService } from './service/stock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Location,
      ProductCategory,
      Product,
      Stock,
      Customer,
    ]),
    AuthModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    ProductCategoryService,
    ProductCategoryRepository,
    ProductService,
    ProductRepository,
    StockService,
    StockRepository,
    LocationService,
  ],
  exports: [StockService],
  controllers: [
    ProductController,
    ProductCategoryController,
    LocationsController,
  ],
})
export class ProductsModule {}
