import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UUID } from "crypto";
import { CustomerDto } from "../dto/customer.dto";
import { CustomerMapper } from "../mapper/customer.mapper";
import { CustomerService } from "../service/customers.service";
import { ApiOkResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiBody, ApiCreatedResponse } from "@nestjs/swagger";

@Controller('customers')
export class CustomersController{

    constructor(private readonly customerService: CustomerService){}

    @Get(':id')
    @ApiOkResponse({description:"Get customer by id", type:Promise<CustomerDto>})
    @ApiNotFoundResponse({description:"Customer not found"})
    @ApiUnauthorizedResponse({description:"Invalid credentials."})
    async getById(@Param('id') id:UUID): Promise<CustomerDto>{
        const customer = await this.customerService.getById(id);
        return CustomerMapper.toDto(customer);
    }

    @Post('new')
    @ApiCreatedResponse({description:"New customer successfully created", type:Promise<CustomerDto>})
    @ApiUnauthorizedResponse({description:"Invalid credentials"})
    @ApiBadRequestResponse({description:"Invalid input body for customer"})
    @ApiBody({type:CustomerDto})
    async add(@Body() customerDto: CustomerDto): Promise<CustomerDto>{
        const customer = CustomerMapper.toEntity(customerDto);
        const newCustomer = await this.customerService.add(customer);
        return CustomerMapper.toDto(newCustomer);
    }
}