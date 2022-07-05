import { TagService } from './tag.service'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RolesDecorator } from 'src/auth/decorators/roles.decorator'
import { Roles } from 'src/role/roles-values.enum'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { CreateTagDto } from './dto/create-tag.dto'

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor (private readonly tagService: TagService) { }

  @RolesDecorator(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async createOne (@Body() createTagDto: CreateTagDto) {
    return await this.tagService.addOne(createTagDto)
  }

  @Get()
  async readAll () {
    return await this.tagService.getAll()
  }
}
