import { Country } from './../entity/country.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) { }

  async getOneOrCreate(value: string): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { value: value },
    });
    if (!country) {
      const newCountry = new Country();
      newCountry.value = value;
      return await this.countryRepository.save(newCountry);
    }
    return country;
  }
}
