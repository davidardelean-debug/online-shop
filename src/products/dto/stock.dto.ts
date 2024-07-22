import { IsInstance, IsInt, IsString, Min } from "class-validator";
import { LocationDto } from "./location.dto";
import { ProductDto } from "./product.dto";
import { ApiProperty } from "@nestjs/swagger";


export class StockDto{

    @IsString()
    @ApiProperty({type:String, description:"Id"})
    id: string;

    @IsInstance(ProductDto)
    @ApiProperty({type:ProductDto, description:"Product"})
    product: ProductDto;

    @IsInstance(LocationDto)
    @ApiProperty({type:LocationDto, description:"Location"})
    location: LocationDto;

    @IsInt()
    @ApiProperty({type:Number, description:"Quantity"})
    quantity: number;
}