import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { UUID } from "crypto";
import { OrderDto } from "../dto/order.dto";
import { OrderMapper } from "../mapper/order.mapper";
import { CreateOrderDto } from "../dto/create-order.dto";
import { LocationMapper } from "src/products/mapper/location.mapper";

@Controller('orders')
export class OrdersController{

    constructor(private readonly orderService: OrderService){}

    @Get(':id')
    async getById(@Param('id') id:UUID): Promise<OrderDto>{
        const order = await this.orderService.getById(id);
        return OrderMapper.toDto(order);
    }

    @Post('new')
    async add(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto>{
        const order = OrderMapper.toEntity(createOrderDto);
        const orderItems = createOrderDto.orderItems;
        const location = LocationMapper.toEntity(createOrderDto.location);
        const newOrder = await this.orderService.add(order, orderItems, location);
        return OrderMapper.toDto(newOrder);
    }
}