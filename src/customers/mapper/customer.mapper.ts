import { Customer } from '../domain/customer.entity';
import { CustomerDto } from '../dto/customer.dto';

export function toCustomerDto(customer: Customer): CustomerDto {
  const { id, firstName, lastName, username, email, password, role } = customer;

  return { id, firstName, lastName, username, email, password, role };
}

export function toCustomerEntity(customerDto: CustomerDto): Customer {
  const { id, firstName, lastName, username, email, password, role } =
    customerDto;

  return { id, firstName, lastName, username, email, password, role };
}
