import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemDto } from 'src/orders/dto/order-item-dto';
import { Repository } from 'typeorm';
import { Stock } from '../domain/stock.entity';

@Injectable()
export class StockRepository {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async getMany(orderItems: OrderItemDto[]): Promise<Stock[]> {
    const queryBuilder = this.stockRepository
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.product', 'product')
      .leftJoinAndSelect('stock.location', 'location');

    orderItems.forEach((orderItem, index) => {
      queryBuilder.orWhere(
        `(product.id = :productId${index} AND location.id = :locationId${index})`,
        {
          [`productId${index}`]: orderItem.product.id,
          [`locationId${index}`]: orderItem.location.id,
        },
      );
    });
    return queryBuilder.getMany();
  }

  async add(stock: Stock[]): Promise<Stock[]> {
    return this.stockRepository.save(stock);
  }
}
