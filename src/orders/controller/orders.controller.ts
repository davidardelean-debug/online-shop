import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import { DeleteResult } from 'typeorm';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderDto } from '../dto/order.dto';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderService } from '../service/order.service';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({ description: 'Get orders', type: Promise<OrderDto[]> })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async getAll() {
    const orders = await this.orderService.getAll();
    return orders.map((o) => OrderMapper.toDto(o));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get order by id', type: Promise<OrderDto[]> })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async getById(@Param('id') id: UUID): Promise<OrderDto> {
    const order = await this.orderService.getById(id);
    return OrderMapper.toDto(order);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Order successfully created' })
  @ApiBadRequestResponse({ description: 'Invalid input body for order' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: CreateOrderDto })
  async add(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const order = OrderMapper.toEntity(createOrderDto);
    const orderItems = createOrderDto.orderItems;
    const newOrder = await this.orderService.add(order, orderItems);
    return OrderMapper.toDto(newOrder);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Order successfully updated.',
    type: Promise<OrderDto>,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @ApiBadRequestResponse({ description: 'Invalid input body for order' })
  @ApiBody({ type: OrderDto })
  async update(
    @Param('id') id: UUID,
    @Body() orderDto: OrderDto,
  ): Promise<OrderDto> {
    const order = OrderMapper.toEntity(orderDto);
    order.id = id;
    return this.orderService.update(order);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Order succesfully deleted',
    type: Promise<DeleteResult>,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderService.remove(id);
  }
}
