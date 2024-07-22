import { LocationDto } from "src/products/dto/location.dto";
import { ProductDto } from "src/products/dto/product.dto";
import { OrderDto } from "./order.dto";
import { IsInt, IsInstance, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDetailDto{

    @IsString()
    @ApiProperty({type:String, description:"Id"})
    id:string;

    @IsInstance(OrderDto)
    @ApiProperty({type:OrderDto, description:"Order"})
    order:OrderDto;

    @IsInstance(ProductDto)
    @ApiProperty({type:ProductDto, description:"Product"})
    product: ProductDto;

    @IsInstance(LocationDto)
    @ApiProperty({type:LocationDto, description:"Location"})
    location: LocationDto;

    @IsInt()
    @Min(1, { message: "Quantity must be at least 1" })
    @ApiProperty({type:Number, description:"Quantity"})
    quantity: number;
}