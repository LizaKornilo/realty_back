import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Dwelling } from "./dwelling.entity";
import { Order } from "./order.entity";
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @ApiProperty({ uniqueItems: true })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    unique: true,
    select: false,
  })
  activationKey: string;

  @ApiProperty()
  @Column({
    default: false,
  })
  is_activated: boolean;

  @OneToMany(
    () => Order,
    (order) => order.user,
  )
  orders: Order[];

  @OneToMany(
    () => Dwelling,
    (dwelling) => dwelling.owner,
  )
  dwellings: Dwelling[];

  @ManyToOne(
    () => Role,
    (role) => role.users,
  )
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;
}
