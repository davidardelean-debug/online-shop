import { CustomerDto } from "src/customers/dto/customer.dto";
import { Location } from "src/products/domain/location.entity";
import { Product } from "src/products/domain/product.entity";

export interface OrderItem{
    product: Product;
    quantity: number;
}
export class CreateOrderDto{

    id:string;

    customer:CustomerDto;

    createdAt: Date;

    country: string;

    city:string;

    county: string;

    street: string;

    orderItems: OrderItem[];

    location: Location;
}