import { SearchDto } from './dto/search.dto';
import { StreetService } from './../street/street.service';
import { CityService } from './../city/city.service';
import { CountryService } from './../country/country.service';
import { FilesService } from './../files/files.service';
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
    private filesService: FilesService,
    private countryService: CountryService,
    private cityService: CityService,
    private streetService: StreetService,
  ) { }

  async addOne(image: any, createDwellingDto: CreateDwellingDto, ownerId: number) {
    const dwelling = new Dwelling();
    dwelling.name = createDwellingDto.name;
    dwelling.price = createDwellingDto.price;
    if (image) {
      const imageFileName: string = await this.filesService.createFile(image);
      dwelling.image_path = imageFileName;
    }
    dwelling.tags = await this.tagService.getTagListByIds(JSON.parse(createDwellingDto.tagIds));
    dwelling.owner = await this.userService.getOne(ownerId);
    dwelling.country = await this.countryService.getOneOrCreate(createDwellingDto.countryValue);
    dwelling.city = await this.cityService.getOneOrCreate(createDwellingDto.cityValue);
    dwelling.street = await this.streetService.getOneOrCreate(createDwellingDto.streetValue);
    return await this.dwellingRepository.save(dwelling);
  }

  async getOne(id: number): Promise<Dwelling> {
    const dwelling = await this.dwellingRepository.findOne(id, {
      relations: ['owner', 'owner.role', 'tags', , 'country', 'city', 'street'],
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
      relations: ['owner', 'owner.role', 'tags', 'country', 'city', 'street'],
    });
  }

  async updateOne(dwellingId: number, image: any, updateData: UpdateDwellingDto, userId: number) {
    await this.checkDwellingIsAlredyExist(dwellingId);
    await this.checkIfTheUserCanChangeDwelling(dwellingId, userId);
    const dwelling = await this.dwellingRepository.findOne({
      where: { id: dwellingId },
    });
    if (updateData.name)
      dwelling.name = updateData.name;
    if (updateData.price)
      dwelling.price = updateData.price;
    if (image) {
      const imageFileName: string = await this.filesService.createFile(image);
      dwelling.image_path = imageFileName;
    }
    if (updateData.tagIds)
      dwelling.tags = await this.tagService.getTagListByIds(JSON.parse(updateData.tagIds));
    if (updateData.countryValue)
      dwelling.country = await this.countryService.getOneOrCreate(updateData.countryValue);
    if (updateData.cityValue)
      dwelling.city = await this.cityService.getOneOrCreate(updateData.cityValue);
    if (updateData.streetValue)
      dwelling.street = await this.streetService.getOneOrCreate(updateData.streetValue);
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

  async search(searchDto: SearchDto): Promise<Dwelling[]> {
    const queryBuilder = this.dwellingRepository.createQueryBuilder("dwelling")
    if (searchDto.minPrice)
      queryBuilder.andWhere("dwelling.price > :minPrice", { minPrice: searchDto.minPrice })
    if (searchDto.maxPrice)
      queryBuilder.andWhere("dwelling.price < :maxPrice", { maxPrice: searchDto.maxPrice })
    if (searchDto.countryId)
      queryBuilder.andWhere("dwelling.country_id = :countryId", { countryId: searchDto.countryId })
    if (searchDto.cityId)
      queryBuilder.andWhere("dwelling.city_id = :cityId", { cityId: searchDto.cityId })
    if (searchDto.streetId)
      queryBuilder.andWhere("dwelling.street_id = :streetId", { streetId: searchDto.streetId })
    if (searchDto.updatePeriod)
      queryBuilder.andWhere(`dwelling.updated_at < now() and dwelling.updated_at > now() - INTERVAL '${searchDto.updatePeriod} days'`)
    return queryBuilder.getMany();
  }
}
