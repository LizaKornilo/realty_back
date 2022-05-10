import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Dwelling } from "./dwelling.entity";

@Entity()
export class Street extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  value: string;

  @OneToMany(
    () => Dwelling,
    (dwelling) => dwelling.street,
  )
  dwellings: Dwelling[];
}
