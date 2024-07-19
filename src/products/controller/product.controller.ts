import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { UUID } from "crypto";
import { ProductMapper } from "../mapper/product.mapper";
import { ProductDto } from "../dto/product.dto";
import { DeleteResult } from "typeorm";

@Controller('products')
export class ProductController{

    constructor(private readonly productService: ProductService){}
    
    @Get()
    async getAll(): Promise<ProductDto[]>{
        const products = await this.productService.getAll();
        return products.map(p=> ProductMapper.toDto(p));
    }

    @Get(':id')
    async getById(@Param('id') id: UUID): Promise<ProductDto>{
        const product = await this.productService.getById(id)
        return ProductMapper.toDto(product);
    }

    @Post('new')
    async add(@Body() productDto: ProductDto): Promise<ProductDto>{
        const product = ProductMapper.toEntity(productDto);
        const newProduct = await this.productService.add(product);
        return ProductMapper.toDto(newProduct);
    }

    @Put(':id')
    async update(@Param('id') id: UUID, @Body() productDto: ProductDto){
        productDto.id = id;
        const product = ProductMapper.toEntity(productDto);
        const updatedProduct = await this.productService.add(product);
        return ProductMapper.toDto(updatedProduct);
    }

    @Delete(':id')
    async remove(id: UUID): Promise<DeleteResult>{
        return await this.productService.remove(id);
    }
}