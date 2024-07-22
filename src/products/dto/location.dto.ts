import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LocationDto{

    @IsString()
    @ApiProperty({type:String, description:"Id"})
    id: string;

    @IsString()
    @MinLength(3, {message: "Required minimum length is 3."})
    @ApiProperty({type:String, description:"Name"})
    name: string;

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
}