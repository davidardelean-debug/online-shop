import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './domain/location.entity';
import { ProductCategory } from './domain/product-category.entity';
import { Product } from './domain/product.entity';
import { Stock } from './domain/stock.entity';
import { ProductCategoryService } from './service/product-category.service';
import { ProductCategoryRepository } from './repository/product-category.repository';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { StockService } from './service/stock.service';
import { StockRepository } from './repository/stock.repository';

@Module({
    imports:[TypeOrmModule.forFeature([Location, ProductCategory, Product, Stock])],
    providers:[ProductCategoryService, ProductCategoryRepository, ProductService, ProductRepository, StockService, StockRepository],
    exports:[ProductCategoryService, ProductCategoryRepository, ProductService, ProductRepository, StockService, StockRepository]
})
export class ProductsModule {}
