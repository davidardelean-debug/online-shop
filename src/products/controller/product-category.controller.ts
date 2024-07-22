import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProductCategory } from "../domain/product-category.entity";
import { ProductCategoryService } from "../service/product-category.service";
import { ProductCategoryMapper } from "../mapper/product-category.mapper";
import { ProductCategoryDto } from "../dto/product-category.dto";
import { UUID } from "crypto";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

@Controller("product-category")
export class ProductCategoryController{

    constructor(private readonly productCategoryService: ProductCategoryService){}

    @Get()
    @ApiOkResponse({description:"Get product categories", type:Promise<ProductCategoryDto[]>})
    @ApiUnauthorizedResponse({description:"Invalid credentials."})
    async getAll(): Promise<ProductCategory[]>{
        const categories = await this.productCategoryService.getAll()
        const categoryDtos = categories.map(c=> ProductCategoryMapper.toDto(c))
        return categoryDtos;
    }

     @Post('new')
     @ApiCreatedResponse({description:"New product category successfully created", type:Promise<ProductCategoryDto>})
     @ApiUnauthorizedResponse({description:"Invalid credentials"})
     @ApiBadRequestResponse({description:"Invalid input body for product category"})
     @ApiBody({type:ProductCategoryDto})
     async add(@Body() productCategoryDto: ProductCategoryDto): Promise<ProductCategoryDto>{
        const productCategory =  ProductCategoryMapper.toEntity(productCategoryDto);
        const newProductCategory = await this.productCategoryService.add(productCategory);
        return ProductCategoryMapper.toDto(newProductCategory);
     }

    @Put(':id')
    @ApiOkResponse({description:"Product category successfully updated.", type:Promise<ProductCategoryDto>})
    @ApiUnauthorizedResponse({description:"Invalid credentials"})
    @ApiNotFoundResponse({description:"Product category not found"})
    @ApiBadRequestResponse({description:"Invalid input body for product category"})
    @ApiBody({type:ProductCategoryDto})
    async update(@Param('id') id:UUID, @Body() productCategoryDto: ProductCategoryDto){

        productCategoryDto.id= id;
        const productCategory = ProductCategoryMapper.toEntity(productCategoryDto);
        const updatedProductCategory = await this.productCategoryService.add(productCategory);
        return ProductCategoryMapper.toDto(updatedProductCategory);
    }

    @Delete(':id')
    @ApiOkResponse({description:"Product succesfully deleted", type:Promise<DeleteResult>})
    @ApiUnauthorizedResponse({description:"Invalid credentials"})
    async delete(@Param('id') id:UUID){
        return await this.productCategoryService.remove(id);
    }
}
 

