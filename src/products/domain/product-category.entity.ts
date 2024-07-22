import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'Name', type: 'varchar' })
  name: string;

  @Column({ name: 'Description', type: 'varchar' })
  description: string;
}
