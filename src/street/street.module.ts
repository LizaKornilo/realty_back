import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Street } from 'src/entity/street.entity'
import { StreetService } from './street.service'

@Module({
  imports: [TypeOrmModule.forFeature([Street])],
  providers: [StreetService],
  exports: [StreetService]
})
export class StreetModule {}
