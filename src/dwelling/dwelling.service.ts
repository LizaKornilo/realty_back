import { UpdateDwellingDto } from './dto/update-dwelling.dto';
import { UserService } from './../user/user.service';
import { TagService } from './../tag/tag.service';
import { Dwelling } from './../entity/dwelling.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDwellingDto } from './dto/create-dwelling.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DwellingService {
  constructor(
    @InjectRepository(Dwelling) private dwellingRepository: Repository<Dwelling>,
    private tagService: TagService,
    private userService: UserService,
  ) { }

  async addOne(createDwellingDto: CreateDwellingDto, ownerId: number) {
    const dwelling = new Dwelling();
    dwelling.name = createDwellingDto.name;
    dwelling.price = createDwellingDto.price;
    dwelling.image_path = createDwellingDto.image;
    dwelling.tags = await this.tagService.getTagListByIds(createDwellingDto.tagIds);
    dwelling.owner = await this.userService.getOne(ownerId);
    return await this.dwellingRepository.save(dwelling);
  }

  async getOne(id: number): Promise<Dwelling> {
    const dwelling = await this.dwellingRepository.findOne(id, {
      relations: ['owner', 'owner.role', 'tags'],
    });
    if (!dwelling) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Dwelling with id = ${id} not found`,
      }, HttpStatus.NOT_FOUND);
    }
    return dwelling;
  }

  async getAll(): Promise<Dwelling[]> {
    return await this.dwellingRepository.find({
      relations: ['owner', 'owner.role', 'tags'],
    });
  }

  async updateOne(dwellingId: number, updateData: UpdateDwellingDto, userId: number) {
    await this.checkDwellingIsAlredyExist(dwellingId);
    await this.checkIfTheUserCanChangeDwelling(dwellingId, userId);
    const dwelling = await this.dwellingRepository.findOne({
      where: { id: dwellingId },
    });
    dwelling.name = updateData.name;
    dwelling.price = updateData.price;
    dwelling.image_path = updateData.image;
    dwelling.tags = await this.tagService.getTagListByIds(updateData.tagIds);
    return await this.dwellingRepository.save(dwelling);
  }

  async deleteOne(dwellingId: number, userId: number) {
    await this.checkDwellingIsAlredyExist(dwellingId);
    await this.checkIfTheUserCanChangeDwelling(dwellingId, userId);
    const dwellingToDelete = await this.dwellingRepository.findOne({
      where: { id: dwellingId },
    });
    await this.dwellingRepository.delete(dwellingToDelete.id);
    return dwellingToDelete.id;
  }

  private async checkDwellingIsAlredyExist(dwellingId: number) {
    const dwelling = await this.dwellingRepository.findOne({
      where: { id: dwellingId },
    });
    if (!dwelling) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Dwelling with id = ${dwellingId} not found`
      }, HttpStatus.NOT_FOUND)
    }
  }

  private async checkIfTheUserCanChangeDwelling(dwellingId: number, userId: number) {
    const dwelling = await this.dwellingRepository.findOne({
      where: { id: dwellingId },
      relations: ['owner'],
    });

    const admin = await this.userService.getAdmin();
    if (dwelling.owner.id !== userId && dwelling.owner.id !== admin.id) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: `User not admin or owner of dwelling`
      }, HttpStatus.FORBIDDEN)
    }
  }
}
