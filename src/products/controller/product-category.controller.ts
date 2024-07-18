import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProductCategory } from "../domain/product-category.entity";
import { ProductCategoryService } from "../service/product-category.service";
import { ProductCategoryMapper } from "../mapper/product-category.mapper";
import { ProductCategoryDto } from "../dto/product-category.dto";
import { UUID } from "crypto";

@Controller("product-category")
export class ProductCategoryController{

    constructor(private readonly productCategoryService: ProductCategoryService){}

    //:3000/product-category
    @Get()
    async getAll(): Promise<ProductCategory[]>{
        const categories = await this.productCategoryService.getAll()
        const categoryDtos = categories.map(c=> ProductCategoryMapper.toDto(c))
        return categoryDtos;
    }

    //:3000/product-category/new
     @Post('new')
     async add(@Body() productCategoryDto: ProductCategoryDto): Promise<ProductCategoryDto>{
        const productCategory =  ProductCategoryMapper.toEntity(productCategoryDto);
        const newProductCategory = await this.productCategoryService.add(productCategory);
        return ProductCategoryMapper.toDto(newProductCategory);
     }

     //:3000/product-category/e51bee8f-6b42-487f-9de3-f7a8aedf5e35
    @Put(':id')
    async update(@Param('id') id:UUID, @Body() productCategoryDto: ProductCategoryDto){

        productCategoryDto.id= id;
        const productCategory = ProductCategoryMapper.toEntity(productCategoryDto);
        const updatedProductCategory = await this.productCategoryService.add(productCategory);
        return ProductCategoryMapper.toDto(updatedProductCategory);
    }

    @Delete(':id')
    async delete(@Param('id') id:UUID){
        const deletedCategory = await this.productCategoryService.remove(id);
        if (!deletedCategory) {
            throw new NotFoundException('Product category not found');
          }
          return HttpStatus.NO_CONTENT; 
    }
}