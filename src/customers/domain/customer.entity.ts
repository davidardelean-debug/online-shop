import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerRole } from './customer-role.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'FirstName' })
  firstName: string;

  @Column({ name: 'LastName' })
  lastName: string;

  @Column({ name: 'Username' })
  username: string;

  @Column({ name: 'Password' })
  password?: string;

  @Column({ name: 'EmailAddress' })
  email: string;

  @Column({ name: 'Role' })
  role: CustomerRole;
}
