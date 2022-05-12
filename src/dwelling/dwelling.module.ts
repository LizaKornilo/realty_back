import { StreetModule } from './../street/street.module';
import { CityModule } from './../city/city.module';
import { CountryModule } from './../country/country.module';
import { FilesModule } from './../files/files.module';
import { UserModule } from './../user/user.module';
import { TagModule } from './../tag/tag.module';
import { Dwelling } from './../entity/dwelling.entity';
import { Module } from '@nestjs/common';
import { DwellingService } from './dwelling.service';
import { DwellingController } from './dwelling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dwelling]),
    TagModule,
    UserModule,
    FilesModule,
    StreetModule,
  ],
  providers: [DwellingService],
  controllers: [DwellingController],
  exports: [DwellingService],
})
export class DwellingModule {}
