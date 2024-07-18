import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductCategory } from "./product-category.entity";


@Entity()
export class Product{

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({name:"Name", type:"varchar"})
    name: string;

    @Column({name:"Description", type:"varchar"})
    description: string;

    @Column({name:"Price", type:"decimal"})
    price:number;

    @Column({name:"Weight", type:"double precision"})
    weight: number;

    @ManyToOne(()=>ProductCategory, {cascade:true})
    @JoinColumn({name:"Category"})
    category: ProductCategory;

    @Column({name:"Supplier", type:"varchar"})
    supplier: string;

    @Column({name:"ImageUrl", type:"varchar"})
    imageUrl: string;

}