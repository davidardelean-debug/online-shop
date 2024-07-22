import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CustomerDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Id' })
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

  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'Password', format: 'password' })
  password: string;
}
