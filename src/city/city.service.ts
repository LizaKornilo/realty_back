import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entity/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(@InjectRepository(City) private cityRepository: Repository<City>) { }

  async getOneOrCreate(value: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { value: value },
    });
    if (!city) {
      const newCity = new City();
      newCity.value = value;
      return await this.cityRepository.save(newCity);
    }
    return city;
  }
}
