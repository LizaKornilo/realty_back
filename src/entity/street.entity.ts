import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { City } from './city.entity'
import { Dwelling } from './dwelling.entity'

@Entity()
export class Street extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    value: string

  @ManyToOne(
    () => City,
    (city) => city.streets
  )
  @JoinColumn({
    name: 'city_id'
  })
    city: City

  @OneToMany(
    () => Dwelling,
    (dwelling) => dwelling.street
  )
    dwellings: Dwelling[]
}
