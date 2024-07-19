import { ApiProperty } from "@nestjs/swagger";
import { ProductCategoryDto } from "./product-category.dto";

export class ProductDto{

    @ApiProperty({type:String, description: 'email'})
    id:string;

    @ApiProperty({type:String, description: 'name'})
    name: string;

    @ApiProperty({type:String, description: 'description'})
    description: string;

    @ApiProperty({type:Number, description: 'price'})
    price:number;

    @ApiProperty({type:Number, description: 'weight'})
    weight: number;

    @ApiProperty({type:ProductCategoryDto, description: 'category'})
    category: ProductCategoryDto;

    @ApiProperty({type:String, description: 'supplier'})
    supplier: string;

    @ApiProperty({type:String, description: 'image url'})
    imageUrl: string;

}