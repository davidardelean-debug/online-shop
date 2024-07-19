import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UUID } from "crypto";
import { CustomerDto } from "../dto/customer.dto";
import { CustomerMapper } from "../mapper/customer.mapper";
import { CustomerService } from "../service/customers.service";

@Controller('customers')
export class CustomersController{

    constructor(private readonly customerService: CustomerService){}

    //:3000/customers/9c57f2be-0ae4-4ffa-91a7-76e58627af6d
    @Get(':id')
    async getById(@Param('id') id:UUID): Promise<CustomerDto>{
        const customer = await this.customerService.getById(id);
        return CustomerMapper.toDto(customer);
    }

    @Post('new')
    async add(@Body() customerDto: CustomerDto): Promise<CustomerDto>{
        const customer = CustomerMapper.toEntity(customerDto);
        const newCustomer = await this.customerService.add(customer);
        return CustomerMapper.toDto(newCustomer);
    }
}