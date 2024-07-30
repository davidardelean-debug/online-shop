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
import { ProductCategory } from '../domain/product-category.entity';
import { ProductCategoryDto } from '../dto/product-category.dto';
import {
  toProductCategoryDto,
  toProductCategoryEntity,
} from '../mapper/product-category.mapper';
import { ProductCategoryService } from '../service/product-category.service';

@ApiBearerAuth()
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Get product categories',
    type: Promise<ProductCategoryDto[]>,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  async getAll(): Promise<ProductCategory[]> {
    const categories = await this.productCategoryService.getAll();
    const categoryDtos = categories.map((c) => toProductCategoryDto(c));
    return categoryDtos;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'New product category successfully created',
    type: Promise<ProductCategoryDto>,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({
    description: 'Invalid input body for product category',
  })
  @ApiBody({ type: ProductCategoryDto })
  async add(
    @Body() productCategoryDto: ProductCategoryDto,
  ): Promise<ProductCategoryDto> {
    const productCategory = toProductCategoryEntity(productCategoryDto);
    const newProductCategory =
      await this.productCategoryService.add(productCategory);
    return toProductCategoryDto(newProductCategory);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Product category successfully updated.',
    type: Promise<ProductCategoryDto>,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiNotFoundResponse({ description: 'Product category not found' })
  @ApiBadRequestResponse({
    description: 'Invalid input body for product category',
  })
  @ApiBody({ type: ProductCategoryDto })
  async update(
    @Param('id') id: UUID,
    @Body() productCategoryDto: ProductCategoryDto,
  ) {
    productCategoryDto.id = id;
    const productCategory = toProductCategoryEntity(productCategoryDto);
    const updatedProductCategory =
      await this.productCategoryService.add(productCategory);
    return toProductCategoryDto(updatedProductCategory);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Product succesfully deleted',
    type: Promise<DeleteResult>,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async delete(@Param('id') id: UUID): Promise<DeleteResult> {
    return this.productCategoryService.remove(id);
  }
}
