import { Location } from 'src/products/domain/location.entity';
import { Product } from 'src/products/domain/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'OrderId' })
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'Product' })
  product: Product;

  @ManyToOne(() => Location, { eager: true })
  @JoinColumn({ name: 'ShippedFrom' })
  location: Location;

  @Column({ name: 'Quantity', type: 'int' })
  quantity: number;
}
