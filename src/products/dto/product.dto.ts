import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDecimal,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { ProductCategoryDto } from './product-category.dto';

export class ProductDto {
  id?: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @IsString()
  @Length(5, 30, {
    message: 'Description length should be between 5 and 30 characters.',
  })
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsDecimal()
  @ApiProperty({ type: Number, description: 'Price' })
  price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: Number, description: 'Weight' })
  weight: number;

  @Type(() => ProductCategoryDto)
  @ApiProperty({ type: ProductCategoryDto, description: 'Category' })
  category: ProductCategoryDto;

  @IsString()
  @ApiProperty({ type: String, description: 'Supplier' })
  supplier: string;

  @IsString()
  @IsUrl()
  @ApiProperty({ type: String, description: 'Image url' })
  imageUrl: string;
}
