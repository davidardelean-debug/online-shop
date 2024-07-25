import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { CustomerRole } from '../domain/customer-role.entity';

export class CustomerDto {
  id: string;

  @IsString()
  @MinLength(3, { message: 'Required minimum length is 3.' })
  @ApiProperty({ type: String, description: 'First name' })
  firstName: string;

  @IsString()
  @MinLength(3, { message: 'Required minimum length is 3.' })
  @ApiProperty({ type: String, description: 'Last name' })
  lastName: string;

  @IsString()
  @MinLength(5, { message: 'Required minimum length is 5.' })
  @ApiProperty({ type: String, description: 'Username' })
  username: string;

  @IsEmail()
  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Password', format: 'password' })
  password: string;

  @IsEnum(CustomerRole)
  @ApiProperty({
    type: CustomerRole,
    description: 'User role',
    enum: CustomerRole,
  })
  role: CustomerRole;
}
