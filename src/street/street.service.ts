import { City } from 'src/entity/city.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Street } from './../entity/street.entity';

@Injectable()
export class StreetService {
  constructor(
    @InjectRepository(Street) private streetRepository: Repository<Street>,
  ) { }

  async getOne(streetId: number): Promise<Street> {
    const street = await this.streetRepository.findOne({
      where: { id: streetId },
      relations: ['city', 'city.country'], //?
    });
    if (!street)
      throw new HttpException(`Street with id = ${streetId} not found`, HttpStatus.NOT_FOUND);
    return street;
  }

  async createStreet(city: City, value: string): Promise<Street> {
    const newStreet = new Street();
    newStreet.value = value;
    newStreet.city = city;
    return await this.streetRepository.save(newStreet);
  }

  async getStreetByValueAndCityId(cityId: number, value: string): Promise<Street> {
    const city = await this.streetRepository.createQueryBuilder('street')
      .where("street.value = :value", { value })
      .andWhere("street.city_id = :cityId", { cityId })
      .getOne();
    return city;
  }
}
