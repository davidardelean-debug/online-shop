import {
  toLocationDto,
  toLocationEntity,
} from 'src/products/mapper/location.mapper';
import { OrderDetail } from '../domain/order-detail.entity';
import { OrderDetailDto } from '../dto/order-detail.dto';

export class OrderDetailMapper {
  static toDto(orderDetail: OrderDetail): OrderDetailDto {
    const { id, order, product, quantity } = orderDetail;
    const location = toLocationDto(orderDetail.location);
    return { id, order, product, location, quantity };
  }

  static toEntity(orderDetailDto: OrderDetailDto): OrderDetail {
    const { id, order, product, quantity } = orderDetailDto;
    const location = toLocationEntity(orderDetailDto.location);
    return { id, order, product, location, quantity };
  }
}
