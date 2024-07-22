import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'FirstName' })
  firstName: string;

  @Column({ name: 'LastName' })
  lastName: string;

  @Column({ name: 'Username' })
  username: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'EmailAddress' })
  email: string;
}
