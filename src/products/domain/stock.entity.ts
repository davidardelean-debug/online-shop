import { Location } from "src/products/domain/location.entity";
import { Product } from "src/products/domain/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Stock{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(()=>Product)
    product: Product;

    @ManyToOne(()=> Location)
    location: Location;

    @Column({name:"Quantity", type:"int"})
    quantity: number;
}