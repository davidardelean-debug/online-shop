import { Stock } from '../domain/stock.entity';
import { StockDto } from '../dto/stock.dto';
import { toLocationDto, toLocationEntity } from './location.mapper';
import { toProductDto, toProductEntity } from './product.mapper';

export function toStockDto(stock: Stock): StockDto {
  const product = toProductDto(stock.product);
  const location = toLocationDto(stock.location);

  return { id: stock.id, product, location, quantity: stock.quantity };
}

export function toStockEntity(stockDto: StockDto): Stock {
  const product = toProductEntity(stockDto.product);
  const location = toLocationEntity(stockDto.location);

  return { id: stockDto.id, product, location, quantity: stockDto.quantity };
}
