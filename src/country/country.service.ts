import { Country } from './../entity/country.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) { }

  async getCountryByValue(value: string): Promise<Country> {
    return await this.countryRepository.findOne({ where: { value: value } });
  }

  async createCountry(value: string) {
    const newCountry = new Country();
    newCountry.value = value;
    return await this.countryRepository.save(newCountry);
  }
}
