import { LocationDto } from "src/products/dto/location.dto";
import { ProductDto } from "src/products/dto/product.dto";
import { OrderDto } from "./order.dto";



export class OrderDetailDto{

    id:string;

    order:OrderDto;

    product: ProductDto;

    location: LocationDto;

    quantity: number;
}