import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm'
import { City } from './city.entity'

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    unique: true
  })
    value: string

  @OneToMany(
    () => City,
    (city) => city.country
  )
    cities: City[]
}
