import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany
} from 'typeorm'
import { Dwelling } from './dwelling.entity'

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    unique: true
  })
    value: string

  @ManyToMany(
    () => Dwelling,
    (dwellings) => dwellings.tags
  )
    dwellings: Dwelling[]
}
