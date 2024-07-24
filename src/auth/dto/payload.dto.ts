import { CustomerRole } from 'src/customers/domain/customer-role.entity';

export interface PayloadDto {
  username: string;
  sub: {
    email: string;
    role: CustomerRole;
  };
}
