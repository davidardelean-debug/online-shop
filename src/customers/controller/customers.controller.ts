import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
import { JwtGuard } from '../../auth/guards/jwt-auth.guard';
import { CustomerDto } from '../dto/customer.dto';
import { toCustomerDto, toCustomerEntity } from '../mapper/customer.mapper';
import { CustomerService } from '../service/customers.service';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  @ApiOkResponse({
    description: 'Get customer by id',
    type: CustomerDto,
  })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  async getById(@Param('id') id: UUID): Promise<CustomerDto> {
    const customer = await this.customerService.getById(id);
    return toCustomerDto(customer);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'New customer successfully created',
    type: Promise<CustomerDto>,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid input body for customer' })
  @ApiBody({ type: CustomerDto })
  async add(@Body() customerDto: CustomerDto): Promise<CustomerDto> {
    const customer = toCustomerEntity(customerDto);
    const newCustomer = await this.customerService.add(customer);
    return toCustomerDto(newCustomer);
  }
}
