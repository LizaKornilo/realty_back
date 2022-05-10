import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Dwelling } from "./dwelling.entity";

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  value: string;

  @OneToMany(
    () => Dwelling,
    (dwelling) => dwelling.city,
  )
  dwellings: Dwelling[];
}
