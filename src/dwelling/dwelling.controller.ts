import { DwellingService } from './dwelling.service';
import { CreateDwellingDto } from './dto/create-dwelling.dto';
import { Body, Controller, Post, UseGuards, Request, Patch, Param, Delete, Get } from '@nestjs/common';
import { RolesDecorator } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/role/roles-values.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateDwellingDto } from './dto/update-dwelling.dto';
import { getUserId } from 'src/utils/jwt.util';

@ApiTags('dwellings')
@Controller('dwellings')
export class DwellingController {
  constructor(private readonly dwellingService: DwellingService) { }

  @RolesDecorator(Roles.ADMIN, Roles.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async createOne(
    @Body() createDwellingDto: CreateDwellingDto,
    @Request() req,
  ) {
    return await this.dwellingService.addOne(createDwellingDto, getUserId(req));
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

  @RolesDecorator(Roles.ADMIN, Roles.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: "id", example: 6 })
  @Patch("/:id")
  async updateOne(
    @Param('id') id: number,
    @Body() updateDwellingDto: UpdateDwellingDto,
    @Request() req,
  ) {
    return await this.dwellingService.updateOne(id, updateDwellingDto, getUserId(req));
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
