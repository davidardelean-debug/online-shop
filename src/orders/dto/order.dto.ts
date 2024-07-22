import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInstance, IsString, MinLength } from 'class-validator';
import { CustomerDto } from 'src/customers/dto/customer.dto';

export class OrderDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Id' })
  id: string;

  @Type(() => CustomerDto)
  @ApiProperty({ type: CustomerDto, description: 'Customer' })
  customer: CustomerDto;

  @IsInstance(Date)
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
}
