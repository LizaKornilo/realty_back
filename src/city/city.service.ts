import { Country } from './../entity/country.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { City } from './../entity/city.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CityService {
  constructor (@InjectRepository(City) private cityRepository: Repository<City>) { }

  async createCity (country: Country, value: string) {
    const newCity = new City()
    newCity.value = value
    newCity.country = country
    return await this.cityRepository.save(newCity)
  }

  async getCityByValueAndCountryId (countryId: number, value: string): Promise<City> {
    const city = await this.cityRepository.createQueryBuilder('city')
      .where('city.value = :value', { value })
      .andWhere('city.country_id = :countryId', { countryId })
      .getOne()
    return city
  }
}
