import { Stock } from "../domain/stock.entity";
import { StockDto } from "../dto/stock.dto";
import { LocationMapper } from "./location.mapper";
import { ProductMapper } from "./product.mapper";

export class StockMapper{

    static toDto(stock: Stock): StockDto{
        const product = ProductMapper.toDto(stock.product);
        const location = LocationMapper.toDto(stock.location);

        return {id: stock.id, product, location, quantity: stock.quantity};
    }

    static toEntity(stockDto: StockDto): Stock{
        const product = ProductMapper.toEntity(stockDto.product);
        const location = LocationMapper.toEntity(stockDto.location);

        return {id: stockDto.id, product, location, quantity: stockDto.quantity};
    }
}