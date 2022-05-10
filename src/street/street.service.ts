import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Street } from './../entity/street.entity';

@Injectable()
export class StreetService {
  constructor(@InjectRepository(Street) private streetRepository: Repository<Street>) { }

  async getOneOrCreate(value: string): Promise<Street> {
    const street = await this.streetRepository.findOne({
      where: { value: value },
    });
    if (!street) {
      const newStreet = new Street();
      newStreet.value = value;
      return await this.streetRepository.save(newStreet);
    }
    return street;
  }
}
