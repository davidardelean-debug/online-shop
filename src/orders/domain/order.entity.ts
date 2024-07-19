import { Customer } from "src/customers/domain/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"orders"})
export class Order{

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @ManyToOne(()=> Customer, {eager:true})
    @JoinColumn({name:"Customer"})
    customer:Customer;

    @Column({name:"CreatedAt", type:"timestamp"})
    createdAt: Date;

    @Column({name:"Address.Country", type:"varchar", length:20})
    country: string;

    @Column({name:"Address.City", type:"varchar", length:20})
    city:string;

    @Column({name: "Address.County", type:"varchar", length:20})
    county: string;

    @Column({name:"Address.StreetAddress", type:"varchar", length:20})
    street: string;
}