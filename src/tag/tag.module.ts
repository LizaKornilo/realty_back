import { Tag } from './../entity/tag.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  exports: [TagService],
  controllers: [TagController]
})
export class TagModule {}
