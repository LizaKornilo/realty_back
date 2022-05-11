import { SearchDto } from './dto/search.dto';
import { DwellingService } from './dwelling.service';
import { CreateDwellingDto } from './dto/create-dwelling.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RolesDecorator } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/role/roles-values.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateDwellingDto } from './dto/update-dwelling.dto';
import { getUserId } from 'src/utils/jwt.util';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('dwellings')
@Controller('dwellings')
export class DwellingController {
  constructor(private readonly dwellingService: DwellingService) { }

  @RolesDecorator(Roles.ADMIN, Roles.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createOne(
    @Body() createDwellingDto: CreateDwellingDto,
    @UploadedFile() image,
    @Request() req,
  ) {
    return await this.dwellingService.addOne(image, createDwellingDto, getUserId(req));
  }

  @ApiParam({ name: "id", example: 6 })
  @Get("/:id")
  async readOne(@Param('id') id: number) {
    return await this.dwellingService.getOne(id);
  }

  @Get()
  async readAll() {
    return await this.dwellingService.getAll();
  }

  @Post('/search')
  async search(@Body() searchDto: SearchDto) {
    return await this.dwellingService.search(searchDto);
  }

  @RolesDecorator(Roles.ADMIN, Roles.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: "id", example: 6 })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Patch("/:id")
  async updateOne(
    @Param('id') id: number,
    @UploadedFile() image,
    @Body() updateDwellingDto: UpdateDwellingDto,
    @Request() req,
  ) {
    return await this.dwellingService.updateOne(id, image, updateDwellingDto, getUserId(req));
  }

  @RolesDecorator(Roles.ADMIN, Roles.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: "id", example: 1 })
  @Delete('/:id')
  async deleteOne(
    @Param('id') id: number,
    @Request() req,
  ) {
    return { id: await this.dwellingService.deleteOne(id, getUserId(req)) };
  }
}
