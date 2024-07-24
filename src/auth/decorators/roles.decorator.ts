import { Reflector } from '@nestjs/core';
import { CustomerRole } from 'src/customers/domain/customer-role.entity';

export const Roles = Reflector.createDecorator<CustomerRole | CustomerRole[]>();
