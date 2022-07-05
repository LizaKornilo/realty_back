import { Roles } from './../role/roles-values.enum'
import { ApiProperty } from '@nestjs/swagger'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @ApiProperty({
    enum: Roles,
    enumName: 'Roles',
    example: 'owner'
  })
  @Column({
    unique: true
  })
    value: string

  @OneToMany(
    () => User,
    (user) => user.role
  )
    users: User[]
}
