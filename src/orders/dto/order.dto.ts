import { CustomerDto } from "src/customers/dto/customer.dto";


export class OrderDto{

    id:string;

    customer:CustomerDto;

    createdAt: Date;

    country: string;

    city:string;

    county: string;

    street: string;
}