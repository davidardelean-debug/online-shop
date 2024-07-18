import { LocationMapper } from "src/products/mapper/location.mapper";
import { OrderDetail } from "../domain/order-detail.entity";
import { OrderDetailDto } from "../dto/order-detail.dto";


export class OrderDetailMapper{

    static toDto(orderDetail: OrderDetail) : OrderDetailDto{

        const {id, order, product,  quantity} = orderDetail;
        const location = LocationMapper.toDto(orderDetail.location);
        return {id, order, product, location, quantity};
    }

    static toEntity(orderDetailDto: OrderDetailDto): OrderDetail{

        const {id, order, product,  quantity} = orderDetailDto;
        const location = LocationMapper.toEntity(orderDetailDto.location);
        return {id, order, product, location, quantity}; 
    }
}