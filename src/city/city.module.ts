import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { City } from 'src/entity/city.entity'
import { CityService } from './city.service'

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule { }
