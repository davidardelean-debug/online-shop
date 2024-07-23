import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Customer } from 'src/customers/domain/customer.entity';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Customer> {
    try {
      return this.authService.validateUser(username, password);
    } catch (error) {
      throw new UnauthorizedException('Non-existent user');
    }
  }
}
