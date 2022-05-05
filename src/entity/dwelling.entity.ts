import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Dwelling extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({
    type: "numeric",
  })
  @Column({
    type: "numeric",
  })
  price: number;

  @ApiProperty()
  @Column(
    // Set 'empty' image by default
    // {
    //   default: "",
    // }
  )
  image_path: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    default: true
  })
  @Column({
    default: true,
  })
  is_active: boolean;

  @ApiProperty()
  @ManyToMany(
    () => Tag,
    (tag) => tag.dwellings,
  )
  @JoinTable({
    name: 'dwelling_tag',
    joinColumn: {
      name: 'dwelling_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @ApiProperty()
  @ManyToOne(
    () => User,
    (user) => user.dwellings,
  )
  @JoinColumn({
    name: 'owner_id',
  })
  owner: User;
}
