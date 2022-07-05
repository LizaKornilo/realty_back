import { Street } from 'src/entity/street.entity'
import { Country } from './../entity/country.entity'
import { CreateAddressDto } from './dto/create-address.dto'
import { StreetService } from './../street/street.service'
import { CityService } from 'src/city/city.service'
import { CountryService } from 'src/country/country.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { City } from 'src/entity/city.entity'

@Injectable()
export class AddressService {
  constructor (
    private countryService: CountryService,
    private cityService: CityService,
    private streetService: StreetService
  ) { }

  async createAddress (createAddressDto: CreateAddressDto): Promise<Street> {
    const country: Country = await this.countryService.getCountryByValue(createAddressDto.countryValue)
    if (!country) {
      const newCountry: Country = await this.countryService.createCountry(createAddressDto.countryValue)
      const newCity: City = await this.cityService.createCity(newCountry, createAddressDto.cityValue)
      const newStreet: Street = await this.streetService.createStreet(newCity, createAddressDto.streetValue)
      return await this.streetService.getOne(newStreet.id)
    }
    const city: City = await this.cityService.getCityByValueAndCountryId(country.id, createAddressDto.cityValue)
    if (!city) {
      const newCity: City = await this.cityService.createCity(country, createAddressDto.cityValue)
      const newStreet: Street = await this.streetService.createStreet(newCity, createAddressDto.streetValue)
      return await this.streetService.getOne(newStreet.id)
    }
    const street: Street = await this.streetService.getStreetByValueAndCityId(city.id, createAddressDto.streetValue)
    if (!street) {
      const newStreet: Street = await this.streetService.createStreet(city, createAddressDto.streetValue)
      return await this.streetService.getOne(newStreet.id)
    }
    throw new HttpException(
      `Address with country = '${country.value}', city = '${city.value}' and street = '${street.value}' is alredy exist`,
      HttpStatus.INTERNAL_SERVER_ERROR
    )
  }
}
