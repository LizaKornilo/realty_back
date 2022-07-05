import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Dwelling } from './dwelling.entity'
import { User } from './user.entity'

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    start_date: Date

  @Column()
    end_date: Date

  @ManyToOne(
    () => User,
    (user) => user.orders
  )
  @JoinColumn({
    name: 'user_id'
  })
    user: User

  @ManyToOne(() => Dwelling)
  @JoinColumn({
    name: 'dwelling_id'
  })
    dwelling: Dwelling
}
