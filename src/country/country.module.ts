import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './country.service';
import { Country } from './../entity/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountryService],
  exports: [CountryService],
  controllers: [],
})
export class CountryModule { }
