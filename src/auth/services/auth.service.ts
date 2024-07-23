import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Customer } from 'src/customers/domain/customer.entity';
import { CustomerService } from 'src/customers/service/customers.service';
import { PayloadDto } from '../dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.customerService.getByUsername(username);
    if (user && bcrypt.compare(password, user.password)) {
      delete user.password;

      return user;
    }
    return null;
  }

  async login(customer: Customer) {
    const payload: PayloadDto = {
      username: customer.username,
      sub: {
        email: customer.email,
      },
    };
    return {
      ...customer,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(customer: Customer) {
    const payload: PayloadDto = {
      username: customer.username,
      sub: {
        email: customer.email,
      },
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
