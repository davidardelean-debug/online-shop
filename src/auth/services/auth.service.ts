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
    if (user && (await bcrypt.compare(password, user.password))) {
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
        role: customer.role,
      },
    };
    return {
      user: { ...customer },
      accessToken: this.jwtService.sign(payload),
      // refreshToken: this.jwtService.sign(payload, {
      //   expiresIn: '7d',
      // }),
    };
  }

  async refreshToken(customer: Partial<Customer>) {
    const payload: PayloadDto = {
      username: customer.username,
      sub: {
        email: customer.email,
        role: customer.role,
      },
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
