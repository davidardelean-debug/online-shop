import { IsInt, IsNumber, IsString } from "class-validator";


export class RemoteLocationDto{

    @IsInt()
    id:number;

    @IsString()
    nume:string;

    @IsString()
    diacritice: string;

    @IsString()
    judet:string;

    @IsString()
    auto:string;

    @IsInt()
    zip:number;

    @IsInt()
    populatie:number;

    @IsNumber()
    lat: number;

    @IsNumber()
    lng:number;
}