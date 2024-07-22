import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'Name', type: 'varchar' })
  name: string;

  @Column({ name: 'Address.Country', type: 'varchar' })
  country: string;

  @Column({ name: 'Address.City', type: 'varchar' })
  city: string;

  @Column({ name: 'Address.County', type: 'varchar', length: 20 })
  county: string;

  @Column({ name: 'Address.StreetAddress', type: 'varchar' })
  street: string;
}
