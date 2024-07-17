import { Column, Entity, ManyToOne,  PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./order.entity";
import { Product } from "src/products/domain/product.entity";
import { Location } from "src/products/domain/location.entity";


@Entity()
export class OrderDetail{

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @ManyToOne(()=>Orders)
    order:Orders;

    @ManyToOne(()=>Product)
    product: Product;

    @ManyToOne(()=>Location)
    location: Location;

    @Column({name:"Quantity", type:"int"})
    quantity: number;
}