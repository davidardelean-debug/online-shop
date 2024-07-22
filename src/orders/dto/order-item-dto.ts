import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { LocationDto } from 'src/products/dto/location.dto';
import { ProductDto } from 'src/products/dto/product.dto';

export class OrderItemDto {
  @Type(() => ProductDto)
  @ApiProperty({ type: ProductDto, description: 'Product' })
  product: ProductDto;

  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  @ApiProperty({ type: Number, description: 'Quantity' })
  quantity: number;

  @Type(() => LocationDto)
  @ApiProperty({ type: LocationDto, description: 'Product stock location' })
  location: LocationDto;
}
