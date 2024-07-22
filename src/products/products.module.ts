import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryController } from './controller/product-category.controller';
import { ProductController } from './controller/product.controller';
import { Location } from './domain/location.entity';
import { ProductCategory } from './domain/product-category.entity';
import { Product } from './domain/product.entity';
import { Stock } from './domain/stock.entity';
import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductRepository } from './repository/product.repository';
import { StockRepository } from './repository/stock.repository';
import { ProductCategoryService } from './service/product-category.service';
import { ProductService } from './service/product.service';
import { StockService } from './service/stock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, ProductCategory, Product, Stock]),
  ],
  providers: [
    ProductCategoryService,
    ProductCategoryRepository,
    ProductService,
    ProductRepository,
    StockService,
    StockRepository,
  ],
  exports: [StockService],
  controllers: [ProductController, ProductCategoryController],
})
export class ProductsModule {}
