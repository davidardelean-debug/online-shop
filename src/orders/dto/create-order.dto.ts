import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CustomerDto } from 'src/customers/dto/customer.dto';
import { LocationDto } from 'src/products/dto/location.dto';
import { OrderItemDto } from './order-item-dto';

export class CreateOrderDto {
  id: string;

  @Type(() => CustomerDto)
  @ApiProperty({ type: CustomerDto, description: 'Customer' })
  customer: CustomerDto;

  createdAt?: Date;

  @IsString()
  @MinLength(5, { message: 'Required minimum length is 5.' })
  @ApiProperty({ type: String, description: 'Country' })
  country: string;

  @IsString()
  @MinLength(5, { message: 'Required minimum length is 5.' })
  @ApiProperty({ type: String, description: 'City' })
  city: string;

  @IsString()
  @MinLength(5, { message: 'Required minimum length is 5.' })
  @ApiProperty({ type: String, description: 'County' })
  county: string;

  @IsString()
  @MinLength(5, { message: 'Required minimum length is 5.' })
  @ApiProperty({ type: String, description: 'Street' })
  street: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [OrderItemDto],
    description: 'The products of the order and their respective quantities',
  })
  orderItems: OrderItemDto[];

  @Type(() => LocationDto)
  @ApiProperty({ type: LocationDto, description: 'Location' })
  location: LocationDto;
}
