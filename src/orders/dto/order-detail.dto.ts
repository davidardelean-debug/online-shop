import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';
import { LocationDto } from 'src/products/dto/location.dto';
import { ProductDto } from 'src/products/dto/product.dto';
import { OrderDto } from './order.dto';

export class OrderDetailDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Id' })
  id: string;

  @Type(() => OrderDto)
  @ApiProperty({ type: OrderDto, description: 'Order' })
  order: OrderDto;

  @Type(() => ProductDto)
  @ApiProperty({ type: ProductDto, description: 'Product' })
  product: ProductDto;

  @Type(() => LocationDto)
  @ApiProperty({ type: LocationDto, description: 'Location' })
  location: LocationDto;

  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  @ApiProperty({ type: Number, description: 'Quantity' })
  quantity: number;
}
