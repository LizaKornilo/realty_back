import { StreetModule } from './../street/street.module'
import { CityModule } from './../city/city.module'
import { CountryModule } from './../country/country.module'
import { Module } from '@nestjs/common'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'

@Module({
  imports: [
    CountryModule,
    CityModule,
    StreetModule
  ],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
