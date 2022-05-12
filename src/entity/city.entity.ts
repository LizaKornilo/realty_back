import { Country } from './country.entity';
import { Street } from './street.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(
    () => Country,
    (country) => country.cities,
  )
  @JoinColumn({
    name: 'country_id',
  })
  country: Country;

  @OneToMany(
    () => Street,
    (street) => street.city,
  )
  streets: Street[];
}
