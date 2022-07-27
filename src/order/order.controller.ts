import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service'
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common'
import { Roles } from './../role/roles-values.enum'
import { RolesDecorator } from './../auth/decorators/roles.decorator'
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { RolesGuard } from './../auth/guards/roles.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { getUserId } from './../utils/jwt.util'

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor (private readonly orderService: OrderService) { }

  @RolesDecorator(Roles.ADMIN, Roles.OWNER, Roles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create (
    @Body() createOrderDto: CreateOrderDto,
    @Request() req
  ) {
    return await this.orderService.addOne(createOrderDto, getUserId(req))
  }
}
