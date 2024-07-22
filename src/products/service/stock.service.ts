import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderItemDto } from 'src/orders/dto/order-item-dto';
import { Stock } from '../domain/stock.entity';
import { StockRepository } from '../repository/stock.repository';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async get(orderItems: OrderItemDto[]): Promise<Stock[]> {
    try {
      return this.stockRepository.getMany(orderItems);
    } catch (error) {
      throw new NotFoundException(
        'Stock not found some of the products and their specified location',
      );
    }
  }

  async update(updatedStock: Stock[]): Promise<Stock[]> {
    try {
      return this.stockRepository.add(updatedStock);
    } catch (error) {
      throw new BadRequestException('Invalid input body for stock.');
    }
  }
}
