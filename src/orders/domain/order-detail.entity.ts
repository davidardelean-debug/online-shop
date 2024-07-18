import { Column, Entity, JoinColumn, ManyToOne,  PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/products/domain/product.entity";
import { Location } from "src/products/domain/location.entity";


@Entity()
export class OrderDetail{

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @ManyToOne(()=>Order)
    @JoinColumn({name:"Order"})
    order:Order;

    @ManyToOne(()=>Product)
    @JoinColumn({name:"Product"})
    product: Product;

    @ManyToOne(()=>Location)
    @JoinColumn({name:"ShippedFrom"})
    location: Location;

    @Column({name:"Quantity", type:"int"})
    quantity: number;
}