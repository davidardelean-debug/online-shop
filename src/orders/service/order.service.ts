import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { Stock } from 'src/products/domain/stock.entity';
import { StockService } from 'src/products/service/stock.service';
import { DeleteResult } from 'typeorm';
import { OrderDetail } from '../domain/order-detail.entity';
import { Order } from '../domain/order.entity';
import { OrderItemDto } from '../dto/order-item-dto';
import { OrderRepository } from '../repository/order.repository';
import { OrderDetailService } from './order-detail.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailService: OrderDetailService,
    private readonly stockService: StockService,
  ) {}

  async getAll(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }

  async getById(id: UUID): Promise<Order> {
    try {
      return this.orderRepository.getById(id);
    } catch (error) {
      throw new NotFoundException('Order not found for ID: ' + id);
    }
  }

  async add(order: Order, orderItems: OrderItemDto[]): Promise<Order> {
    const stock = await this.stockService.get(orderItems);
    const { notInStock, updatedStock } = this.checkStock(orderItems, stock);
    if (notInStock.length > 0)
      throw new ForbiddenException(
        'Some of the quantities for the products exceed the current stock.',
      );

    this.stockService.update(updatedStock);
    let newOrder: Order;
    try {
      order.createdAt = new Date();
      newOrder = await this.orderRepository.add(order);
    } catch (error) {
      throw new BadRequestException('Invalid input body for order.');
    }
    const orderDetails = orderItems.map((oI) => {
      return {
        quantity: oI.quantity,
        product: oI.product,
        location: oI.location,
        order: newOrder,
      } as OrderDetail;
    });
    await this.orderDetailService.add(orderDetails);

    return newOrder;
  }

  async update(order: Order): Promise<Order> {
    try {
      const existingOrder = await this.orderRepository.getById(
        order.id as UUID,
      );
      Object.assign(existingOrder, order);
      const updatedOrder = await this.orderRepository.add(existingOrder);
      return updatedOrder;
    } catch (error) {
      throw new BadRequestException('Invalid ID or input body for order.');
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      await this.orderRepository.getById(id as UUID);
    } catch (error) {
      throw new NotFoundException('Order not found for ID: ' + id);
    }
    const queryBuilder = await this.orderDetailService.getAll(id);
    const orderDetailsIds = (await queryBuilder.getMany()).map((oD) => oD.id);
    await this.orderDetailService.removeAll(orderDetailsIds);

    return this.orderRepository.remove(id);
  }

  private checkStock(orderItems: OrderItemDto[], stock: Stock[]) {
    const notInStock = [];
    for (const orderItem of orderItems) {
      const matchingIndex = stock.findIndex(
        (stockItem) => orderItem.product.id === stockItem.product.id,
      );
      const matchingStock = stock[matchingIndex];
      if (
        matchingIndex !== -1 &&
        orderItem.quantity > stock[matchingIndex].quantity
      ) {
        notInStock.push({ orderItem, matchingStock });
      }
      const difference = matchingStock.quantity - orderItem.quantity;
      stock[matchingIndex].quantity = difference;
    }
    return { notInStock, updatedStock: stock };
  }
}
