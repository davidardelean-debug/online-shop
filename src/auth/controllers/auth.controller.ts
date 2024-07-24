import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CustomerDto } from 'src/customers/dto/customer.dto';
import {
  toCustomerDto,
  toCustomerEntity,
} from 'src/customers/mapper/customer.mapper';
import { CustomerService } from 'src/customers/service/customers.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CustomerDto): Promise<CustomerDto> {
    const customer = toCustomerEntity(createUserDto);
    const newCustomer = await this.customerService.add(customer);
    return toCustomerDto(newCustomer);
  }

  // @UseGuards(RefreshJwtGuard)
  // @Post('refresh')
  // async refreshToken(@Request() req) {
  //   return this.authService.refreshToken(req);
  // }
}
