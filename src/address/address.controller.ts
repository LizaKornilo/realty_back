import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RolesDecorator } from 'src/auth/decorators/roles.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { Roles } from 'src/role/roles-values.enum'

@ApiTags('addresses')
@Controller('addresses')
export class AddressController {
  constructor (private readonly addressService: AddressService) { }

  @Post()
  @RolesDecorator(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async createAddress (@Body() createAddressDto: CreateAddressDto) {
    return await this.addressService.createAddress(createAddressDto)
  }
}
