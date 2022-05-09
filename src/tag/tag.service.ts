import { Tag } from './../entity/tag.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) { }

  async getTagListByIds(ids: number[]) {
    const tags = await this.tagRepository
      .createQueryBuilder("tag")
      .where("tag.id IN (:...ids)", { ids })
      .getMany();
    if (tags.length !== ids.length) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `One or more tags not found`,
      }, HttpStatus.NOT_FOUND);
    }
    return tags;
  }
}
