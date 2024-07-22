import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MinLength } from "class-validator";

export class ProductCategoryDto{

    @IsString()
    @ApiProperty({type:String, description:"Id"})
    id:string;

    @IsString()
    @MinLength(5, {message: "Required minimum length is 5."})
    @ApiProperty({type:String, description:"Name"})
    name: string;

    @IsString()
    @Length(5, 30, {message: "Description length should be between 5 and 30 characters."})
    @ApiProperty({type:String, description:"Description"})
    description: string;
}