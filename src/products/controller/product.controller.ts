import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { UUID } from "crypto";
import { ProductMapper } from "../mapper/product.mapper";
import { ProductDto } from "../dto/product.dto";
import { DeleteResult } from "typeorm";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

@Controller('products')
export class ProductController{

    constructor(private readonly productService: ProductService){}
    
    @Get()
    @ApiOkResponse({description:"Get products", type:Promise<ProductDto[]>})
    @ApiUnauthorizedResponse({description:"Invalid credentials."})
    async getAll(): Promise<ProductDto[]>{
        const products = await this.productService.getAll();
        return products.map(p=> ProductMapper.toDto(p));
    }

    @Get(':id')
    @ApiOkResponse({description:"Get product by id", type:Promise<ProductDto>})
    @ApiNotFoundResponse({description:"Product not found"})
    @ApiUnauthorizedResponse({description:"Invalid credentials."})
    async getById(@Param('id') id: UUID): Promise<ProductDto>{
        const product = await this.productService.getById(id)
        return ProductMapper.toDto(product);
    }

    @Post('new')
    @ApiCreatedResponse({description:"New product successfully created", type:Promise<ProductDto>})
    @ApiUnauthorizedResponse({description:"Invalid credentials"})
    @ApiBadRequestResponse({description:"Invalid input body for product"})
    @ApiBody({type:ProductDto})
    async add(@Body() productDto: ProductDto): Promise<ProductDto>{
        const product = ProductMapper.toEntity(productDto);
        const newProduct = await this.productService.add(product);
        return ProductMapper.toDto(newProduct);
    }

    @Put(':id')
    @ApiOkResponse({description:"Product successfully updated.", type:Promise<ProductDto>})
    @ApiUnauthorizedResponse({description:"Invalid credentials"})
    @ApiNotFoundResponse({description:"Product not found"})
    @ApiBadRequestResponse({description:"Invalid input body for product"})
    @ApiBody({type:ProductDto})
    async update(@Param('id') id: UUID, @Body() productDto: ProductDto){
        productDto.id = id;
        const product = ProductMapper.toEntity(productDto);
        const updatedProduct = await this.productService.add(product);
        return ProductMapper.toDto(updatedProduct);
    }

    @Delete(':id')
    @ApiOkResponse({description:"Product succesfully deleted", type:Promise<DeleteResult>})
    @ApiUnauthorizedResponse({description:"Invalid credentials"})
    async remove(@Param('id') id: UUID): Promise<DeleteResult>{
        return await this.productService.remove(id);
    }
}