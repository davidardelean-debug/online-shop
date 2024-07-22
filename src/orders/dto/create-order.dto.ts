import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsInstance, IsInt, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { CustomerDto } from "src/customers/dto/customer.dto";
import { LocationDto } from "src/products/dto/location.dto";
import { ProductDto } from "src/products/dto/product.dto";

export class OrderItem{

    @IsInstance(ProductDto)
    @ApiProperty({type:ProductDto, description:"Product"})
    product: ProductDto;
    
    @IsInt()
    @Min(1, { message: "Quantity must be at least 1" })
    @ApiProperty({type:Number, description:"Quantity"})
    quantity: number;

    @IsInstance(LocationDto)
    @ApiProperty({type:LocationDto, description:"Product stock location"})
    location: LocationDto;
}
export class CreateOrderDto{

    @IsString()
    @ApiProperty({type:String, description:"Id"})
    id:string;

    @IsInstance(CustomerDto)
    @ApiProperty({type:CustomerDto, description:"Customer"})
    customer:CustomerDto;

    createdAt?: Date;

    @IsString()
    @MinLength(5, {message: "Required minimum length is 5."})
    @ApiProperty({type:String, description:"Country"})
    country: string;

    @IsString()
    @MinLength(5, {message: "Required minimum length is 5."})
    @ApiProperty({type:String, description:"City"})
    city:string;

    @IsString()
    @MinLength(5, {message: "Required minimum length is 5."})
    @ApiProperty({type:String, description:"County"})
    county: string;

    @IsString()
    @MinLength(5, {message: "Required minimum length is 5."})
    @ApiProperty({type:String, description:"Street"})
    street: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each:true})
    @ApiProperty({type:[OrderItem], description:"The products of the order and their respective quantities"})
    orderItems: OrderItem[];

    @IsInstance(LocationDto)
    @ApiProperty({type:LocationDto, description:"Location"})
    location: LocationDto;
}