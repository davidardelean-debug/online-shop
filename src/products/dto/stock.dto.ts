import { LocationDto } from "./location.dto";
import { ProductDto } from "./product.dto";


export class StockDto{

    id: string;

    product: ProductDto;

    location: LocationDto;

    quantity: number;
}