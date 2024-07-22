import {
  toCustomerDto,
  toCustomerEntity,
} from 'src/customers/mapper/customer.mapper';
import { Order } from '../domain/order.entity';
import { OrderDto } from '../dto/order.dto';

export class OrderMapper {
  static toDto(order: Order): OrderDto {
    const { id, createdAt, country, city, county, street } = order;
    const customer = toCustomerDto(order.customer);
    return { id, createdAt, country, city, county, street, customer };
  }

  static toEntity(orderDto: OrderDto): Order {
    const { id, createdAt, country, city, county, street } = orderDto;
    const customer = toCustomerEntity(orderDto.customer);
    return { id, createdAt, country, city, county, street, customer };
  }
}
