import { Tag } from './../entity/tag.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';

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

  async addOne(createTagDto: CreateTagDto) {
    await this.throwTagIsAlredyExistError(createTagDto.value);
    const tag = new Tag();
    tag.value = createTagDto.value;
    return await this.tagRepository.save(tag);
  }

  async throwTagIsAlredyExistError(value: string) {
    const candidate = await this.tagRepository.findOne({ where: { value: value } });
    if (candidate) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `Tag with value '${candidate.value}' is already exists`,
      }, HttpStatus.CONFLICT);
    }
  }

  async getAll() {
    return await this.tagRepository.find();
  }
}
