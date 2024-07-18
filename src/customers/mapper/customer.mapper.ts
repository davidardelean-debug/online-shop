import { Customer } from "../domain/customer.entity";
import { CustomerDto } from "../dto/customer.dto";


export class CustomerMapper {

    static toDto(customer: Customer): CustomerDto {
      const { id, firstName, lastName, username, email, password} = customer;
  
      return { id, firstName, lastName, username, email, password };
    }

    static toEntity(customerDto: CustomerDto): Customer{
      const { id, firstName, lastName, username, email, password } = customerDto;
  
      return { id, firstName, lastName, username, email, password};
    }
  }