import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './domain/location.entity';
import { ProductCategory } from './domain/product-category.entity';
import { Product } from './domain/product.entity';
import { Stock } from './domain/stock.entity';

@Module({imports:[TypeOrmModule.forFeature([Location, ProductCategory, Product, Stock])]})
export class ProductsModule {}
